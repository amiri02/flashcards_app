import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"

import {createDeck} from "../utils/api"
import DeckForm from "./DeckForm"

const CreateDeck = () => {
  const history = useHistory()
  const [newDeck, setNewDeck] = useState({name: "", description: ""})

  const changehandler = (event) => {
    setNewDeck({...newDeck, [event.target.name]: event.target.value,})
  }

  const submithandler = async (event) => {
    event.preventDefault()

    const responseC = await createDeck({name: newDeck.name, description: newDeck.description})
    setNewDeck({name: "", description: "",})
    history.push(`/decks/${responseC.id}`)
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
          <li className="breadcrumb-item active">
            Create Deck
          </li>
        </ol>
      </nav>

      <h3>Create Deck</h3>
      <DeckForm url={``} deck={newDeck} changehandler={changehandler} submithandler={submithandler} />
    </>
  )
}

export default CreateDeck