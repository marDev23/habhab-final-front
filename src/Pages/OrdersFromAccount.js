import React, { Fragment } from 'react'
import { Segment, Grid, Accordion } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { MY_ORDERS } from '../QUERIES/ALL_QUERIES'
import { AccountMenu, OrderTitleContent } from '../Components/Account'

const OrdersFromAccount = ({ match }) => (
	<Segment style={{ padding: '3em 0em', minHeight: '100%' }} vertical>
		<Grid container stackable centered columns={2}>
		<Grid.Row>
		    <Grid.Column width={4}>
				<AccountMenu activeItem={`${match.url}`} />
			</Grid.Column>
			<Grid.Column width={8}>
				<Accordion fluid styled>
					<Query query={MY_ORDERS}>
    				{({ loading, data: { me } }) => {
						if (loading) return ''
						console.log(me)
						return (
							<Fragment>
								{me.orders.map((x, i) => (
									<OrderTitleContent
										key={x.id}
							        	orderTypeObj={x}
							        	match={match}
							        />
						    	))}
					        </Fragment>
				        )
					}}
				    </Query> 
			    </Accordion>
		    </Grid.Column>
		</Grid.Row>
		</Grid>
	</Segment>
)

export default OrdersFromAccount


