import React from "react";
import {Switch, Route} from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import AllDecks from "../Decks/AllDecks";
import CreateDeck from "../Decks/CreateDeck";
import Deck from "../Decks/Deck";
import EditDeck from "../Decks/EditDeck";
import StudyDeck from "../Decks/StudyDeck";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact><AllDecks /></Route>
          <Route path="/decks/new"><CreateDeck /></Route>
          <Route path="/decks/:deckId/edit"><EditDeck /></Route>
          <Route path="/decks/:deckId/study"><StudyDeck /></Route> 
          <Route path="/decks/:deckId"><Deck /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;