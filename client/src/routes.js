import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me, getChores, getFamilyId} from './store'
import Welcome from './components/Welcome'
import AddChild from './components/AddChild'
import AddChore from './components/AddChore'
import Chores from './components/Chores'
import MyPet from './components/MyPet'
import MyChores from './components/MyChores'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isParent} = this.props
console.log("LOGGEDINPROPS", this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={Welcome} />
            <Route path="/pets/:petId" component={MyPet} />
            <Route path="/mychores" component={MyChores} />
            {isParent && (
              <Switch>
                <Route exact path="/home" component={Welcome} />
                <Route exact path="/addchildren" component={AddChild} />
                <Route exact path="/chores" component={Chores} />

                <Route exact path="/addchores" component={AddChore} />

              </Switch>
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isParent: state.user.parent
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getChores())

    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
