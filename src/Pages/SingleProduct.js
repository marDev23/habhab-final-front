import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Container, Breadcrumb, Segment, Grid, Image, Header, Label, Input, Loader, Menu } from 'semantic-ui-react'
import { AddToButton } from '../Components/Item'
import { SINGLE_PRODUCT } from '../QUERIES/ALL_QUERIES'
import ProductLogo from '../product.png'

class SingleProduct extends Component {

	state={
		inputQuantity: 1 
	}

	changeQuantity = ({ target: { value }, ...otherEvent }) => {
		const quantityEvent = otherEvent.nativeEvent.inputType
		// const changeEvent = otherEvent.change
		if (quantityEvent === 'insertText') {
			if (value >= 99 ) {
				this.setState({ inputQuantity: 99 })
			} else {
			this.setState({ inputQuantity: value })
			}
		}
		if (quantityEvent === 'deleteContentBackward') {
			this.setState({ inputQuantity: null })
		}
	}

	minusQuantity = () => {
		if (this.state.inputQuantity <= 1 ) {
			this.setState({ inputQuantity: 1 })
		} else {
		this.setState({ inputQuantity: parseInt(this.state.inputQuantity) - 1 })
		}
	}

	plusQuantity = () => {
		if (this.state.inputQuantity >= 99 ){
			this.setState({ inputQuantity: 99 })
		} else {
			this.setState({ inputQuantity: parseInt(this.state.inputQuantity) + 1 })
		}
	}

	render() {
		const { ...props } = this.props
		const { inputQuantity } = this.state
		const isQuantityEmpty = inputQuantity === null || inputQuantity === '' || inputQuantity === 0
		// console.log(inputQuantity)
		 return (
			<Fragment>
			<Segment style={{ padding: '2em 0em' }} vertical>
				<Query
					query={SINGLE_PRODUCT}
					variables={{ name: props.match.params.id }}
				>
				{({ loading, data, error }) => {
					if (loading) return <Loader active inline='centered' size='large' />
					console.log(data)
					return (
					<Fragment>
						<Container>
							<Breadcrumb>
							    <Breadcrumb.Section as={Link} to='/'>HOME</Breadcrumb.Section>
							    <Breadcrumb.Divider />
							    <Breadcrumb.Section as={Link} to={'categories/'+data.product.category.category}>{data.product.category.category.toUpperCase()}</Breadcrumb.Section>
							    <Breadcrumb.Divider />
							    <Breadcrumb.Section active>{data.product.name.toUpperCase()}</Breadcrumb.Section>
							</Breadcrumb>
						</Container>
						<Header as='h2' textAlign='center'>
						</Header>
						<Grid container stackable centered columns={2}>
							<Grid.Row>
						    <Grid.Column width={8}>
						      <Segment>
						        <Image centered size='medium' src={ProductLogo} />
						      </Segment>
						    </Grid.Column>
						    <Grid.Column width={6}>
						      <Menu vertical fluid>
						        <Menu.Item>
						          <Header size='medium' textAlign='center'>{data.product.name.toUpperCase()}</Header>
						          <Menu.Menu>
						            <Menu.Item>
						            <Header size='small'color='orange'>P {data.product.price}</Header>
						            </Menu.Item>
						            <Menu.Item>
						            	Category: 
						            	<Header
						            		as={Link} 
						            		to={'categories/' + data.product.category.category}
						            		size='tiny'
						            		color='orange'>
						            	{' ' + data.product.category.category.toUpperCase()}
						            	</Header>
						            </Menu.Item>
						          </Menu.Menu>
						        </Menu.Item>
						        <Menu.Item>
						        	<Menu.Menu>
						        		<Menu.Item>
						        		Quantity: {''}
						        			<Input
								            	labelPosition='right'
								            	style={{ width: '5em',  marginRight: '5em', marginLeft: '0em' }}
								            	value={inputQuantity}
								            	onChange={this.changeQuantity}
								            	type='text'>
						                      <Label
						                      	as='a'
						                      	onClick={this.minusQuantity}
						                       >-</Label>
						                      <input />
						                      <Label 
						                      	as='a'
						                      	onClick={this.plusQuantity}
						                      	>+</Label>
							                </Input>
						        		</Menu.Item>
						        		<Menu.Item>
						        			<AddToButton isQuantityEmpty={isQuantityEmpty} inputQuantity={inputQuantity} id={data.product.id} />
						        		</Menu.Item>
						        	</Menu.Menu>
						        </Menu.Item>
						        <Menu.Item>
						        	Description:
						        	<p>{data.product.description}</p>
						        </Menu.Item>
						       </Menu> 
						    </Grid.Column>
						    </Grid.Row>
						  </Grid>
					</Fragment>
					)
				}}
				</Query>
			</Segment>
			</Fragment>
		)
	}
}

export default SingleProduct

// <Segment>
// 						        <Item>
// 						        <Item.Content>
// 							        <Item.Header><Header size='large' textAlign='center'>{data.product.name.toUpperCase()}</Header></Item.Header>
// 							        <Item.Meta>
// 							          <Header size='huge'color='orange'>P {data.product.price}</Header>
// 							        </Item.Meta>
// 							        <Item.Description>{data.product.description}</Item.Description>
// 							      </Item.Content>
// 							      <Divider hidden/>
// 							      <Item.Extra>
// 							          <Label>CETEGORY:</Label>
// 							          <Label as={Link} to={'categories/' + data.product.category.category} >
// 							          	<Header size='small' color='orange'>{data.product.category.category.toUpperCase()} </Header>
// 							          </Label>
// 							       </Item.Extra>
// 							    </Item>
// 							    <Divider hidden/>
// 					            <Input
// 					            	labelPosition='right'
// 					            	style={{ width: '4em',  marginRight: '5em', marginLeft: '0em' }}
// 					            	value={inputQuantity}
// 					            	onChange={this.changeQuantity}
// 					            	type='text'>
// 				                      <Label
// 				                      	as='a'
// 				                      	onClick={this.minusQuantity}
// 				                       >-</Label>
// 				                      <input />
// 				                      <Label 
// 				                      	as='a'
// 				                      	onClick={this.plusQuantity}
// 				                      	>+</Label>
// 				                </Input>
// 				                <AddToButton isQuantityEmpty={isQuantityEmpty} inputQuantity={inputQuantity} id={data.product.id} />
// 						      </Segment>