import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom"

import {readDeck} from "../utils/api";

const StudyDeck = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({name: "", cards: []})
    const [cardStatus, setCardStatus] = useState({num: 0, cardFlipped: false,});
    const [currentCard, setCurrentCard] = useState({front: "",back: ""})
    const totalCards = deck.cards.length;

    useEffect( () => {
        const abort = new AbortController();
        
        const loadDeck = async () => {
           const res = await readDeck(deckId, {signal: abort.signal})
               setDeck(res)
               if(res.cards.length !== 0){
                const card = res.cards[0]
                setCurrentCard({front: card.front, back: card.back})
                    }
;        }
        loadDeck();

        return () => abort.abort();
    }, [deckId])

    const showCards = () => {
        if(deck.cards.length < 3){
            return(
                <div>
                    <h4>Not enough cards</h4>
                    <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus m-1" /> Add Cards</Link>
                </div>
            )
        } else {
            return(
                <div className="card mb-2">
                    <div className="card-body">
                    <h5 className="card-title">Card {cardStatus.num + 1} of {deck.cards.length}</h5>
                        <p>{cardStatus.cardFlipped ? currentCard.back: currentCard.front}</p>
                        {showButtons()}
                    </div>
                </div>
            )
        }
    }

    const fliphandler = () => {
        setCardStatus({...cardStatus, cardFlipped: !cardStatus.cardFlipped})
    }

    const nextCardHandler = () => {

        if(cardStatus.num + 1 === totalCards){
            if(window.confirm("Restart cards?\n\nClick 'cancel to return to the home page")){
                setCurrentCard({ front: deck.cards[0].front, back: deck.cards[0].back})
                setCardStatus({num: 0, cardFlipped: false})
            } else {
                history.push("/")
            }
        } else {
            setCurrentCard({ front: deck.cards[cardStatus.num + 1].front, back: deck.cards[cardStatus.num + 1].back})
            setCardStatus({cardFlipped: !cardStatus.cardFlipped, num: cardStatus.num + 1})
        }
    }

    const showButtons = () => {
        if(cardStatus.cardFlipped === false){
            return <button className="btn btn-secondary mt-1 mr-2" onClick={fliphandler}>Flip</button>
        } else {
            return(
                <div>
                    <button className="btn btn-secondary mt-1 mr-2" onClick={fliphandler}>Flip</button>
                    <button className="btn btn-primary" onClick={nextCardHandler}>Next</button>
                </div>
            )
        }
    }
    

    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home m-1" /> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>Study: {deck.name}</h2>
            {showCards()}
        </div>
    )
}

export default StudyDeck;