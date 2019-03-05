import React, { Fragment } from 'react'
import { Divider, Container, Image, Header } from  'semantic-ui-react'
import { Link } from 'react-router-dom'
import Footer from '../Components/footer'
import LogoCircle from '../main_logo_mobile.png'

const TermsAndCondition = () => (
	<Fragment>
		<Divider hidden />
		<Container>
			<Header as='h2' color='orange' textAlign='center'>
		        <Image as={Link} to='/' size='small' src={LogoCircle} /> Terms And Condition
		    </Header>
		</Container>
		<Divider hidden />
		<Container>
			<Header size='tiny'>Welcome to our website. This site is maintained as a service to our customers. By using this site, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms and conditions carefully. If you do not agree to these terms and conditions, you should not use this site.</Header>
			<Header size='small'>1. Agreement.</Header>
			<Header size='tiny'>This Agreement ("the Agreement") specifies the Terms and Conditions for access to and use of https://www.habhab.biz/terms_and_conditions do (the "Site") and describes the terms and conditions applicable to your access of and use of the Site http://www.habhab.biz/terms_and_conditions do. reserves the right, in its sole discretion, to modify, alter, or otherwise change this Agreement at any time. will provide notice of such change on this website. Any such modifications shall be effective immediately. You can view the most recent version of these terms at any time at http://www.habhab.com. Each use by you shall constitute and be deemed your unconditional acceptance of this Agreement. If at any time you do not accept these changes, you must immediately discontinue use of http://www.habhab.com to which the changes may apply.</Header>
			<Header size='small'>2. Privacy.</Header>
			<Header size='tiny'>Your visit to our site is also governed by our Privacy Policy. Please review our Privacy Policy at http://www.habhab.biz.com.</Header>
			<Header size='small'>3. Intended Audience.</Header>
			<Header size='tiny'>This website is intended for adults only. This website is not intended for any children under the age of 13. If you are between 13 and 17, you agree that you received parental permission both to complete the registration process and to use this website and order online from the restaurants listed with on this site.</Header>
			<Header size='small'>4. Use of Information.</Header>
			<Header size='tiny'>reserves the right, and you authorize us, to use and assign all information regarding site uses by you and all information provided by you in any manner consistent with our Privacy Policy at http://www.habhab.biz</Header>
			<Header size='small'>5. Banning.</Header>
			<Header size='tiny'>User account will be banned for false information, not paying ordered items.</Header>
			<Header size='small'>6. Delivery Policy.</Header>
			<Header size='tiny'>An estimated delivery date and time will be provided after your order is placed.</Header>
		</Container>
		<br />
		<Footer />
	</Fragment>
	
)

export default TermsAndCondition