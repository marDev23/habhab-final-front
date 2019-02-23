import React from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const SingleNav = withRouter(({ navCategory, match, location, history }) => (
<Menu.Item
	onClick={() => {
		history.push('/categories/'+ navCategory.category)
	}}
>
	{navCategory.category.toUpperCase()}
</Menu.Item>
))

export default SingleNav