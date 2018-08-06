import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Chores from './Chores'
import AddChore from './AddChore'
import {getFamilyId} from '../store/familyId'
import {me} from '../store/user'
import {getChildren} from '../store/child'
import PetSelect from './PetSelect'
import MyChores from './MyChores'

import {getMyChores} from '../store/myChores'

// import {getChores} from '../store/chores'
// import {getFamilyId} from '../store/familyId'

class Welcome extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    this.handleClick = this.handleClick.bind(this)
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
      return <Redirect to='/addchildren' />
    }
  }

  componentDidMount(){
    this.props.getFamilyId()
    this.props.getUser()
    this.props.getChildren(this.props.familyId)
    // this.props.getMyChores(this.props.user.id)
  }

  async handleClick(evt) {
    evt.preventDefault()
    //add familyId to user
    let newFamId = (this.props.familyId + 1)

    try {
      await axios.put(`/api/users/${this.props.user.id}`, {familyId: newFamId, familyIdFinal: true});
      this.setRedirect()
    }
    catch (error){
      console.log(error)
    }

  }

  render(){
    console.log("TEST", this.props)
    return (
      <div>
        <nav>
      {this.props.isLoggedIn ? (
        <div>
          {/* Shown after you log in */}


{this.props.isParent===false && this.props.user.familyIdFinal && (
  <div>


 <h4> Welcome Back to Chore Bunny!
</h4>
<MyChores />
{/* <Link to='/mychores'>View My Chores</Link> */}

  </div>
)}

          {this.props.isParent===false && this.props.user.familyIdFinal===false && (
            <div>


            Welcome to Chore Bunny!
          Start by selecting your helper pet:
          <PetSelect />

            </div>
          )}




          {this.props.isParent && this.props.user.familyIdFinal===false && (
            <div>

            {/* if user.familyIdFinal, skip this */}
              {this.renderRedirect()}

        <p>You can add a child and start assigning chores to him/her!</p>
        <button type="button" className="btn btn-secondary col md-4 center-blocks" onClick={this.handleClick}>
                    Let's Get Started!
        </button>


            </div>
          )}

          {this.props.isParent && this.props.user.familyIdFinal && (
            <div>

            {/* if user.familyIdFinal, skip this */}

              <Chores />

            </div>
          )}
        </div>
      ) : null}
    </nav>







      </div>
    )
  }


}
const mapStateToProps = function(state) {
  return {
    chores: state.chores.chores,
    familyId: state.familyId.familyId,
    isLoggedIn: !!state.user.id,
    isParent: state.user.parent,
    user: state.user,
    children: state.child.children,
    myChores: state.myChores.chores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getChores: () => dispatch(getChores()),
    getFamilyId: () => dispatch(getFamilyId()),
    getUser: () => dispatch(me()),
    getChildren: (familyId) => dispatch(getChildren(familyId)),
    getMyChores: (id) => dispatch(getMyChores(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
