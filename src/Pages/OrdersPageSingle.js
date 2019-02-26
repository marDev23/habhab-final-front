import React from 'react'
import { Segment, Grid, Menu, Header } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { MY_ORDER } from '../QUERIES/ALL_QUERIES'
import { AccountMenu, ItemsEveryAccount } from '../Components/Account'

const subTotal = (arr) => {
  return arr.reduce((sum, i) => {
    let n = sum + (i.price * i.quantity)
    return n
  }, 0)
}

const grandTotal = (arr, fee) => {
  return arr.reduce((sum, i) => {
    console.log(sum)
    let n = sum + (i.price * i.quantity)
    return n
  }, 0) + parseInt(fee)
}

const OrdersPageSingle = ({match: { params: { id } }}) => { 
	console.log(id)
	const urlMatch = '/orders'
	return (
	<Segment style={{ padding: '3em 0em', minHeight: '100%' }} vertical>
		<Grid container stackable centered columns={2}>
		<Grid.Row>
		    <Grid.Column width={4}>
				<AccountMenu activeItem={urlMatch} />
			</Grid.Column>
			<Grid.Column width={8}>
			<Query
				query={MY_ORDER}
				variables={{ id: id }}
			>
			{({ loading, data: { order } }) => {
				if (loading) return <p>'Loading..'</p>
				// console.log(order)
				return (
				<Menu vertical fluid>
			        <Menu.Item>
			          <Header as='h4'>Items Details</Header>
			          {order.orderItems.map(x => (
			          	<ItemsEveryAccount key={x.id} orderItem={x} />
			          ))}
			        </Menu.Item>

			        <Menu.Item>
			          <Header as='h4'>Order Details</Header>
			          <Menu.Menu>
			          	<Menu.Item>DATE PLACED:&nbsp;&nbsp;{order.datePlaced}</Menu.Item>
			          	{
			          		order.orderType.type === 'pick-up'
			          		?
			          		 <Menu.Item>PICK-UP DATE: &nbsp;&nbsp;{order.datePickUp}</Menu.Item>
			          		:
			          		''
			          	}
			          	<Menu.Item>ORDER TYPE: &nbsp;&nbsp;{order.orderType.type.toUpperCase()}</Menu.Item>

			          </Menu.Menu>
			        </Menu.Item>

			        <Menu.Item>
			          <Header as='h4'>Delivery Details</Header>
			          <Menu.Menu>
			          	{
			          		order.orderType.type === 'pick-up'
			          		? ''
			          		:
			          			<Menu.Item>
			          			DELIVERY ADDRESS: &nbsp;&nbsp;
			          			{order.orderShipment.shipmentAddress.province.toUpperCase()},&nbsp;&nbsp;
			          			{order.orderShipment.shipmentAddress.municipal.toUpperCase()},&nbsp;&nbsp;
			          			{order.orderShipment.shipmentAddress.baranggay.toUpperCase()}&nbsp;&nbsp;
			          			Philippines&nbsp;&nbsp;{order.orderShipment.shipmentAddress.zip}
			          			</Menu.Item>
			          	}
			          </Menu.Menu>
			        </Menu.Item>
			        <Menu.Item>
			        	<Header as='h4'>Total</Header>
			        	<Menu.Menu>
			        	<Menu.Item>TOTAL: P {subTotal(order.orderItems).toLocaleString()}</Menu.Item>
			        	<Menu.Item>DELIVERY FEE: {order.orderType.type === 'pick-up' ? 0 : order.orderShipment.shipmentAddress.fee}</Menu.Item>
			        	<Menu.Item>GRAND TOTAL: P
			        	{
			        		order.orderType.type === 'pick-up'
			        		? subTotal(order.orderItems).toLocaleString()
			        		: grandTotal(order.orderItems, order.orderShipment.shipmentAddress.fee).toLocaleString()
			        	}
			        	</Menu.Item>
			        	</Menu.Menu>
			        </Menu.Item>
			      </Menu>
			    )
			}}
			</Query>
		    </Grid.Column>
		</Grid.Row>
		</Grid>
	</Segment>
)
}

export default OrdersPageSingle
