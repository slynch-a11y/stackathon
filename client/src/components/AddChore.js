import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createChore, getChores } from '../store/chores'
import {me} from '../store/user'
import {getChildren} from '../store/child'

class AddChore extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      completeBy: '',
      userId: '',

      formErrors: {
        description: '',
        completeBy: ''
      },
      descriptionValid: false,
      completeByValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateField = this.validateField.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

 componentDidMount(){
this.props.findUser()
this.props.getChildren(this.props.user.familyId)
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let descriptionValid = this.state.descriptionValid
    let completeByValid = this.state.completeByValid

    switch (fieldName) {
      case 'description':
      descriptionValid = value.length >= 1
        fieldValidationErrors.description = descriptionValid ? '' : ' must not be empty'
        break
      case 'completeBy':
      completeByValid = value.match(/\b(0?[1-9]|1[0-9]|2[0-4])\b/g)
      fieldValidationErrors.completeBy = completeByValid ? '' : ' is not a valid hour'
      break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        descriptionValid: descriptionValid,
        completeByValid: completeByValid
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.descriptionValid &&
        this.state.completeByValid
    })
  }

  handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    this.setState({[name]: value}, () => {
      this.validateField(name, value)
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    //userId will be the selected child!!!!! (not this.props.user.id)
    this.props.createChore({description: this.state.description, hour: +this.state.completeBy, userId: this.state.userId})
    this.props.getChores()
  }

  render() {
    console.log("ADDCHORE", this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" />
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="Enter The Chore Description"
            />
            {this.state.formErrors.description.length > 0 ? (
                <p>
                  {this.state.description}
                  {this.state.formErrors.description}
                </p>
              ) : (
                ''
              )}

            <label htmlFor="completeBy" />
            <input
              type="text"
              name="completeBy"
              onChange={this.handleChange}
              value={this.state.completeBy}
              placeholder="Enter the hour at which the chore should be completed"
            />
            {this.state.formErrors.completeBy.length > 0 ? (
                <p>
                  {this.state.completeBy}
                  {this.state.formErrors.completeBy}
                </p>
              ) : (
                ''
              )}

 <label>Select Child to Assign Chore To</label>
           <select name="userId" onChange={this.handleChange}>
             <option value="">--</option>
             {
               (this.props.children) ? this.props.children.map(child => (
               <option key={child.id} value={child.id}>
                 {child.name}{" "}
               </option>
             )) : null
             }
           </select>
            <button
            disabled={
              !this.state.description ||
              !this.state.completeBy
            }
              className="btn btn-secondary col md-4 center-blocks"
              type="submit"
              onClick={this.submit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    children: state.child.children,
    chores: state.chores.chores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createChore: chore => dispatch(createChore(chore)),
    findUser: () => dispatch(me()),
    getChildren: (familyId) => dispatch(getChildren(familyId)),
    getChores: () => dispatch(getChores())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChore)
