import React, { Component } from 'react'
import { Segment, Breadcrumb, Container, Header, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { Query } from 'react-apollo'
import TrayGrid from '../Components/Tray/TrayGrid'

class MainTray extends Component {
	render() {
		 return (
			<Segment style={{ padding: '3em 0em' }} vertical>
				<Container>
					<Breadcrumb>
					    <Breadcrumb.Section as={Link} to='/'>HOME</Breadcrumb.Section>
					    <Breadcrumb.Divider />
					    <Breadcrumb.Section active>TRAY</Breadcrumb.Section>
					</Breadcrumb>
				</Container>
				<Header as='h2' textAlign='center'>
				</Header>
				<Grid container stackable>
				   <TrayGrid />
				</Grid>
			</Segment>
		)
	}
}

export default MainTray