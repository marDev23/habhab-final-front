import React from 'react'
import { Loader } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { IS_SIGNED } from '../../QUERIES/ALL_QUERIES'

const LayoutRoutePrivate = ({ component: Component, layout: Layout, ...rest }) => (
	<Query query={IS_SIGNED}>
			{({ loading, data }) => {
				if (loading) return <Loader active inline='centered' size='large' />
					console.log(data)
				if (data.isSignIn === false) return <Redirect to={{ pathname: "/log_in", state: { from: rest.location } }} />
				return <Route {...rest} render={props => ( <Layout> <Component {...props} /> </Layout> )} />
			}}
	</Query>
)

export default LayoutRoutePrivate
