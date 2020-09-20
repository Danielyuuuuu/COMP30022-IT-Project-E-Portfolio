import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateBook from "./components/CreateBook";
import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";
import EPortfolio from "./components/EPortfolio";
import Store from "./components/Store";
import Blog from "./components/Blog";
import AboutMe from "./components/AboutMe";
import AboutRuntimeTerror from "./components/AboutRuntimeTerror";
import ContactMe from "./components/ContactMe";
import ArtWorkGallery from "./components/ArtWorkGallery";



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ShowBookList} />
          <Route path="/create-book" component={CreateBook} />
          <Route path="/edit-book/:id" component={UpdateBookInfo} />
          <Route path="/show-book/:id" component={ShowBookDetails} />
          
          <Route path="/eportfolio" component={EPortfolio} />
          <Route path="/store" component={Store} />
          <Route path="/blog" component={Blog} />
          <Route path="/aboutme" component={AboutMe} />
          <Route path="/aboutruntimeterror" component={AboutRuntimeTerror} />
          <Route path="/contactme" component={ContactMe} />
          <Route path="/artworkgallery" component={ArtWorkGallery} />

        </div>
      </Router>
    );
  }
}

export default App;
