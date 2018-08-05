import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createChild } from '../store/child'
import {me} from '../store/user'
import { Redirect } from 'react-router-dom'


class AddChild extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      redirect: false,
      formErrors: {
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
      },
      nameValid: false,
      emailValid: false,
      phoneNumberValid: false,
      passwordValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateField = this.validateField.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.setRedirect = this.setRedirect.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  componentDidMount(){
this.props.findUser()
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/chores' />
    }
  }
  handleClick(evt){
    evt.preventDefault()
   this.setRedirect()

  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let nameValid = this.state.nameValid
    let emailValid = this.state.emailValid
    let phoneNumberValid = this.state.phoneNumberValid
    let passwordValid = this.state.passwordValid

    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 1
        fieldValidationErrors.name = nameValid ? '' : ' must not be empty'
        break
      case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      fieldValidationErrors.email = emailValid ? '' : ' is invalid'
      break
      case 'phoneNumber':
        phoneNumberValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
        fieldValidationErrors.phoneNumber = phoneNumberValid ? '' : ' must be a valid phone number'
        break
      case 'password':
      this.state.passwordValid = value.length >= 8
      fieldValidationErrors.password = this.state.passwordValid
        ? ''
        : ' must be at least 8 characters'
      break
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        phoneNumberValid: phoneNumberValid
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.phoneNumberValid
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
    const {name, email, password, phoneNumber} = this.state

    this.props.createChild({name, email, password, phoneNumber, parent: false, familyId: this.props.user.familyId, familyIdFinal: true})
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" />
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Enter Name of Child"
            />
            {this.state.formErrors.name.length > 0 ? (
                <p>
                  {this.state.name}
                  {this.state.formErrors.name}
                </p>
              ) : (
                ''
              )}

            <label htmlFor="email" />
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Enter Child's Email"
            />
            {this.state.formErrors.email.length > 0 ? (
                <p>
                  {this.state.email}
                  {this.state.formErrors.email}
                </p>
              ) : (
                ''
              )}

            <label htmlFor="phoneNumber" />
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              value={this.state.phoneNumber}
              placeholder="Enter the Number for sending Text Messages"
            />
            {this.state.formErrors.phoneNumber.length > 0 ? (
                <p>
                  {this.state.phoneNumber}
                  {this.state.formErrors.phoneNumber}
                </p>
              ) : (
                ''
              )}

            <label htmlFor="password" />
            <input
              type="text"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="Enter the password for your child to use to log in"
            />
            {this.state.formErrors.password.length > 0 ? (
                <p>
                  {this.state.password}
                  {this.state.formErrors.password}
                </p>
              ) : (
                ''
              )}


            <button
            disabled={
              !this.state.name ||
              !this.state.email ||
              !this.state.phoneNumber ||
              !this.state.password
            }
              className="btn btn-secondary col md-4 center-blocks"
              type="submit"
              onClick={this.submit}
            >
              Submit
            </button>
          </div>
        </form>
        <button onClick={this.handleClick}>Done Adding Children</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createChild: child => dispatch(createChild(child)),
    findUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChild)
