import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

const LayoutById = ({ component: Component, layout: Layout, ...rest }) => (
	<Fragment>
		<Route {...rest} render={props => ( <Layout><Component {...props}/></Layout>)} />
	</Fragment>
)

export default LayoutById
