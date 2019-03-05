import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
// import LogInError from './LogInError'
import LogoCircle from '../main_logo_mobile.png'

const logInMutation = gql`
    mutation SignInMutation($email: String!, $password: String!){
    signIn(email: $email, password: $password)
  }
`

class LogIn extends Component {
  state={
    email: '',
    password: '',
    visible: false,
    errorPassword: false,
    errorEmail: false,
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
  handleDismiss = () => { this.setState({ visible: false }) }

  render() {
    const { email, password, errorPassword, errorEmail } = this.state
    return (
      <div className='login-form'>
        {/*
          /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).{8,15}*$/
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
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
              <Image as={Link} to={'/'} src={LogoCircle} /> Log-in to your account
            </Header>
            {
              errorPassword || errorEmail
              ?
              <Message warning size='small'>
                <Message.Header>Validation Error!</Message.Header>
                <Message.List>
                  {
                    errorEmail
                    ?
                    <Message.Item>email address.</Message.Item>
                    : ''
                  }
                  {
                    errorPassword ?
                    <Message.Item>password should be eight characters (uppercase, lowercase and digit) </Message.Item>
                    : ''
                  }
                </Message.List>
              </Message>
              : ''
            }
            <Mutation mutation={logInMutation}>
              {(signIn, { error, loading, data }) => (
                <Fragment>
                { error && 
                    <Message
                    size='mini'
                    error
                    header='Error Signing In'
                    list={error.graphQLErrors.map(x => x.message)}
                  /> }
                  <Form
                    size='large'
                    onSubmit={evt => {
                      evt.preventDefault();
                      signIn({
                        variables: {
                          email,
                          password
                        }
                      })
                    }}
                  >
                    <Segment stacked>
                      <Form.Input
                        name='name'
                        fluid
                        size='small'
                        icon='user'
                        iconPosition='left'
                        placeholder='E-mail Address'
                        onChange={this.updateEmail}
                      />
                      <Form.Input
                        fluid
                        size='small'
                        name='password'
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={this.updatePassword}
                      />

                      <Button type='submit' color='orange' fluid size='small' disabled={errorPassword || errorEmail}>
                        Log In
                      </Button>
                    </Segment>
                  </Form>
                  { loading && <p>Loading...</p>}
                  {data && <Redirect to='/' /> }
                  </Fragment>
              )}
            </Mutation>
            <Container textAlign='right'><a href='/forgot_password'>Forgot Password?</a></Container>
            
            <Message>
              New to us? <a href='/sign_up'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LogIn