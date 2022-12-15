import React, {useState} from "react"
import {Link} from "react-router-dom"
import {createCard, readDeck} from "../utils/api"

import CardForm from "./CardForm"

const AddCard = ({deck, setDeck, url}) => {
    const [newCard, setNewCard] = useState({front: "", back: ""})
    const {id, name} = deck

  const changehandler = (event) => {
    setNewCard({...newCard, [event.target.name]: event.target.value, })
  }

  const submithandler = async (event) => {
    event.preventDefault()

    const response = await createCard(id, {front: newCard.front, back: newCard.back})
    const {deckId} = response

    const loadDeck = async () => {
        const res = await readDeck(deckId)
        setDeck(res)
      }
      loadDeck()
    setNewCard({front: "", back: ""})
    window.alert("Your card has been saved")
  }

  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home m-1" />Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>{name}</Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>

      <h3>{name}: Add Card</h3>
      <CardForm 
      card={newCard} 
      changehandler={changehandler} 
      submithandler={submithandler} 
      url={url} 
      form={"Add"} />
    </>
  )
}

export default AddCard
