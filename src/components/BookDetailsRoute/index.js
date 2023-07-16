import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import FailureView from '../FailureView'
import FooterSection from '../FooterSection'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class BookDetailsRoute extends Component {
  state = {bookDetails: [], bookItemApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    this.setState({bookItemApiStatus: apiStatus.loading})
    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const bookDetails = data.book_details
      const convertedBookDetails = {
        id: bookDetails.id,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        aboutBook: bookDetails.about_book,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
        aboutAuthor: bookDetails.about_author,
      }

      this.setState({
        bookDetails: convertedBookDetails,
        bookItemApiStatus: apiStatus.success,
      })
    } else {
      this.setState({bookItemApiStatus: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookItemDetails = () => {
    const {bookDetails} = this.state
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <>
        <div className="book-overview-container">
          <img src={coverPic} alt={title} className="cover-pic" />
          <div className="book-overview-details">
            <h1 className="book-item-title">{title}</h1>
            <p className="book-item-author-name">{authorName}</p>
            <div className="rating-container">
              <p className="avg-rating">Avg Rating</p>
              <BsFillStarFill className="rating-star" />
              <p className="rating">{rating}</p>
            </div>
            <p className="status">
              Status: <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="about-section-headings">About Author</h1>
        <p className="about-section-des">{aboutAuthor}</p>
        <h1 className="about-section-headings">About Book</h1>
        <p className="about-section-des">{aboutBook}</p>
      </>
    )
  }

  renderFailureView = () => (
    <FailureView getApiDetails={this.getBookItemDetails} />
  )

  renderDetails = () => {
    const {bookItemApiStatus} = this.state

    switch (bookItemApiStatus) {
      case 'LOADING':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderBookItemDetails()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-route">
        <Header />
        <div className="book-item-details-container">
          <div className="book-item-details-card">{this.renderDetails()}</div>
          <FooterSection />
        </div>
      </div>
    )
  }
}

export default BookDetailsRoute
