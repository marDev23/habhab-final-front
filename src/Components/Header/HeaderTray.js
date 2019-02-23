import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Popup, Icon, Grid, Menu, Header, Button } from 'semantic-ui-react'
import HeaderTrayItem from '../Tray/HeaderTrayItem'

class HeaderTray extends Component {

  minusQuantity = (id) => {
    console.log(id)
  }

  plusQuantity = () => {
    console.log('miss')
  }

  render() {
    const { userData, dataBoolean } = this.props
    const isCartEmpty = userData === 0 || userData === undefined || userData.me.cart.length === 0
    // console.log(userData)
      return (
      <Popup
        trigger={<Icon circular color='orange' size='large' name='food' />}
        flowing
        hoverable
        position='bottom right'>
        {
          dataBoolean
          ?
            <Grid centered>
              <Grid.Column>
                <Menu fluid vertical>
                  <Menu.Item position='right'>
                    <Button as={Link} color='orange' to='/log_in'>
                      Log In
                    </Button>
                    <Button as={Link} to='/sign_up' style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid>
          :
            <Fragment>
            <Grid fluid='true'>
              <Grid.Column textAlign='left'>
                {
                  isCartEmpty
                  ?
                    <Header as='h5' textAlign='center'>
                      <Header.Content>The tray is empty. Please add your product.</Header.Content>
                    </Header>
                  :
                    <Fragment>
                    {userData.me.cart.map(cart =>
                      <HeaderTrayItem cart={cart} key={cart.id} />
                    )}
                    </Fragment>
                }
              </Grid.Column>
            </Grid>
            {
              isCartEmpty

              ?
                ''
              :
                <Grid fluid='true'>
                    <Grid.Column>
                      <Menu fluid vertical borderless compact>
                        <Menu.Item>
                          <Button fluid as={Link}  to='/tray'>
                           View Tray
                          </Button>
                          <Button fluid as={Link} to='/checkout' color='orange' style={{ marginTop: '0.5em' }}>
                            Checkout
                          </Button>
                        </Menu.Item>
                      </Menu>
                    </Grid.Column>
                </Grid>
            }
            </Fragment>
        }
      </Popup>
    )
  }
}

export default HeaderTray
