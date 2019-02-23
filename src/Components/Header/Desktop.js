import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Container, Image, Menu, Responsive, Segment, Visibility, Input, Header, Form } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { NavProfile, NavCategory, HeaderTray } from './'
import Logo from '../../main_logo.png'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state= {
      checkCart: ''
    }
  }
  
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  
  render() {
    const { children, userData, history } = this.props
    const dataBoolean = userData === undefined
    const { fixed } = this.state

    return (
      <Responsive
        getWidth={getWidth}
        minWidth={910}
        >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 50, padding: '0em 0em', background: '' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              pointing={!fixed}
              size='large'
              borderless
            >
              <Container>
                <Menu.Item as={Link} to='/'>
                  <Image
                    size='tiny'
                    src={Logo}
                    style={{ minHeight: 40, minWidth: 150 }}
                  />
                </Menu.Item>
                <Menu.Item as={Link} to='/'>
                  <Header size='tiny'>
                    Home
                  </Header>
                </Menu.Item>
                <Menu.Item as='a'>
                  <NavCategory />
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item>
                  <Form onSubmit={evt => {
                    evt.preventDefault();
                    const {target} = evt
                    const valueSearch = target[0].value
                    history.push({
                      pathname: '/search',
                      search: valueSearch,
                    })
                  }}>

  		              <Input
                      size='large'
                      icon='search'
                      placeholder='Search...' />
                  </Form>
  		            </Menu.Item>
                  <Menu.Item as={Link} to='/tray'>
                    <HeaderTray
                      dataBoolean={dataBoolean}
                      userData={userData} />
                    
            
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to='/profile'>
                    <NavProfile
                      dataBoolean={dataBoolean} />
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default withRouter(DesktopContainer)