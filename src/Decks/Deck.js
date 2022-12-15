import React, {useState, useEffect} from "react"
import {Link, Switch, Route, useParams, useHistory} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"

import AddCard from "../Cards/AddCard"
import EditCard from "../Cards/EditCard"

const Deck = () => {
  const history = useHistory()
  const {deckId} = useParams()

  const deckUrl = `/decks/${deckId}`

  const [deck, setDeck] = useState({name: "", description: "", cards: []})
  const {name, description, cards} = deck

  const deckdeletehandler = async () => {
    const abort = new AbortController()

    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
      await deleteDeck(deckId, {signal: abort.signal})
      history.push("/")
    }

    return () => abort.abort()
  }

  const carddeckdeletehandler = async (id) => {
    const abort = new AbortController()

    if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
      await deleteCard(id, {signal: abort.signal})
      const response = await readDeck(deckId)
      setDeck(response)
    }

    return () => abort.abort()
  }

  useEffect(() => {
    const abort = new AbortController()

    const loadDecks = async () => {
    const response = await readDeck(deckId, {signal: abort.signal})
    setDeck(response)
    }
    loadDecks()
    return () => abort.abort()
  }, [deckId])

  return (
    <Switch>
      <Route path={`${deckUrl}`} exact>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home" /> Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {name}
              </li>
            </ol>
          </nav>
          <h4>{name}</h4>
          <p>{description}</p>
          <div className="d-flex justify-content-between mb-4">
            <div>
              <Link to={`${deckUrl}/edit`} role="button" className="btn btn-secondary mr-2">
                <span className="oi oi-pencil m-1" /> Edit
              </Link>
              <Link to={`${deckUrl}/study`} role="button" className="btn btn-primary mr-2">
                <span className="oi oi-book m=1" /> Study
              </Link>
              <Link to={`${deckUrl}/cards/new`} role="button" className="btn btn-primary">
                <span className="oi oi-plus m-1" /> Add Cards
              </Link>
            </div>
            <button type="button" className="btn btn-danger" onClick={deckdeletehandler}>
              <span className="oi oi-trash" />
            </button>
          </div>
          <h2>Cards</h2>
          {cards.length ? (
            cards.map((card) => {
              const {id, front, back} = card
              const toDelete = () => {
                carddeckdeletehandler(id)
              }

              return (
                <div className="card mb-2" key={id}>
                  <div className="card-body">
                    <div className="row row-cols-2">
                      <div className="col">
                        <p>{front}</p>
                      </div>
                      <div className="col">
                        <p>{back}</p>
                      </div>
                    </div>
                    <div className="float-right">
                      <Link to={`${deckUrl}/cards/${id}/edit`} role="button" className="btn btn-secondary mr-2">
                        <span className="oi oi-pencil m-1" /> Edit
                      </Link>
                      <button type="button" className="btn btn-danger" onClick={toDelete}>
                        <span className="oi oi-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>You have no cards in this deck.</p>
          )}
        </div>
      </Route>
      <Route path={`${deckUrl}/cards/:cardId/edit`}>
        <EditCard deck={deck} url={deckUrl} setDeck={setDeck} />
      </Route>
      <Route path={`${deckUrl}/cards/new`}>
        <AddCard deck={deck} url={deckUrl} setDeck={setDeck} />
      </Route>
    </Switch>
  )
}

export default Deck
