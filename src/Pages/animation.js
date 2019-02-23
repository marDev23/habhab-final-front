import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Sidebar,
  Input
} from 'semantic-ui-react'

const HorizontalSidebar = ({ visible }) => (
  <Sidebar as={Segment} animation='overlay' direction='top' visible={visible}>
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Input fluid icon={<Icon name='search' link />} placeholder='Search...' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  visible: PropTypes.bool,
}


export default class SidebarExampleTransitions extends Component {
  state = {
    visible: false,
  }

  handleAnimationChange = () => () =>
    this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    return (
      <div>

        <Header as='h5'>All Direction Animations</Header>
        <Button onClick={this.handleAnimationChange}>Overlay</Button>
          <HorizontalSidebar visible={visible} />
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Button onClick={this.handleAnimationChange('overlay')}>Overlay</Button>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
      </div>
    )
  }
}