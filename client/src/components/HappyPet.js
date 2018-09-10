import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import {me} from '../store/user'
import {getMyChores} from '../store/myChores'
import {getSinglePet} from '../store/myPet'

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
    this.props.getPet(this.props.user.id)

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
      this.setRedirect()
      window.location.reload()
  }

  render(){
    console.log("WHATTTTTT", this.props)
    return (
      <div>
                        {this.renderRedirect()}
<p>{this.props.user.petName} is so excited!  Good job!</p>
        <img src={this.props.user.happyPetImage}/><p>
      <button

              className="btn btn-secondary col md-4 center-blocks"
              type="submit"
              onClick={this.handleClick}
            >
      Back to Chores
            </button>
            {/* <Link to='/mychores'>Back to Chores</Link> */}
</p>
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chores: state.myChores.chores,
    pet: state.myPet.myPet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findUser: () => dispatch(me()),
    getChores: (id) => dispatch(getMyChores(id)),
    getPet: (userId) => dispatch(getSinglePet(userId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HappyPet)
