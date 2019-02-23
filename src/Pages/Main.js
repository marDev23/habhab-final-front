import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Segment, Grid, Header, Container, Loader } from 'semantic-ui-react'
import ImageCarousel from '../Components/Carousel/ImageCarousel'
import { Item } from '../Components/Item'
import { ALL_PRODUCTS_FEATURED } from '../QUERIES/ALL_QUERIES'

const Main = () => (
<Fragment>
	<ImageCarousel />
	<Segment style={{ padding: '3em 0em' }} vertical>
		<Header as='h2' textAlign='center'>
			<Header.Content>Feature Product(s)</Header.Content>
		</Header>
		<Container
		textAlign='center'>
			<Grid doubling columns={4} celled>
				<Query query={ALL_PRODUCTS_FEATURED}>
					{({ data, loading, error }) => {
						if (loading) return <Loader active inline='centered' size='large' />
						// console.log(data)
						return (
							<Fragment>
							{data.products.map(product => (
							    <Item item={product} key={product.id}> </Item>
							))}
							</Fragment>
					    )
					}}
			    </Query>
			</Grid>
	    </Container>
	</Segment>
</Fragment>
)
export default Main
