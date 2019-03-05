import React from 'react'
import {
  Segment, Container, Grid, Header, List
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Footer = () => 
<Segment inverted vertical style={{ padding: '5em 0em' }}>
  <Container>
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='About' />
          <List link inverted>
            <List.Item as={Link} to='/site_map'>Sitemap</List.Item>
            <List.Item><Header size='tiny'>+639 7781 62762</Header><Header size='tiny'>habhab_biz23@yahoo.com</Header></List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header inverted as='h4' content='Services' />
          <List link inverted>
            <List.Item as={Link} to='/about_us'>About Us</List.Item>
            <List.Item as={Link} to='/terms_and_conditions'>Terms of Condition</List.Item>
            <List.Item as={Link} to='/privacy_policy'>Privacy Policy</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h4' inverted>
            Copyright @ 2019 Hab - Hab Fastfood Restaurant
          </Header>
          <p>
            Hab-Hab is a fastfood Restaurant located in Tungawan, Zamboanga Sibugay and slowly growing bussiness.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</Segment>

export default Footer