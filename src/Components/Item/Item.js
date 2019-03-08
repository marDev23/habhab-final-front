import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Label, Divider } from 'semantic-ui-react'

const Item = ({...props}) =>{ 
console.log(props)
return (
	<Grid.Column>
	      <div>
		      <Image as={Link} to={'/'+props.item.name} src={props.item.img} />
		      <Label as={Link} to={'/'+props.item.name} size='large'>{props.item.name}</Label>
		      <Label as={Link} to={'/'+props.item.name} color='orange' pointing size='large'>P {props.item.price}</Label>
	      </div>
	    <Divider />
	</Grid.Column>
)
}

export default Item
