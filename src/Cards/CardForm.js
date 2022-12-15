import React from "react"
import {Link} from "react-router-dom"

const CardForm = ({card, changehandler, submithandler, url, form}) => {
  const {front, back} = card

  const formButtons = () => {
    if (form === "Add") {
      return (
        <div>
          <Link to={url} role="button" className="btn btn-secondary mr-2">
            Done
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      )
    } else if (form === "Edit") {
      return (
        <div>
          <Link to={url} role="button" className="btn btn-secondary mr-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      )
    }
  }

  return (
    <form onSubmit={submithandler}>
      <div className="form-floating mb-3">
        <label htmlFor="front">Front</label>
        <textarea className="form-control" id="front" name="front" rows="2" placeholder="Front side of card" onChange={changehandler} value={front}></textarea>
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="back">Back</label>
        <textarea className="form-control" id="back" name="back" rows="2" placeholder="Back side of card" onChange={changehandler} value={back}></textarea>
      </div>
      {formButtons()}
    </form>
  )
}

export default CardForm
