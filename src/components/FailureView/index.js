import './index.css'

const FailureView = props => {
  const {getApiDetails} = props

  const onClickTryAgain = () => {
    getApiDetails()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/surajpaul/image/upload/v1689163743/Group_7522_dbee43.svg"
        alt="failure view"
        className="failure-view-img"
      />
      <p className="failure-head">Something went wrong, Please try again.</p>
      <button className="try-again-btn" type="button" onClick={onClickTryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
