import React, { Component, Fragment } from 'react'
import { Grid, Loader, Header, Menu, Accordion, Icon, Form, Dropdown, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { MY_CART, ALL_ADDRESS } from '../../QUERIES/ALL_QUERIES'
import HeaderTrayItem from './HeaderTrayItem'

const subTotal = (arr) => {
  return arr.reduce((sum, i) => {
    return sum + (i.product.price * i.quantity)
  }, 0)
}

const grandTotal = (arr, hit) => {
  return arr.reduce((sum, i) => {
    return sum + (i.product.price * i.quantity)
  }, 0) + parseInt(hit)
}


class TrayGrid extends Component {
	state= {
		isOpenAccDel: false,
		baranggay: '',
		municipal: '',
		deliveryFee: 0
	}

	handleClickAccDel = () => {
		this.setState({ isOpenAccDel: !this.state.isOpenAccDel })
	}
	handleChangeMunicipal = (e, {value, options }) => {
		this.setState({ municipal: value })
	}
	handleChangeBaranggay = (e, { value, options }) => {
		console.log(options)
		const filterFee = options.find(x => x.value === value)
		this.setState({ baranggay: value, deliveryFee: filterFee.fee  })
	}

	render() {
		const { isOpenAccDel, municipal, deliveryFee } = this.state
		const isNotSet = deliveryFee === 0
		return (
			<Query query={MY_CART}>
			{({ loading, data, error }) => {
				if (loading) return <Loader active inline='centered' size='large' />
				const isEmpty = data.cart.length === 0
				console.log(data.cart)
				if (isEmpty) return (
					<Grid.Row>
					<Grid.Column>
						<Header as='h4' textAlign='center'>
			              <Header.Content>The tray is empty. Please add your product.</Header.Content>
			            </Header>
			        </Grid.Column>
		            </Grid.Row>
				)
				return (
					<Fragment>		    
					<Grid.Row>
						<Grid.Column width={12}>
							<Form>
							<Menu borderless widths={5}>
							<Menu.Item>
					        </Menu.Item>
					        <Menu.Item>
					          Name
					        </Menu.Item>
					        <Menu.Item>
					          Quantity
					        </Menu.Item>
					        <Menu.Item>
					          Price
					        </Menu.Item>
					        <Menu.Item>
					          Action
					        </Menu.Item>
				      	</Menu>
				      	</Form>
							{data.cart.map(x =>
					      	 <HeaderTrayItem key={x.id} cart={x} />
					      	)}
					    </Grid.Column>
					    {
					    	!isEmpty 
					    	?
						    <Grid.Column width={4}>
						     <Form>
						     <Query query={ALL_ADDRESS}>
						     {({ loading, data, error }) => {
						     	if (loading) return ''
						     	const addressMunicipal = data.addresses.map(x=> ({
						     			key: x.id,
						     			value: x.municipal,
						     			text: x.municipal.toUpperCase() }))
						     	const addressBaranggay = data.addresses
						     		.filter(x => x.municipal === municipal)
						     		.map(y => ({
						     			key: y.id,
						     			value: y.baranggay,
						     			text: y.baranggay.toUpperCase(),
						     			fee: y.fee }))
						     	return (
						    	<Menu vertical fluid>
				    				<Accordion>
				    					<Accordion.Title active={isOpenAccDel} onClick={this.handleClickAccDel}>
				    					<Icon name='dropdown' />
				    						CALCULATE DELIVERY
				    					</Accordion.Title>
				    					<Accordion.Content active={isOpenAccDel}>
				    						<Menu.Menu>
				    							<Header size='small' textAlign='center'>Address</Header>
				    							<Menu.Item>
					    						 <Dropdown placeholder='Municipal' 
					    						 	fluid search selection
					    						 	options={addressMunicipal}
					    						 	onChange={this.handleChangeMunicipal}/>
					    						</Menu.Item>
					    						<Menu.Item>
					    						 <Dropdown placeholder='Baranggay' 
					    						 	fluid search selection
					    						 	options={addressBaranggay}
					    						 	onChange={this.handleChangeBaranggay}/>
					    						</Menu.Item>
				    						</Menu.Menu>
				    					</Accordion.Content>
				    				</Accordion>
						    	</Menu>
						    	)
						    }}
						    </Query>
						    </Form>
						    <Form>
						    <Menu vertical fluid>
						        <Menu.Item>
						          TOTAL
						          <Menu.Menu>
						            <Menu.Item>
						              Sub-Total: <Header color='orange' size='small'>P {subTotal(data.cart).toLocaleString()}</Header>
						            </Menu.Item>
						            <Menu.Item>
						              Delivey Fee: <Header color='orange' size='small'>
						              {
						              	isNotSet
						              	?
						              		''
						              	:
						              		'P' + deliveryFee.toLocaleString()
						              }</Header>
						            </Menu.Item>
						          </Menu.Menu>
						        </Menu.Item>
						        <Menu.Item>
						          Total: <Header color='orange' size='small'>P {grandTotal(data.cart, deliveryFee).toLocaleString()}</Header>
						        </Menu.Item>
						    </Menu>
						    </Form>
						     </Grid.Column>
						    :
						    ''
					    }
				    </Grid.Row>
				    {
				    	isEmpty
				    	? ''

				    	:
						<Grid.Row>
		                    <Grid.Column width={12}>
		                      <Menu fluid vertical borderless compact>
                        <Menu.Item>
                          <Button fluid as={Link}  to='/'>
                           Back
                          </Button>
                          <Button fluid as={Link} to='/checkout' color='orange' style={{ marginTop: '0.5em' }}>
                            Checkout
                          </Button>
                        </Menu.Item>
                      </Menu>
		                    </Grid.Column>
		                </Grid.Row>
	                }
				    </Fragment>
		      	)
			}}
			</Query>
		)
	}
}

export default TrayGrid
