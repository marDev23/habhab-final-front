import React, { Fragment, Component } from 'react'
import { Divider, Container, Image, Header, Menu, Form, Button, Grid, Message } from  'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { VERIFY_PASSWORD } from '../QUERIES/ALL_QUERIES'
import LogoCircle from '../main_logo_mobile.png'

class ResetPage extends Component {
	state = {
		password: ''
	}

	updatePassword = ({ target: { value } }) => {
		this.setState({ password: value })
	}

	resetFields = () => {
		this.setState({ password: '' })
	}

	render() {
		const { history } = this.props
		const { password } = this.state
		console.log(history)
		const token = history.location.search.slice(1)
		console.log(token)
		if (history.location.search === undefined || history.location.search === null) {
			return <Redirect to='/' />
		} 
		return (
			<Fragment>
				<Divider hidden />
				<Container>
					<Header as='h2' color='orange' textAlign='center'>
				        <Image as={Link} to='/' size='small' src={LogoCircle} /> Reset Password 
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
								<Header size='large' textAlign='center'>New Password</Header>
								<Mutation mutation={VERIFY_PASSWORD}>
								{(verifyForgotten, { loading, data, error }) => (
								<Fragment>
								{ loading && '' }
								{ data && <Message positive content='Successfully changed. You can log in now with your new password' />}
								{ error && <Message negative content="Error changing user password." />}
								<Form onSubmit={evt => {
									evt.preventDefault();
									verifyForgotten({
										variables: {
											token: token,
											newPassword: password
										}
									})
									this.resetFields()
									setTimeout(() => {
										history.push('/')
									}, 3000)
								}}>
									<Form.Input
				                        name='newPassword'
				                        fluid
				                        size='small'
				                        icon='lock'
				                        iconPosition='left'
				                        type='password'
				                        value={password}
				                        placeholder='New Password'
				                        onChange={this.updatePassword}
				                      />
				                    <Button type='submit' color='orange' fluid size='small' disabled={password === ''}>Submit</Button>
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

export default ResetPage