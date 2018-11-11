import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title : 'Loading...',
      description : '',
      image : {
        square_large : '',
        alt : ''
      }
    }

    // This binding is necessary to make `this` work in the callback.
    this.process = this.process.bind(this);
  }

  // Why not in WillMount?
  // https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
  componentDidMount() {
    this.get('https://albert.skibinski.nl/jsonapi/node/recipe?include=field_image');
  }

  // @todo: https://colorfield.be/blog/react-and-drupal-8-json-api-3
  // @todo axios ?
  // @todo async await ?
  get(url) {
    // The consumer ID is added using a header. See d.o/project/consumers.
    let headers = {
      "X-Consumer-ID": "b7f5e18b-0f1f-4125-8956-ab917fe3aa8d"
    }
    fetch(url, {
      method: "GET",
      headers: headers
    })
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
    // Let's just show a random recipe.
    let random = Math.floor(Math.random() * response.data.length);
    this.setState({
      title : response.data[random].attributes.title,
      description : response.data[random].attributes.field_description.value,
      image : {
        square_large: response.included[random].meta.derivatives.square_large,
        alt: response.data[random].relationships.field_image.data.meta.alt
      }
    });
  }

  // @todo put in separate template.
  render() {
    return (
      <div className="wrapper">
        <div className="recipe">
        <h1 className="title">{this.state.title}</h1>
          <img className="image" src={this.state.image.square_large} alt={this.state.image.alt} />
          <div className="description" dangerouslySetInnerHTML={{__html: this.state.description}}></div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
