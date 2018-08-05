import React from 'react'
import {connect} from 'react-redux'
import AddChore from './AddChore'
import {getChores} from '../store/chores'
import {getChildren} from '../store/child'
import {me} from '../store/user'

class Chores extends React.Component {
  constructor(){
    super()
  }


  componentDidMount(){

    console.log("MYFAMILYID", this.props.familyId)
    this.props.getUser()
    this.props.getChores(this.props.user.familyId)
    this.props.getChildren(this.props.user.familyId)
  }


  render(){
    console.log("CHORES", this.props.children[0])
    let child1 = this.props.children[0]
    console.log("CHILD1", child1)

    return (
      <div>

        <table>
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
              <td>{this.props.choreObject[child.name].join(' ,  ')}</td>
              </tr>

            )

            )


          )
           : null

        }

            </tbody>
            </table>
        <h4>Let's add some chores!<AddChore /></h4>
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
console.log("MYOBJ", obj)
  for (let i=0; i<chores.length; ++i){
    let currentChildChore = chores[i]
    console.log("CURRENTCHILDCHORE", currentChildChore)
    if (obj[currentChildChore.name]){
      obj[currentChildChore.name].push(currentChildChore.user_chores.map(chore => (
        chore.chore.description)))
    }
 }
console.log("MYOBJJJJJ", obj)
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


