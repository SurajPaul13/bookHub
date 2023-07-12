import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
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
      speed: 500,
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
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachLogo => {
          const {id, coverPic, title} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <img className="logo-image" src={coverPic} alt="company logo" />
              <h1>{title}</h1>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-des">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="slider-container">
            <div className="slider-header">
              <h1 className="slider-head">Top Rated Books</h1>
              <button className="find-books-btn" type="button">
                Find Books
              </button>
            </div>
            {this.renderSlider()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
