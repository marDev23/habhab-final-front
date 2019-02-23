import React from 'react'
import { Menu, Image, Header } from 'semantic-ui-react'

const ProductReviewView = ({tray }) => {
return (
  <Menu fluid widths={6} borderless compact>
      <Menu.Item>
          <Image
            src='https://react.semantic-ui.com/images/wireframe/square-image.png'
            size='mini'
            avatar />
      </Menu.Item>
      <Menu.Item><Header size='small' color='orange'>{tray.product.name.toUpperCase()}</Header></Menu.Item>
      <Menu.Item><Header size='small' color='orange'>X</Header></Menu.Item>
      <Menu.Item><Header size='small' color='orange'>{tray.quantity}</Header></Menu.Item>
      <Menu.Item><Header size='small' color='orange'>P{tray.product.price}</Header></Menu.Item>
  </Menu>
  )
}

export default ProductReviewView