import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { Segment, Grid, Header, Container, Loader } from 'semantic-ui-react'
import { Item } from '../Components/Item'
import { ALL_PRODUCTS_FEATURED } from '../QUERIES/ALL_QUERIES'


class SearchPage extends Component {
	render() {
		const { history } = this.props
		const keyword = history.location.search.slice(1).toLowerCase()
		return (
			<Segment style={{ padding: '3em 0em' }} vertical>
				<Header as='h2' textAlign='center'>
					<Header.Content>Search For: "{keyword}"</Header.Content>
				</Header>
				<Container
				textAlign='center'>
					<Grid doubling columns={4} celled>
						<Query query={ALL_PRODUCTS_FEATURED}>
							{({ data, loading, error }) => {
								if (loading) return <Loader active inline='centered' size='large' />
								const keywordSearch = data.products.filter(el => el.name.indexOf(keyword.toLowerCase()) > -1)
								if (keywordSearch.length === 0) {
									return (
							            	<Header as='h3' textAlign='center'>
							              		<Header.Content>The keyword you use to search has no match.</Header.Content>
							            	</Header>
									)
								}
								// if (keywordSearch)
								return (
									<Fragment>
									{keywordSearch.map(el => (
									    <Item item={el} key={el.id}> </Item>
									))}
									</Fragment>
							    )
							}}
					    </Query>
					</Grid>
			    </Container>
			</Segment>
		)
	}
}

export default SearchPage