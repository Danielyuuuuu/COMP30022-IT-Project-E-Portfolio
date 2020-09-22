import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
import ArtWorkGallery1 from "./components/ArtWorkGallery1";
import ArtWorkGallery2 from "./components/ArtWorkGallery2";
import ArtWorkGallery3 from "./components/ArtWorkGallery3";


import Admin from "./admin/layouts/Admin.js";

import Login from "./components/Login";
import Register from "./components/Register";


import Axios from "axios";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:8000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8000/user/", {
          headers: { "x-auth-token": token },
        });
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <Router>
      <div>
        <Route exact path="/" component={ShowBookList} />
        <Route path="/create-book" component={CreateBook} />
        <Route path="/edit-book/:id" component={UpdateBookInfo} />
        <Route path="/show-book/:id" component={ShowBookDetails} />

        <Route path="/eportfolio" component={EPortfolio} />
        <Route path="/store-frontend" component={Store} />
        <Route path="/blog" component={Blog} />
        <Route path="/aboutme" component={AboutMe} />
        <Route path="/aboutruntimeterror" component={AboutRuntimeTerror} />
        <Route path="/contactme" component={ContactMe} />

        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    
        <Route path="/artworkgallery" component={ArtWorkGallery} />
        <Route path="/artworkgallery1" component={ArtWorkGallery1} />
        <Route path="/artworkgallery2" component={ArtWorkGallery2} />
        <Route path="/artworkgallery3" component={ArtWorkGallery3} />
    
      
      </div>
    </Router>
  );
}
