import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { MY_ADDRESS } from '../QUERIES/ALL_QUERIES'
import MainCheckout from '../Components/Checkout/MainCheckout'
// import Spinner from '../Components/loader'

const Checkout = () => (
	<Container textAlign='center'>
    <Fragment>
		 <Query query={MY_ADDRESS}>
            {({ loading, data: { me } }) => {
            	if (loading) return ''
            	const emptyAddress = { municipal: '', baranggay: '', id: '', isPickUpAvailable: false, zip: '', fee: '', province: '' }
        		if (me.address === null || me.address === undefined) {
        			return <MainCheckout address={emptyAddress} />
        		}
        		return <MainCheckout address={me.address} />
        	}}
        </Query>
    </Fragment>
    </Container>
)
export default Checkout