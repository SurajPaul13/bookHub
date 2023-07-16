import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/surajpaul/image/upload/v1689284543/Group_7484_xrgqli.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-error">Page Not Found</h1>
    <p className="not-found-des">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <button type="button" className="go-back-home-btn">
      <Link to="/">Go Back to Home</Link>
    </button>
  </div>
)

export default NotFound
