import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  authenticateUser = async () => {
    const {username, password} = this.state
    const {history} = this.props

    const userDetails = {
      username,
      password,
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({displayErrorMsg: false})

      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else {
      const error = data.error_msg
      this.setState({displayErrorMsg: true, errorMsg: error})
    }
  }

  onLogin = event => {
    event.preventDefault()

    this.authenticateUser()
  }

  renderLoginPage = () => {
    const {username, password, displayErrorMsg, errorMsg} = this.state

    return (
      <>
        <img
          src="https://res.cloudinary.com/surajpaul/image/upload/v1689093802/Rectangle_1467_hsygwz.png"
          alt="website login"
          className="main-bg-image"
        />
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/surajpaul/image/upload/v1689155325/Group_7731_lheu4k.svg"
            alt="login website logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onLogin}>
            <div className="login-inputs">
              <label htmlFor="username" className="login-labels">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="login-input-element"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="login-inputs">
              <label htmlFor="password" className="login-labels">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="login-input-element"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {displayErrorMsg ? <p className="error-msg">*{errorMsg}</p> : ''}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }

  render() {
    return <div className="login-view">{this.renderLoginPage()}</div>
  }
}

export default Login
