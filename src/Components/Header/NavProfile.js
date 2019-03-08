import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Popup, Grid, Menu, Icon, Button } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { SIGN_OUT } from '../../QUERIES/ALL_QUERIES'
// import { CACHE_USER_DATA } from '../../MUTATIONS/CACHE_CART_DATA'

const NavProfile = withRouter(({history, ...props}) => {
  // console.log(location)
  return (
  <Popup
    trigger={<Icon circular color='orange' size='large' name='user circle' />}
    flowing
    hoverable
    position='bottom center'>
    <Grid centered>
      <Grid.Column>
        <Menu fluid vertical>
        { 
          props.dataBoolean
          ? 
          <Menu.Item position='right'>
            <Button as={Link} color='orange' to='/log_in'>
              Log In
            </Button>
            <Button as={Link} to='/sign_up' style={{ marginLeft: '0.5em' }}>
              Sign Up
            </Button>
          </Menu.Item>
          :
          <Fragment>
          <Menu.Item className='header' as={Link} to='/messages'>
            Messages
          </Menu.Item>
          <Menu.Item as={Link} to='/orders'>
            Orders
          </Menu.Item>
          <Menu.Item as={Link} to='/tray'>
            Tray
          </Menu.Item>
          <Menu.Item as={Link} to='/profile'>Profile</Menu.Item>
          <Mutation 
            mutation={SIGN_OUT}
          >
          {( signOut, { loading, data, error }) => (
            <Fragment>
              { loading && '' }
              { data && history.go(0) }
              <Menu.Item
                as='a'
                onClick={evt => {
                  evt.preventDefault();
                  signOut()
                }}>
                  Log Out
              </Menu.Item>
            </Fragment>
          )}
          </Mutation>
          </Fragment>
        }
        </Menu>
      </Grid.Column>
    </Grid>
  </Popup>
)})

export default NavProfile