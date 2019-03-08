import React, { Component, Fragment } from 'react'
import { Button, Container, Divider, Message  } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { ALL_CART } from '../../QUERIES/ALL_QUERIES'
import { ProductReviewView } from './'


class Review extends Component{

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep()
    }

    subTotal = (arr) => {
        console.log(arr)
      return arr.reduce((sum, i) => {
        let n = sum + (i.product.price * i.quantity)
        return n
      }, 0)
    }


    render() {
        return(
            <Query query={ALL_CART}>
                {({ loading, data, error }) => {
                    if (loading) return <p>Loading...</p>
                    const { cart } = data
                    return (
                        <Fragment>
                        {
                            this.subTotal(data.cart) <= 99
                            ? 
                            <Message negative>
                                <p>Your overall total of your order did not met the minimum amount.</p>
                            </Message>
                            :
                            ''
                        }
                        {data.cart.map(x => (
                            <ProductReviewView tray={x} key={x.id} />
                        ))}
                         <Divider hidden />
                          <Container>
                            <Button fluid color='orange' onClick={this.saveAndContinue} disabled={this.subTotal(cart) <= 99 ? true : false }>Proceed</Button>
                            <Button fluid as={Link} to='/tray' style={{ marginTop: '0.5em' }}>Back</Button>
                            </Container>
                        </Fragment>
                    )
                }}                
            </Query>
        )
    }
}

export default Review