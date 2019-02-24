import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { 
	MainLayout, 
	LayoutById, 
	LayoutRoute, 
	LayoutSingle, 
	LayoutRoutePrivate, 
	LayoutSinglePrivate,
	LayoutRouteSearch,
} from './Components/Layout'
import {
	Main, 
	LogIn, 
	SignUp, 
	Category, 
	SingleProduct, 
	MainTray, 
	Checkout, 
	ThankYou,
	OrdersFromAccount,
	MessageFromAccount,
	ProfileFromAccount,
	OrdersPageSingle,
	MessagePageSingle,
	SearchPage,
} from './Pages'

// const Hey = ({match}) => (
// 	console.log(match)
// )

class App extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path='/log_in' component={LogIn} />
					<Route exact path='/sign_up' component={SignUp} />
					<Route exact path='/thank_you' component={ThankYou} />
					<Route exact path='/home_redirect' render={(props) => (
			        	<Redirect props={props} to='/' />
			        )} />
			        <LayoutRoute exact path='/' layout={MainLayout} component={Main} />
			        <LayoutRouteSearch exact path='/search' layout={MainLayout} component={SearchPage} />
			        <LayoutRoutePrivate exact path='/tray' layout={MainLayout} component={MainTray} />
			        <LayoutRoutePrivate exact path='/orders' layout={MainLayout} component={OrdersFromAccount} />
			        <LayoutRoutePrivate exact path='/messages' layout={MainLayout} component={MessageFromAccount} />
			        <LayoutRoutePrivate exact path='/profile' layout={MainLayout} component={ProfileFromAccount} />
			        <LayoutSinglePrivate exact path='/checkout' component={Checkout} />
			        <LayoutSingle exact path='/:id' layout={MainLayout} component={SingleProduct} />
			        <LayoutById path='/orders/:id' layout={MainLayout} component={OrdersPageSingle} />
			        <LayoutById path='/messages/:id' layout={MainLayout} component={MessagePageSingle} />
			        
			        <LayoutById path='/categories/:id' layout={MainLayout} component={Category} />
			    </Switch>
		    </Fragment>
		)
	}
}
export default App
