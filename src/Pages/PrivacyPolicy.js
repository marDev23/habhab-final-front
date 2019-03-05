import React, { Fragment } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from '../Components/footer'
import LogoCircle from '../main_logo_mobile.png'

const PrivacyPolicy = () => (
	<Fragment>
		<Divider hidden />
		<Container>
			<Header as='h2' color='orange' textAlign='center'>
		        <Image as={Link} to='/' size='small' src={LogoCircle} /> Privacy Policy
		    </Header>
		</Container>
		<Divider hidden />
		<Container>
			<Header size='small'>1. What data is being collected?</Header>
			<Header size='tiny'>We collect different information from you already when you are visiting us that you submitted through forms.</Header>
			<Header size='tiny'>When you sign up for an account with us, we ask for similar information:</Header>
			<Header size='tiny'>-Name</Header>
			<Header size='tiny'>-E-mail</Header>
			<Header size='tiny'>-Mobile Number</Header>
			<Header size='tiny'>-Address</Header>
			<Header size='tiny'>-Birthdate</Header>
			<Header size='small'>2. How will your data be shared and who has access to it?</Header>
			<Header size='tiny'>We do not share your data with any other companies, the data that we send to other third-party apps are administrate by ourselves. Only in the case that we need technical support ourselves a technician of our third-party apps could have access to the data. The GDPR compliance of this third-party app protects your data from being shared.</Header>
			<Header size='small'>3. How about age restricting?</Header>
			<Header size='tiny'>We can't restrict age limit as of now upon signing up in the site. To know more about this, please view the Terms and Condition.</Header>
			<Header size='small'>4. Fake Information and Delivery unattendance.</Header>
			<Header size='tiny'>This site will banned you for not attending/claiming your order.</Header>
		</Container>
		<br />
		<Footer />
	</Fragment>
	
)

export default PrivacyPolicy