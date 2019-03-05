import React from 'react'
import { Route } from 'react-router-dom'

const LayoutRouteReset = ({ component: Component, layout: Layout, ...rest }) => (
	<Route {...rest} render={props => (
	    <Component {...props} />
    )} />
)

export default LayoutRouteReset