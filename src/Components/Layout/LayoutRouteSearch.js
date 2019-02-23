import React from 'react'
import { Route } from 'react-router-dom'

const LayoutRouteSearch = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
		<Layout>
	    	<Component {...props} />
	    </Layout>
    )} />
)

export default LayoutRouteSearch