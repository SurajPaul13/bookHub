import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FooterSection from '../FooterSection'
import FailureView from '../FailureView'
import BookOverview from '../BookOverview'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    bookshelvesData: [],
    bookshelfName: 'All',
    searchText: '',
    activeFilter: 'ALL',
    bookShelvesApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getBookshelvesDetails()
  }

  onClickFilter = (value, label) => {
    this.setState({activeFilter: value, bookshelfName: label}, () => {
      this.getBookshelvesDetails()
    })
  }

  onClickSearch = () => {
    this.getBookshelvesDetails()
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.getBookshelvesDetails()
    }
  }

  getBookshelvesDetails = async () => {
    const {activeFilter, searchText} = this.state
    this.setState({bookShelvesApiStatus: apiStatus.loading})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const bookshevles = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))

      this.setState({
        bookshelvesData: bookshevles,
        bookShelvesApiStatus: apiStatus.success,
      })
    } else {
      this.setState({bookShelvesApiStatus: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <FailureView getApiDetails={this.getBookshelvesDetails} />
  )

  bookshelvesFilter = () => {
    const {activeFilter} = this.state
    return (
      <div className="bookshelves-filter-container">
        <h1 className="bookshelves-heading">Bookshelves</h1>
        <ul className="bookshelves-filters">
          {bookshelvesList.map(eachFilter => {
            const {id, value, label} = eachFilter
            return (
              <li value={value} key={id}>
                <button
                  className={
                    activeFilter === value ? 'active-filter' : 'inactive-filter'
                  }
                  type="button"
                  onClick={() => {
                    this.onClickFilter(value, label)
                  }}
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  bookshelvesHeader = () => {
    const {searchText, bookshelfName} = this.state

    return (
      <div className="bookshelves-header-container">
        <h1 className="header-name">{bookshelfName} Books</h1>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={searchText}
            onChange={this.onChangeSearch}
            onKeyUp={this.onKeyPress}
          />
          <button
            type="button"
            className="search-icon-btn"
            onClick={this.onClickSearch}
            testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }

  renderNoBooksView = () => {
    const {searchText} = this.state
    return (
      <div className="no-books-container">
        <img
          src="https://res.cloudinary.com/surajpaul/image/upload/v1689268569/Asset_1_1_c0nwxy.svg"
          alt="no books"
        />
        <p className="no-books-msg">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderBooks = () => {
    const {bookshelvesData} = this.state
    if (bookshelvesData.length === 0) {
      return this.renderNoBooksView()
    }

    return (
      <ul className="books-container">
        {bookshelvesData.map(eachBook => (
          <BookOverview details={eachBook} key={eachBook.id} />
        ))}
      </ul>
    )
  }

  renderBooksDetails = () => {
    const {bookShelvesApiStatus} = this.state

    switch (bookShelvesApiStatus) {
      case 'LOADING':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderBooks()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelves">
        <Header />
        <div className="footer-divider">
          <div className="bookshelves-container">
            {this.bookshelvesFilter()}
            <div className="bookshelves-display-container">
              {this.bookshelvesHeader()}
              <div className="render-books-details-or-loader-div">
                {this.renderBooksDetails()}
              </div>
            </div>
          </div>
          <FooterSection />
        </div>
      </div>
    )
  }
}

export default Bookshelves
