import React, { Component ,Fragment } from 'react'
import { Accordion, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class OrderTitleContent extends Component {

	state = { activeIndex: 0 }

	handleClick = (e, titleProps) => {
	const { index } = titleProps
	const { activeIndex } = this.state
	const newIndex = activeIndex === index ? -1 : index
	this.setState({ activeIndex: newIndex })
	}

	render() {
		const { messageData, match } = this.props
		const { activeIndex } = this.state
		return (
		<Fragment>
		<Accordion.Title active={activeIndex === messageData.id} index={messageData.id} onClick={this.handleClick}>
		  <Icon name='dropdown' />
		  {
		  	messageData.isOpened
		  	? ''
		  	:
		  	<Label horizontal color='green'>new!</Label>
		  }
		  &nbsp;&nbsp;{messageData.title}
		</Accordion.Title>
		<Accordion.Content active={activeIndex === messageData.id}>
			<Label color='blue' as={Link} to={match.url + '/' + messageData.id} horizontal>View&nbsp;&nbsp;</Label>
		</Accordion.Content>
		</Fragment>
		)
	}
}

export default OrderTitleContent