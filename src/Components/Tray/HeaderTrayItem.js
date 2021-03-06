import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { Menu, Image, Input, Button, Label, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { UPDATE_QUANTITY, DELETE_CART_ITEM, USER_DATA, IS_SIGNED, MY_CART } from '../../QUERIES/ALL_QUERIES'
import { CACHE_CART_DATA_PLUS, CACHE_CART_DATA_MINUS, CACHE_CART_DATA_REMOVE } from '../../MUTATIONS/CACHE_CART_DATA'

class HeaderTrayItem extends Component {
  state = {
    inputQuantity: ''
  }

  render() {
    const { cart } = this.props
    return (
        <Form>
          <Menu fluid widths={5} borderless compact>
            <Menu.Item as={Link} to={'/' + cart.product.name}>
            <Image
              src='https://react.semantic-ui.com/images/wireframe/square-image.png'
              size='mini'
              avatar />
            </Menu.Item>
            <Menu.Item as={Link} to={'/' + cart.product.name}>{cart.product.name.toUpperCase()}</Menu.Item>
            <Menu.Item>
              <Input
                labelPosition='right'
                size='mini'
                style={{ width: '13em',  marginRight: '8em', marginLeft: '4em', paddingLeft: '4em', paddingRight: '5em' }}
                placeholder={cart.quantity}
                type='text'>
                <Mutation
                    mutation={UPDATE_QUANTITY}
                    update={CACHE_CART_DATA_MINUS}
                    refetchQueries={[
                        {
                            query: USER_DATA
                        },
                        {
                            query: MY_CART
                        },
                        {
                            query: IS_SIGNED
                        }
                    ]}
                    awaitRefetchQueries={true}
                  >
                    {(UPDATE_QUANTITY, { loading, error }) => (
                    <Fragment>
                    { loading && '' }
                      <Label
                        as='a'
                        color='orange'
                        onClick={evt => {
                          evt.preventDefault();
                          UPDATE_QUANTITY({
                            variables: {
                              quantity: cart.quantity - 1,
                              id: cart.id
                            } 
                          })
                        }}

                      >
                        -
                      </Label>
                    </Fragment>
                    )}
                  </Mutation>
                <input />
                <Mutation
                    mutation={UPDATE_QUANTITY}
                    update={CACHE_CART_DATA_PLUS}
                    refetchQueries={[
                        {
                            query: USER_DATA
                        },
                        {
                            query: MY_CART
                        },
                        {
                            query: IS_SIGNED
                        }
                    ]}
                    awaitRefetchQueries={true}
                  >
                    {(UPDATE_QUANTITY, { loading, error }) => (
                      <Fragment>
                      { loading && '' }
                        <Label
                          as='a'
                          color='orange'
                          onClick={evt => {
                            evt.preventDefault();
                            UPDATE_QUANTITY({
                              variables: {
                                quantity: cart.quantity + 1,
                                id: cart.id
                              } 
                            })
                          }}

                        >
                          +
                        </Label>
                      </Fragment>
                    )}
                  </Mutation>
              </Input>
            </Menu.Item>
            <Menu.Item>P {cart.product.price}</Menu.Item>
            <Menu.Item>
              <Mutation
                mutation={DELETE_CART_ITEM}
                update={CACHE_CART_DATA_REMOVE}
                refetchQueries={[
                    {
                        query: USER_DATA
                    },
                    {
                        query: MY_CART
                    },
                    {
                        query: IS_SIGNED
                    }
                ]}
                awaitRefetchQueries={true}
              >
                {(DELETE_CART_ITEM, { data, loading, error }) => (
                  <Fragment>
                  { loading && '' }
                  <Button
                    circular
                    icon='times'
                    color='orange'
                    inverted
                    onClick={evt => {
                      evt.preventDefault();
                      DELETE_CART_ITEM({
                        variables: {
                          id: cart.id
                        }
                      })
                    }}
                  />
                  </Fragment>
                )}
                </Mutation>
            </Menu.Item>
          </Menu>
        </Form>
    )
  }
}

export default HeaderTrayItem