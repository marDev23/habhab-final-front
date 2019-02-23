import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { IS_SIGNED } from '../../QUERIES/ALL_QUERIES'

const LayoutSinglePrivate = ({ component: Component, ...rest }) => (
	<Query query={IS_SIGNED}>
		{({ loading, data }) => {
			if (loading) return <Loader active inline='centered' size='large' />
			if (data.isSignIn === false) return <Redirect to={{ pathname: "/log_in", state: { from: rest.location } }} />
			return <Route {...rest} render={props => ( <Component {...props} /> )} />
		}}
	</Query>
)

export default LayoutSinglePrivate