import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from'react-router-dom';

import {readCard, updateCard, readDeck} from '../utils/api';
import CardForm from './CardForm';

const EditCard = ({deck, setDeck, url}) => {
    const history = useHistory();
    const { deckId, cardId } = useParams();
    const [ updatedCard, setUpdatedCard ] = useState({id: cardId, front: '', back: '', deckId: deckId});
    
    
    const changehandler = event => {
        setUpdatedCard({...updatedCard, [event.target.name]: event.target.value})
    }
    
    const submithandler = async (event) => {
        event.preventDefault();
        
        const newUpdatedCard = await updateCard(updatedCard);
        
        const loadDeck = async () => {
            const res = await readDeck(newUpdatedCard.deckId)
            setDeck({name: res.name, description: res.description, cards: res.cards});
        }
        loadDeck();
        history.push(`/decks/${newUpdatedCard.deckId}`);
        history.go(0)
    }
    
    useEffect( () => {
        const abort = new AbortController();
    
        const loadCard = async() => {
            const response = await readCard(cardId, {signal: abort.signal});
            setUpdatedCard(response);
        }
        loadCard();
        return () => abort.abort();
    }, [cardId])

    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home m-1" />Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={url}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck {cardId}</li>
                </ol>
            </nav>

            <h3>Edit Card</h3>
            <CardForm 
                card={updatedCard}
                changehandler={changehandler}
                submithandler={submithandler}
                url={url}
                form={"Edit"}
            />
        </>
    )
}

export default EditCard;