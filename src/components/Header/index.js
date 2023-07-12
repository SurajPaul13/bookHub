import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-bar">
    <img
      src="https://res.cloudinary.com/surajpaul/image/upload/v1689155325/Group_7731_lheu4k.svg"
      className="website-logo-header"
      alt="website logo"
    />

    <div className="nav-items-container">
      <ul className="nav-items">
        <li>
          <Link to="/" className="nav-bar-link-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-bar-link-item">
            Bookshelves
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-btn">
        Logout
      </button>
    </div>
  </div>
)

export default Header
