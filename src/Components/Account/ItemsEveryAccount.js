import React from 'react'
import { Menu, Label } from 'semantic-ui-react'

const ItemsEveryAccount = ({orderItem}) => {
console.log(orderItem.itemStatus)
return (
	<Menu.Menu>
		<Menu.Item>ITEM STATUS:
		    <Label horizontal color='orange'>{orderItem.itemStatus.status}</Label>
		</Menu.Item>
      	<Menu.Item>{orderItem.product.name.toUpperCase()}&nbsp;&nbsp; X &nbsp;&nbsp;{orderItem.quantity.toLocaleString()}</Menu.Item>
      	<Menu.Item>P&nbsp;&nbsp;{orderItem.price.toLocaleString()}</Menu.Item>
	</Menu.Menu>
)
}

export default ItemsEveryAccount