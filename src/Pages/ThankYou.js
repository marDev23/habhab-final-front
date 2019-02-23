import React, { Fragment } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import LogoCircle from '../main_logo_mobile.png'

const ThankYou = ({location: { state }}) => {
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
			</Container>
		</Fragment>
	)
}

export default ThankYou