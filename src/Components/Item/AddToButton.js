import React, { Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { Mutation, Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { ADD_TO_CART, IS_SIGNED } from '../../QUERIES/ALL_QUERIES'


const AddToButton = withRouter(({...props}) => {
    console.log(props)
    return (
    <Query query={IS_SIGNED}>
    {({ loading, data: { isSignIn }, error }) => {
        if (loading) return ''
        return (
            <Mutation mutation={ADD_TO_CART}>
            	{( addToCart, { loading, data, error }) => (
                <Fragment>
                { loading && '' }
                { data && props.history.go(0) }
                <Button
                	color='orange'
                    inverted
                    fluid
                    size='small'
                	disabled={props.isQuantityEmpty}
                	onClick={evt => {
                		evt.preventDefault();
                        if (isSignIn === false) {
                           props.history.push({
                            pathname: '/log_in',
                            state: { from: `${props.match.url}` }
                           })
                        }
                		addToCart({
                			variables: {
                				productId: props.id,
                				quantity: props.inputQuantity
                			}
                		})
                	}}
                > Add To Tray
                </Button>
                </Fragment>
            	)}
            </Mutation>
        )
    }}
    </Query>
)
})


export default AddToButton