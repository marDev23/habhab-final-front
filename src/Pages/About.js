import React, { Fragment } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from '../Components/footer'
import LogoCircle from '../main_logo_mobile.png'

const About = () => (
	<Fragment>
		<Divider hidden />
		<Container>
			<Header as='h2' color='orange' textAlign='center'>
		        <Image as={Link} to='/' size='small' src={LogoCircle} /> About Us
		    </Header>
		</Container>
		<Divider hidden />
		<Container>
			<Header size='small'>Habhab.biz is fastfood restaurant located in Tungawan, Zamboanga Sibugay.</Header>
			<Header size='small'>We have two branch - Ipil and Tungawan</Header>
			<Header size='small'>Habhab is a fast food resto with very relaxing ambiance. We serve fried chicken that comes with free soup at a very affordable price.</Header>
			<Header size='small'>You can contact us at mobile number +639 7781 62762 or email us at habhab_biz23@yahoo.com.</Header>
		</Container>
		<br />
		<Footer />
	</Fragment>
	
)

export default About

