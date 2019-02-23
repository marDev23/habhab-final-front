import React from 'react'
import { Route } from 'react-router-dom'

const LayoutSingle = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
			<Component {...props} />
		</Layout>
	)} />
)

export default LayoutSingle