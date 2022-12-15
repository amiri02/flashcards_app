import React from "react"
import {Link} from "react-router-dom"

const DeckForm = ({url, deck, changehandler, submithandler}) => {
  const {name, description} = deck
console.log(submithandler)
  return (
    <form onSubmit={submithandler}>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Name</label>
        <input type="text" 
        className="form-control" 
        id="name" 
        name="name"
        placeholder="Name" 
        onChange={changehandler}
        value={name} />
      </div>
      <div className="form-floating">
        <label htmlFor="floatingInput">Description</label>
        <textarea type="text" 
        className="form-control" 
        id="description" 
        name="description"
        placeholder="Description" 
        onChange={changehandler}
        value={description} 
        rows="4" />
      </div>
      <div>
        <Link to={url}>
          <button className="btn btn-secondary mt-3 mr-2">Cancel</button>
        </Link>
          <button type="submit" className="btn btn-primary mt-3 mr-2">Submit</button>
      </div>
    </form>
  )
}

export default DeckForm
