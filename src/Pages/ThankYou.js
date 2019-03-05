import React, { Fragment, Component } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import LogoCircle from '../main_logo_mobile.png'

class ThankYou extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.history.push('/')
		}, 10000)
	}
	render(){
		const { location: { state } } = this.props
		if (state === undefined) {
			return <Redirect to='/' />
		}
		return(
			<Fragment>
				<Divider hidden />
				<Container>
					<Header as='h2' color='orange' textAlign='center'>
				        <Image as={Link} to='/' size='small' src={LogoCircle} /> Thank you for ordering with us! 
				    </Header>
				</Container>
				<Divider hidden />
				<Container>
					<Header color='orange' size='medium' textAlign='center'>
						ORDER NUMBER: #{state.id}
					</Header>
					<Header textAlign='center' size='tiny'>Redirecting in 10 seconds...</Header>
				</Container>
			</Fragment>
		)
	}
}

export default ThankYou