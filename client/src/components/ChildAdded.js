import React from 'react'
import {connect} from 'react-redux'
import {removeToast} from '../store/toasts'

class ChildAdded extends React.Component {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  onClick(evt) {
    evt.preventDefault()
    this.props.removeToast()
  }

  render() {
    return (
      <div>
        <button className="btn btn-success btn-lg" onClick={this.onClick}>
          {this.props.toast.text}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    toast: state.toasts.childAdded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeToast: () => dispatch(removeToast())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildAdded)
