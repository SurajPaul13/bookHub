import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const FooterSection = () => (
  <div className="footer-section">
    <ul className="contact-icons-container">
      <li>
        <FaGoogle className="contact-icons" />
      </li>
      <li>
        <FaTwitter className="contact-icons" />
      </li>
      <li>
        <FaInstagram className="contact-icons" />
      </li>
      <li>
        <FaYoutube className="contact-icons" />
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)

export default FooterSection
