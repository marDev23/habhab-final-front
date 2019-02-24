import React from 'react'
import {
  Segment, Container, Grid, Header, List
} from 'semantic-ui-react'

const Footer = () => 
<Segment inverted vertical style={{ padding: '5em 0em' }}>
  <Container>
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='About' />
          <List link inverted>
            <List.Item as='a'>Sitemap</List.Item>
            <List.Item as='a'>Contact Us</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='Services' />
          <List link inverted>
            <List.Item as='a'>About</List.Item>
            <List.Item as='a'>Terms of Services</List.Item>
            <List.Item as='a'>Privacy Policy</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h4' inverted>
            Copyright @ 2019 Hab - Hab Fastfood Restaurant
          </Header>
          <p>
            Hab-Hab is a fastfood located in Tungawan, Zamboanga Sibugay and slowly growing bussiness.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</Segment>

export default Footer