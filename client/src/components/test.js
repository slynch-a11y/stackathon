import React from 'react'
import {connect} from 'react-redux'
import {getChores} from '../store/chores'

class Test extends React.Component {

  componentDidMount(){
    this.props.getChores()
  }
  render(){
    console.log("TEST", this.props)
    return (
      <div><ul>{
        this.props.chores.map(chore =>
          <li key={chore.id}>{chore.description}</li>
        )
      }
      </ul></div>
    )
  }


}
const mapStateToProps = function(state) {
  return {
    chores: state.chores.chores
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

