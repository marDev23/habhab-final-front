import React, { Fragment } from 'react'
import { Icon, Step, Grid, Header, Image, Container, Divider } from 'semantic-ui-react'
import LogoCircle from '../../main_logo_mobile.png'

const Steps = ({ step, children }) => (
<Fragment>
	<Divider hidden />
	<Container>
		<Header as='h2' color='orange' textAlign='center'>
	              <Image size='small' src={LogoCircle} /> Checkout
	            </Header>
	</Container>
	<Divider hidden />
	<Grid container stackable centered>
		<Grid.Row>
			<Grid.Column width={10}>
				<Step.Group size='mini' widths={3} unstackable>
				    <Step active={1 === step}>
				      <Icon name='food' />
				      <Step.Content>
				        <Step.Title>Review</Step.Title>
				      </Step.Content>
				    </Step>
				    <Step active={2 === step}>
				      <Icon name='truck' />
				      <Step.Content>
				        <Step.Title>Delivery</Step.Title>
				      </Step.Content>
				    </Step>
				    <Step active={3 === step}>
				      <Icon name='info' />
				      <Step.Content>
				        <Step.Title>Confirm Order</Step.Title>
				      </Step.Content>
				    </Step>
				</Step.Group>
			</Grid.Column>
			<Grid.Column width={10}>
				<Divider hidden />
				{children}
			</Grid.Column>
		</Grid.Row>
	</Grid>
</Fragment>
)
export default Steps