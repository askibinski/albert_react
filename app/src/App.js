import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title : 'Default title',
      description : 'Lorem ipsum.'
    }

    // This binding is necessary to make `this` work in the callback.
    this.process = this.process.bind(this);
  }

  // Why not in WillMount?
  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    this.get('http://albert.localhost/jsonapi/node/recipe');
  }

  get(url) {
    fetch(url)
      .then(this.status)
      .then(this.json)
      .then(this.process)
      .catch(e => console.log(e));
  }

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error('Looks like there was a problem. Status Code: ' +
        response.status))
    }
  }

  json(response) {
    return response.json();
  }

  process(response) {
    let random = Math.floor(Math.random() * response.data.length);
    this.setState({
      title : response.data[random].attributes.title
    });
  }

  render() {
    return (
      <div>
      <h1>{this.state.title}</h1>
        <p>test</p>
      </div>
    );
  }
}

export default hot(module)(App);
