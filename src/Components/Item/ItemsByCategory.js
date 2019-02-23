import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Loader, Header, Grid } from 'semantic-ui-react'
import { ALL_ITEMS_BY_CATEGORY } from '../../QUERIES/ALL_QUERIES'
import { Item } from '.'


const ItemsByCategory = ({category}) => (
	<Query 
		query={ALL_ITEMS_BY_CATEGORY}
		variables={{categoryId: category.id}}
	>
	{({ loading, data, error }) => {
		if (loading) return <Loader active inline='centered' size='large' />
		const isEmpty = data.productByCategory.length === 0 || data.productByCategory === null
		if (isEmpty) return (
			<Grid container stackable>
				<Grid.Row>
      			<Grid.Column>
	            	<Header as='h3' textAlign='center'>
	              		<Header.Content>This category is empty. Please try to navigate another category.</Header.Content>
	            	</Header>
     	 		</Grid.Column>
     	 		</Grid.Row>
    		</Grid>
		)
		return (
			<Fragment>
				{data.productByCategory.map(productBySpecific => (
					<Item key={productBySpecific.id} item={productBySpecific} />
				))}
			</Fragment>
		)
	}}

	</Query>
)
export default ItemsByCategory