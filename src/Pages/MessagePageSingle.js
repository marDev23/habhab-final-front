import React from 'react'
import { Card, Grid, Segment } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { SINGLE_MESSAGE } from '../QUERIES/ALL_QUERIES'
import { AccountMenu } from '../Components/Account'


const MessagePageSingle = ({match: { params: { id } }}) => {
	console.log(id)
	const urlMatch = '/messages'
	return (
		<Segment style={{ padding: '3em 0em', minHeight: '100%' }} vertical>
			<Grid container stackable centered columns={2}>
				<Grid.Row>
				    <Grid.Column width={4}>
						<AccountMenu activeItem={urlMatch} />
					</Grid.Column>
					<Grid.Column width={8}>
						<Query query={SINGLE_MESSAGE} variables={{ id }}>
						{({ loading, data }) => {
						if (loading) return ''
							console.log(data)
						return (
						<Card fluid>
						    <Card.Content header={data.message.title.toUpperCase()} />
						    <Card.Content description={data.message.body} />
						</Card>
						)}}
						</Query>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
	)
}

export default MessagePageSingle