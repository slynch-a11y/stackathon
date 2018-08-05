import React from 'react'
import {connect} from 'react-redux'
import AddChore from './AddChore'
import {getChores} from '../store/chores'
import {getChildren} from '../store/child'
import {me} from '../store/user'
import { Redirect } from 'react-router-dom'

class Chores extends React.Component {
  constructor(){
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

  handleClick(evt) {
    evt.preventDefault()
    this.setRedirect()
  }


  componentDidMount(){

    console.log("MYFAMILYID", this.props.familyId)
    this.props.getUser()
    this.props.getChores(this.props.user.familyId)
    this.props.getChildren(this.props.user.familyId)
  }


  render(){


    return (
      <div>
        {this.renderRedirect()}
        <button type="button" className="btn btn-secondary col md-4 center-blocks" onClick={this.handleClick}>
                   Add Another Child
        </button>
        <p>
<h4>Let's add some chores!<AddChore /></h4></p>
        <table className="table">

            <tbody>
              <tr>
                <th>Child</th>
                <th>Chores</th>

              </tr>
              {

          (this.props.chores) ? (
            this.props.children.map((child, index) => (
              <tr key={index}>
              <td>{child.name}</td>
              <td>{this.props.choreObject[child.name].join(" ").split(",").map((chore, index)=>
                <div key={index}>{chore}</div>
              )}</td>
              </tr>

            )

            )


          )
           : null

        }

            </tbody>
            </table>

        </div>
    )
  }

}

function choreObj(children, chores){
let obj = {}
  let names = children.map(child => child.name)
for (let j=0; j<names.length; ++j){
  let currentName = names[j]
  obj[currentName] = []
}
  for (let i=0; i<chores.length; ++i){
    let currentChildChore = chores[i]
    if (obj[currentChildChore.name]){
      obj[currentChildChore.name].push(currentChildChore.user_chores.map(chore => (
        chore.chore.description)))
    }
 }
return obj
}




const mapStateToProps = function(state) {
  return {
    chores: state.chores.chores,
    familyId: state.familyId.familyId,
    children: state.child.children,
    user: state.user,
    choreObject: choreObj(state.child.children, state.chores.chores)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChores: (familyId) => dispatch(getChores(familyId)),
    getChildren: (familyId) => dispatch(getChildren(familyId)),
    getUser: () => dispatch(me())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chores)


