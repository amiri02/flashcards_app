import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

const AllDecks = () => {
  const [ decks, setDecks ] = useState({name: "", description: "", cards: []})

  
  useEffect( () => {
    const abort = new AbortController();
    
    const listingDecks = async() => listDecks({signal: abort.signal}).then(setDecks)
    listingDecks();
    
    return () => abort.abort();
  },[])
  
  const deletehandler = async (id) => {
    const abort = new AbortController();

    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
      await deleteDeck(id, {signal: abort.signal});
      listDecks({signal: abort.signal}).then(setDecks);
    }
    
    return () => abort.abort();
  }
  
  return (
    <>
      <Link to="/decks/new" role="button" className="btn btn-secondary mb-3">
      <span className="oi oi-plus"></span> Create Deck
      </Link>
      { decks.length 
        ? (
          decks.map((deck) => {
            const { id, name, description } = deck;
            const toDelete = () => {
              deletehandler(id);
            }

            return (
              <div className="card mb-2" key={id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{name}</h5>
                    <small className="text-muted">{deck.cards.length} cards</small>
                  </div>
                  <p className="card-text text-muted">{description}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Link to={`/decks/${id}`} role="button" className="btn btn-secondary card-link"><span className="oi oi-eye"></span> View</Link>
                      <Link to={`/decks/${id}/study`} role="button" className="btn btn-primary card-link"><span className="oi oi-book"></span> Study</Link>
                    </div>
                    <button name="delete" className="btn btn-danger card-link" onClick={toDelete}><span className="oi oi-trash"></span></button>
                  </div>
                </div>
              </div>
            );
          })) 
        : (<p>Please create a deck.</p>)
      }
    </>
  );
};

export default AllDecks;