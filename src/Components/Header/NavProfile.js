import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Popup, Grid, Menu, Icon, Button, Label } from 'semantic-ui-react'

const NavProfile = ({...props}) => (
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
            <Label circular color='red' empty />
            Messages
          </Menu.Item>
          <Menu.Item as={Link} to='/orders'>
            <Label circular color='red' empty />
            Orders
          </Menu.Item>
          <Menu.Item as={Link} to='/tray'>
            <Label circular color='red' empty />
            Tray
          </Menu.Item>
          <Menu.Item as={Link} to='/profile'>Profile</Menu.Item>
          <Menu.Item as='a'>Log Out</Menu.Item>
          </Fragment>
        }
        </Menu>
      </Grid.Column>
    </Grid>
  </Popup>
)

export default NavProfile