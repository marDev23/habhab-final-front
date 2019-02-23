import React, { Component, Fragment } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import LogoCircle from '../main_logo_mobile.png'
import { SIGN_UP } from '../QUERIES/ALL_QUERIES'

class SignUp extends Component {

  state={
    email: '',
    password: '',
    name: '',
    mobile: '',
    visible: false,
    errorPassword: false,
    errorEmail: false,
    errorName: false,
    errorMobile: false,
    errorConfirmPass: false,
    checkTermState: false
  }
  updateEmail = ({ target: { value } }) => {
    function matchEmailRegEx () {
      if (value.match(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return false
      }
      return true
    }
    this.setState({ email: value, errorEmail: matchEmailRegEx() }) 
  }
  updatePassword = ({ target: { value } }) => {
    // console.log(value)
    function matchPassRegEx () {
      if (value.match(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).{8,50}$/)) {
        return false
      }
      return true
    }
    this.setState({ password: value, errorPassword: matchPassRegEx() })
  }

  updateName = ({ target: { value } }) => {
    function matchNameRegEx () {
      if (value.match(/^[A-Z][a-zA-Z]{3,}(?: [A-Z][a-zA-Z]*){0,2}$/)) {
        return false
      }

      return true
    }
    this.setState({ name: value, errorName: matchNameRegEx() })
  }

  updateMobile = ({ target: { value } }) => {
    function matchMobileRegEx () {
      if (value.match(/^(09|\+639)\d{9}$/)) {
        return false
      }
      return true
    }
    // console.log(matchMobileRegEx())
    this.setState({ mobile: value, errorMobile: matchMobileRegEx() })
  }

  updateConfirmPass = ({ target: { value } }) => {
    console.log(value)
    function matchConfirmPass (passwordVal) {
      if (value === passwordVal) {
        return false
      }
      return true
    }
    this.setState({ errorConfirmPass: matchConfirmPass(this.state.password) })
  }

  clickTerms = (e, { checked }) => {
    this.setState({ checkTermState: checked })
  }

  render() {
    const { email, password, name, mobile, errorEmail, errorPassword, errorName, errorMobile, errorConfirmPass, checkTermState } = this.state
    const errorSepticon = errorName || errorEmail || errorPassword || errorMobile || errorConfirmPass
    const emptySepticon = email === '' || password === '' || name === '' || mobile === ''
  return (
    <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='orange' textAlign='center'>
            <Image as={Link} to='/' src={LogoCircle} /> Sign Up for Hab-Hab
          </Header>
          {
              errorSepticon
              ?
              <Message warning size='small'>
                <Message.Header>Validation Error!</Message.Header>
                <Message.List>
                  {
                    errorName ?
                    <Message.Item>Fullname first letter should be capitalize.</Message.Item>
                    : ''
                  }
                  {
                    errorEmail
                    ?
                    <Message.Item>Email.</Message.Item>
                    : ''
                  }
                  {
                    errorMobile
                    ?
                    <Message.Item>Phone should starts (09 / +639) and 9 digit after .</Message.Item>
                    : ''
                  }
                  {
                    errorPassword ?
                    <Message.Item>password should be eight characters (uppercase, lowercase and digit) </Message.Item>
                    : ''
                  }
                  {
                    errorConfirmPass ?
                    <Message.Item>Password did not match.</Message.Item>
                    : ''
                  }
                </Message.List>
              </Message>
              : ''
            }
          <Mutation mutation={SIGN_UP}>
          {( signUp, { loading, data, error }) => (
            <Fragment>
            {loading && ''}
            {data && 
            <Message positive>
              <Message.Header>Your registration was successful.</Message.Header>
              <p>
                Go to <a href='/log_in'>log in page</a> or <a href='/'>home page</a>.
              </p>
            </Message>
            }
            { error && 
                  <Message
                  size='mini'
                  error
                  header='Error Signing In'
                  list={error.graphQLErrors.map(x => x.message)}
                /> }
            <Form size='large' onSubmit={evt => {
              evt.preventDefault();
              if (errorSepticon || !checkTermState) {
                return ''
              }
              signUp({
                variables: {
                  email,
                  name,
                  mobile,
                  password
                }
              })
            }}
            >
              <Segment stacked>
                <Form.Input 
                fluid
                size='small'
                name='name'
                icon='user'
                iconPosition='left'
                placeholder='Full Name'
                value={data && ''}
                onChange={this.updateName} />
                <Form.Input 
                fluid
                size='small'
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='E-mail address'
                value={data && ''}
                onChange={this.updateEmail} />
                <Form.Input 
                fluid
                size='small'
                name='mobile'
                icon='mobile'
                iconPosition='left'
                placeholder='Mobile Number' 
                value={data && ''}
                onChange={this.updateMobile} />
                <Form.Input
                  fluid
                  size='small'
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={data && ''}
                  onChange={this.updatePassword}
                />
                <Form.Input
                  fluid
                  size='small'
                  name='confirmPassword'
                  icon='user secret'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  value={data && ''}
                  onChange={this.updateConfirmPass}
                />
                <Form.Checkbox
                 size='large'
                 name='terms'
                 fluid='true'
                 width={12}
                 label='I agree to the Terms of Service and Privacy Policy' 
                 onChange={this.clickTerms}
                 />
                <Button color='orange' fluid size='small' disabled={errorSepticon || emptySepticon || !checkTermState}>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            </Fragment>
            )}
            </Mutation>
          <Message>
            Already have an account? <a href='/log_in'>Log In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
    )
  }
}

export default SignUp