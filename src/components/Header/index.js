import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {hamburgerOpen: false}

  toggleHamburger = () => {
    this.setState(prevState => ({
      hamburgerOpen: !prevState.hamburgerOpen,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  navItems = () => (
    <ul className="nav-items">
      <li>
        <Link to="/" className="nav-bar-link-item" onClick={this.onClickHome}>
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/shelf"
          className="nav-bar-link-item"
          onClick={this.onClickBookshelves}
        >
          Bookshelves
        </Link>
      </li>

      <button type="button" className="logout-btn" onClick={this.onClickLogout}>
        Logout
      </button>
    </ul>
  )

  render() {
    const {hamburgerOpen} = this.state
    return (
      <>
        <div className="nav-bar">
          <div className="mobile-view-nav-bar">
            <Link to="/">
              <div>
                <img
                  src="https://res.cloudinary.com/surajpaul/image/upload/v1689155325/Group_7731_lheu4k.svg"
                  alt="website logo"
                  className="website-logo-navbar"
                />
              </div>
            </Link>
            <button
              type="button"
              onClick={this.toggleHamburger}
              className="hamburger-btn"
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
          <div className="nav-items-container">{this.navItems()}</div>
          <div className={`${hamburgerOpen ? 'show' : 'hide'}`}>
            {this.navItems()}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Header)
