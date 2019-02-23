import React from 'react'
import { Sidebar, Grid, Segment, Input, Icon, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const HorizontalSearchbar = withRouter(({...props}) => (
  <Sidebar
  as={Segment}
  animation='overlay'
  direction='top'
  visible={props.visible}>
    <Grid>
        <Grid.Row textAlign='center'>
        <Grid.Column mobile={12}>
          <Form onSubmit={evt => {
                    evt.preventDefault();
                    const {target} = evt
                    const valueSearch = target[0].value
                    props.history.push({
                      pathname: '/search',
                      search: valueSearch,
                    })
                  }}>

                    <Input
                      fluid
                      size='medium'
                      icon='search'
                      placeholder='Search...' />
                  </Form>
            </Grid.Column>
            <Grid.Column mobile={2}>
          <Icon onClick={props.onClick} color='orange' size='big' name='close' />
          </Grid.Column>

          </Grid.Row>

    </Grid>
  </Sidebar>
))

export default HorizontalSearchbar