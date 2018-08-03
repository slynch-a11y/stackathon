import React from 'react'
import {connect} from 'react-redux'
import {getChores} from '../store/chores'

class Test extends React.Component {

  render(){
    console.log("TEST", this.props)
    return (
      <div>TESTING
      </div>
    )
  }


}
const mapStateToProps = function(state) {
  return {
    chores: state.chores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChores: () => dispatch(getChores())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)

