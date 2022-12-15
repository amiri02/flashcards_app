import React, {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"

import {readDeck, updateDeck} from "../utils/api"
import DeckForm from "./DeckForm"

const EditDeck = () => {
  const history = useHistory()
  const {deckId} = useParams()

  const deckUrl = `/decks/${deckId}`

  const [updatedDeck, setUpdatedDeck] = useState({id: deckId, name: "", description: ""})
  
  const changehandler = (event) => {
    setUpdatedDeck({...updatedDeck, [event.target.name]: event.target.value})
  }
  
  const submithandler = async (event) => {
    event.preventDefault()
    
    const newUpdatedDeck = await updateDeck(updatedDeck)
    history.push(`/decks/${newUpdatedDeck.id}`);
    history.go(1)
  }
  
    useEffect(() => {
      const abort = new AbortController()
  
      const loadDeck = async () => {
        const res = await readDeck(deckId, {signal: abort.signal})
        setUpdatedDeck({id: res.id, name: res.name, description: res.description})
      }
      loadDeck()
      return () => abort.abort()
    }, [deckId])
  
  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home m-1" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={deckUrl}>{updatedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
            </li>
        </ol>
      </nav>

      <h3>Edit Deck</h3>
      <DeckForm deck={updatedDeck} changehandler={changehandler} submithandler={submithandler} url={deckUrl} />
    </>
  )
}

export default EditDeck
