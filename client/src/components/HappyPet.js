import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {me} from '../store/user'
import {getChores} from '../store/myChores'

class HappyPet extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    this.setRedirect = this.setRedirect.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.getChores(this.props.user.id)
  }
  setRedirect() {
    this.setState({
      redirect: true
    })
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/mychores' />
    }
  }
  handleClick(evt){
    evt.preventDefault()
      this.props.history.push('/mychores')
  }

  render(){
    return (
      <div>
                        {this.renderRedirect()}

        <img src='http://localhost:3000/bunny.png' />
      <button

              className="btn btn-secondary col md-4 center-blocks"
              type="submit"
              onClick={this.handleClick}
            >
              Back to chores
            </button>

      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chores: state.myChores.chores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findUser: () => dispatch(me()),
    getChores: (id) => dispatch(getChores(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HappyPet)
