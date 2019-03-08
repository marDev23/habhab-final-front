import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Responsive, Sidebar, Menu, Container, Segment, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { SideBarComponent, HorizontalSearchBar } from './'
import Logo from '../../main_logo_mobile.png'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class MobileContainer extends Component {
  state = { 
    isSearchVisible: false
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })
  handleSearchBarToggle = () => this.setState({ isSearchVisible: !this.state.isSearchVisible })

  render() {
    const { children, userData } = this.props
    const dataBoolean = userData === undefined
    const { sidebarOpened, isSearchVisible } = this.state
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={910}
      >
        <SideBarComponent
          visible={sidebarOpened}
          onHide={this.handleSidebarHide}
          userName={userData}
          dataBoolean={dataBoolean}/>
        
        <HorizontalSearchBar
        onClick={this.handleSearchBarToggle}
        visible={isSearchVisible} />
        <Sidebar.Pusher dimmed={sidebarOpened}>
        
          <Segment
            textAlign='center'
            style={{ minHeight: 50, padding: '0em 0em' }}
            vertical
          >
            <Container textAlign='center'>
              <Menu 
              secondary
              size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item as={Link} to='/'>
                  <Image circular size='mini' src={Logo}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item onClick={this.handleSearchBarToggle}>
                    <Icon name='search' />
                  </Menu.Item>
                  <Menu.Item as={Link} to='/tray'>
                    <Icon name='utensils' />
                  </Menu.Item>
                  <Menu.Item as={Link} to='/profile'>
                    <Icon name='user outline' />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

export default MobileContainer