import React, { Fragment, Component } from 'react'
import { Divider, Container, Image, Header, Menu, Form, Button, Grid, Message } from  'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { FORGOT_PASSWORD } from '../QUERIES/ALL_QUERIES'
import LogoCircle from '../main_logo_mobile.png'

class ForgotPassword extends Component {

	state = {
		email: ''
	}

	updateEmail = ({ target: { value } }) => {
		this.setState({ email: value })
	}

	render() {
		const { email } = this.state

		return (
			<Fragment>
				<Divider hidden />
				<Container>
					<Header as='h2' color='orange' textAlign='center'>
				        <Image as={Link} to='/' size='small' src={LogoCircle} /> Forgot Password
				    </Header>
				</Container>
				<Divider hidden />
				<Container textAlign='center'>
				<Grid container stackable centered>
		<Grid.Row>
			<Grid.Column width={10}>
					<Menu vertical fluid>
						<Menu.Menu>
							<Menu.Item>
								<Header size='large' textAlign='center'>Enter Email</Header>
								<Mutation mutation={FORGOT_PASSWORD}>
								{(changeForgotten, { loading, data, error }) => (
								<Fragment>
								{ loading && '' }
								{ data && <Message positive content='We send a verification link to your email. You can check it now.' />}
								{ error && <Message negative content="Error finding user account." />}
								<Form onSubmit={evt => {
									evt.preventDefault();
									changeForgotten({
										variables: {
											email: email
										}
									})
								}}
								>
									<Form.Input
				                        name='email'
				                        fluid
				                        size='small'
				                        icon='mail'
				                        iconPosition='left'
				                        type='e-mail'
				                        placeholder='Enter Email'
				                        onChange={this.updateEmail}
				                      />
				                    <Button type='submit' color='orange' fluid size='small' disabled={email === ''}>Submit</Button>
								</Form>
								</Fragment>
								)}
								</Mutation>
							</Menu.Item>
						</Menu.Menu>
					</Menu>
					</Grid.Column>
					</Grid.Row>
					</Grid>
				</Container>
			</Fragment>
		)
	}
}

export default ForgotPassword