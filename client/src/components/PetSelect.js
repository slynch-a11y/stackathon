import React from 'react'
import {connect} from 'react-redux'
import AddChore from './AddChore'
import {me} from '../store/user'
import {getPets} from '../store/petSelector'
import { Link } from 'react-router-dom'
import {getMyChores} from '../store/myChores'


class PetSelect extends React.Component {
  constructor(){
    super()
  }


  componentDidMount(){
    this.props.getPets()
    this.props.getMyChores(this.props.user.id)
  }


  render(){


    return (
      <div>

        {
          this.props.pets.map(pet => <div key={pet.id}><Link to={`/pets/${pet.id}`}><img width='250' src={pet.image}/></Link></div>)
        }
        </div>
    )
  }

}

function findPets(petArray){
  let foundPets = petArray.filter(pet => pet.used === false)
  return foundPets
}

const mapStateToProps = function(state) {
  return {
    pets: findPets(state.petSelector.pets),
    myChores: state.myChores.chores,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPets: () => dispatch(getPets()),
    getMyChores: (id) => dispatch(getMyChores(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetSelect)


