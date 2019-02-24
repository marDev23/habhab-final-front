import React, { Fragment } from 'react'
import { Menu, Label } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { SIGN_OUT } from '../../QUERIES/ALL_QUERIES'

const AccountMenu = withRouter(({ activeItem, history, match}) => {
console.log(match)
return (
	<Menu pointing color='orange' secondary vertical fluid>
		<Menu.Item
		  active={activeItem === '/profile'}
		  onClick={() => {
		  	history.push('/profile')
		  }}>
				Account
		</Menu.Item>
		<Menu.Item
		  active={activeItem === '/orders'}
		  onClick={() => {
		  	history.push('/orders')
		  }}>
		   <Label circular size='tiny' color='red' empty />
				Orders
		</Menu.Item>
		<Menu.Item
		  active={activeItem === '/messages'}
		  onClick={() => {
		  	history.push('/messages')
		  }}>
		  <Label circular size='tiny' color='red' empty />
				Messages
		</Menu.Item>
		 
		<Mutation 
			mutation={SIGN_OUT}
		>
		{( signOut, { loading, data, error }) => (
			<Fragment>
			{ loading &&  '' }
			{ data && history.go(0) }
				<Menu.Item
				  as='a'
				  onClick={evt => {
				  	evt.preventDefault();
				  	signOut()
				  }}>
						Log Out
				</Menu.Item>
			</Fragment>
		)}
		</Mutation>
	</Menu>
)

})

export default AccountMenu