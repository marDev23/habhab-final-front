import React, { Fragment } from 'react'
import { Segment, Header, Breadcrumb, Container, Loader, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { ALL_CATEGORIES } from '../QUERIES/ALL_QUERIES'
import { ItemsByCategory } from '../Components/Item'



const Category = ({ match }) => {
	return (
	<Fragment>

		<Segment style={{ padding: '2em 0em' }} vertical>
			<Query
				query={ALL_CATEGORIES}
				variables={{category: match.params.id}}
			>
				{({ loading, data, error }) => {
				if (loading) return <Loader active inline='centered' size='large' />
				return (
					<Fragment>
						<Container>
							<Breadcrumb>
							    <Breadcrumb.Section as={Link} to='/'>HOME</Breadcrumb.Section>
							    <Breadcrumb.Divider />
							    <Breadcrumb.Section>CATEGORY</Breadcrumb.Section>
							    <Breadcrumb.Divider />
							    <Breadcrumb.Section active>{data.productType.category.toUpperCase()}</Breadcrumb.Section>
							</Breadcrumb>
						</Container>
						<Header as='h2' textAlign='center'>
							<Header.Content>{data.productType.category.toUpperCase()}</Header.Content>
						</Header>
						<Container
							textAlign='center'>
								<Grid doubling columns={4} celled>
									<ItemsByCategory category={data.productType} />
								</Grid>
						</Container>
					</Fragment>
				  )
				}}
			</Query>
		</Segment>
	</Fragment>
	)
}

export default Category