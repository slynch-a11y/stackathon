import React from 'react'
import axios from 'axios'
import {me} from '../store/user'
import {getChores, updateChore} from '../store/myChores'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class MyChores extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      selectedOption: ''
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.setRedirect = this.setRedirect.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/happyPet' />
    }
  }

  componentDidMount(){
    //get petId from url
    this.props.getChores(this.props.user.id)
  }

  handleOptionChange(evt) {
    this.setState({ selectedOption: evt.target.value })
    //update chore to complete
this.props.updateChore(this.props.user.id, +evt.target.value, {isComplete: true})
    //redirect to happy bunny page
    this.props.getChores(this.props.user.id)

    this.setRedirect()

  }



  render(){
    console.log("MYCHORES", this.props.chores[0])
    console.log("MKYCHORESTATE", this.state)
    return (
      <div>
                {this.renderRedirect()}
{
  (this.props.chores) ? (


          this.props.chores.map(chore => (
            <div key={chore.chore.id}>
                   <form>
    <div className="radio">
      <label>
        <input type="radio" value={chore.chore.id}
                      checked={this.state.selectedOption === 'chore1'}
                      onChange={this.handleOptionChange} />
        {chore.chore.description}
      </label>
    </div>

  </form>
  </div>
          ))

      ) : <div>You have no chores! Yay!</div>
    }
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
    getChores: (id) => dispatch(getChores(id)),
    updateChore: (userId, choreId, chore) => dispatch(updateChore(userId, choreId, chore))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChores)

