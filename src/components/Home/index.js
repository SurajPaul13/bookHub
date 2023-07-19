import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
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

class Home extends Component {
  state = {topRatedBooks: [], topRatedApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  onClickTryAgain = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: apiStatus.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const booksData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedApiStatus: apiStatus.success,
        topRatedBooks: booksData,
      })
    } else {
      this.setState({topRatedApiStatus: apiStatus.failure})
    }
  }

  renderSlider = () => {
    const {topRatedBooks} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider-component">
        {topRatedBooks.map(eachBook => {
          const {id, coverPic, title, authorName} = eachBook
          return (
            <Link to={`/books/${id}`} className="book-link-item" key={id}>
              <div className="slider-item">
                <img
                  className="top-rated-book-image"
                  src={coverPic}
                  alt={title}
                />
                <h1 className="top-rated-book-title">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <FailureView getApiDetails={this.getTopRatedBooks} />
  )

  renderTopRatedBooks = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case 'LOADING':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderSlider()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <div className="home-container">
          <div>
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-des">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              className="find-books-btn-sm"
              type="button"
              onClick={this.onClickFindBooks}
            >
              Find Books
            </button>
            <div className="slider-container">
              <div className="slider-header">
                <h1 className="slider-head">Top Rated Books</h1>
                <button
                  className="find-books-btn-lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              {this.renderTopRatedBooks()}
            </div>
          </div>
          <FooterSection />
        </div>
      </div>
    )
  }
}

export default Home
