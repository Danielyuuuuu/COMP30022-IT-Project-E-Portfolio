import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Admin from "./admin/layouts/Admin";
import "./App.css";
import AboutMe from "./components/AboutMe";
import AboutRuntimeTerror from "./components/AboutRuntimeTerror";
import ArtGraftsGallery from "./components/ArtCraftsGallery";
import ArtWorkGallery from "./components/ArtWorkGallery";
import ArtWorkGallery1 from "./components/ArtWorkGallery1";
import ArtWorkGallery2 from "./components/ArtWorkGallery2";
import ArtWorkGallery3 from "./components/ArtWorkGallery3";
import Blog from "./components/Blog";
import IndividualPost from "./components/BlogIndividualPost";
import ContactMe from "./components/ContactMe";
import CreateBook from "./components/CreateBook";
import EPortfolio from "./components/EPortfolio";
import GraphicDesignGallery from "./components/GraphicDesignGallery";
import Login from "./components/Login";
import PaintingGallery from "./components/PaintingGallery";
import PhotographyGallery from "./components/PhotographyGallery";
import Register from "./components/Register";
import PurchaseCancel from "./components/ShoppingCancel";
import CheckOut from "./components/ShoppingCheckOut";
import PurchaseSucceed from "./components/ShoppingSuccess";
import ShowBookDetails from "./components/ShowBookDetails";
import Store from "./components/Store";
import UpdateBookInfo from "./components/UpdateBookInfo";









export default function App() {
  // const [userData, setUserData] = useState({
  //   token: undefined,
  //   user: undefined,
  // });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/api/user/tokenIsValid",
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        await Axios.get("/api/user/", {
          headers: { "x-auth-token": token },
        });
      }
      var tmp=null;
      Axios.put("/api/statistic/addview", tmp);


    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Route exact path="/" component={EPortfolio} />
        <Route path="/create-book" component={CreateBook} />
        <Route path="/edit-book/:id" component={UpdateBookInfo} />
        <Route path="/show-book/:id" component={ShowBookDetails} />

        <Route path="/store-frontend" component={Store} />
        <Route path="/blog" component={Blog} />
        <Route path="/individualpost/:id" component={IndividualPost} />
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

        <Route path="/paintinggallery" component={PaintingGallery} />
        <Route path="/photographygallery" component={PhotographyGallery} />
        <Route path="/artcraftsgallery" component={ArtGraftsGallery} />
        <Route path="/graphicdesigngallery" component={GraphicDesignGallery} />

        <Route path="/checkout" component={CheckOut} />
        <Route path="/success" component={PurchaseSucceed} />
        <Route path="/cancel" component={PurchaseCancel} />
      </div>
    </Router>
  );
}
