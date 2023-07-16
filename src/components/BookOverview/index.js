import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const BookOverview = props => {
  const {details} = props
  const {authorName, coverPic, rating, readStatus, title, id} = details
  return (
    <li key={id}>
      <Link to={`/book/${id}`} className="bookshelves-link-item">
        <div className="bookshelves-book-overview-container">
          <img src={coverPic} alt={title} className="bookshelves-cover-pic" />
          <div className="bookshelves-book-overview-details">
            <h1 className="bookshelves-book-item-title">{title}</h1>
            <p className="bookshelves-book-item-author-name">{authorName}</p>
            <div className="bookshelves-rating-container">
              <p className="bookshelves-avg-rating">Avg Rating</p>
              <BsFillStarFill className="bookshelves-rating-star" />
              <p className="bookshelves-rating">{rating}</p>
            </div>
            <p className="bookshelves-status">
              Status:{' '}
              <span className="bookshelves-read-status">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BookOverview
