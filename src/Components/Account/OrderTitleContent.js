import React, { Component ,Fragment } from 'react'
import { Accordion, List, Icon, Label } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CANCEL_ORDER } from '../../QUERIES/ALL_QUERIES'

class OrderTitleContent extends Component {

	state = { activeIndex: 0 }

	handleClick = (e, titleProps) => {
	const { index } = titleProps
	const { activeIndex } = this.state
	const newIndex = activeIndex === index ? -1 : index
	this.setState({ activeIndex: newIndex })
	}

	render() {
		const { orderTypeObj, match } = this.props
		const { activeIndex } = this.state
		console.log(orderTypeObj.id)
		return (
		<Fragment>
		<Accordion.Title active={activeIndex === orderTypeObj.id} index={orderTypeObj.id} onClick={this.handleClick}>
		  <Icon name='dropdown' />
		  {
		  	orderTypeObj.isOpened
		  	? ''
		  	:
		  	<Label horizontal color='green'>new!</Label>
		  }
		  &nbsp;&nbsp;ORDER # {orderTypeObj.id}
		</Accordion.Title>
		<Accordion.Content active={activeIndex === orderTypeObj.id}>
		    <List.Item>
		      ORDER TYPE: &nbsp;&nbsp;
		      <Label horizontal>{orderTypeObj.orderType.type.toUpperCase()}</Label>
		    </List.Item><br />
			<Label color='blue' as={Link} to={match.url + '/' + orderTypeObj.id} horizontal>View&nbsp;&nbsp;</Label>
			<Mutation mutation={CANCEL_ORDER}>
			{(cancelOrder, { loading, data, error }) => (
			<Label 
				as='a'
				color='red'
				horizontal
				onClick={evt => {
					evt.preventDefault();
					console.log(orderTypeObj.id)
					cancelOrder({
						variables: {
							order: orderTypeObj.id
						}
					})
				}}
			>Cancel&nbsp;&nbsp;
			</Label>
			)}
			</Mutation>
		</Accordion.Content>
		</Fragment>
		)
	}
}

export default OrderTitleContent