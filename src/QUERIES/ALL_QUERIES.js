import gql from 'graphql-tag'

export const IS_SIGNED = gql `
{
  isSignIn
}
`

export const USER_DATA = gql `
{
  me {
    id
    name
    mobile
    email
    cart {
      id
      quantity
      product {
      	id
        description
        name
        price
      }
    } 
  }
}
`
export const UPDATE_QUANTITY = gql `
  mutation updateQuantity($id: ID!, $quantity: Float!) {
    updateQuantity (id: $id, quantity: $quantity) {
    	id
    	quantity
    	product {
    		id
    		name
    		description
    		price
    	}
    }
  }
`
export const DELETE_CART_ITEM = gql `
  mutation deleteToCart($id: ID) {
  deleteToCart(id: $id){
    id
    product {
      id
      name
      description
      price
    }
    quantity
  }
}
`
export const ALL_CATEGORIES = gql `
query Category($category: String!){
  productType(category: $category) {
    id
    category
  }
}
`

export const ALL_ITEMS_BY_CATEGORY = gql `
query ProductByCategory($categoryId: ID!){
  productByCategory(categoryId: $categoryId) {
    id
    name
    price
    img
    category{
      id
      category
    }
  }
}
`
export const PRODUCT_CATEGORIES = gql `
{
  productTypes {
    id
    category
  }
}
`
export const ALL_PRODUCTS_FEATURED = gql `
{
  products{ 
    id
    img
    category{
      id
      category
    }
    description
    name
    price
  }
}
`
export const SINGLE_PRODUCT = gql `
query Product($name: String!){
  product(name: $name) {
    id
    name
    img
    description
    price
    category {
      id
      category
    }
  }
}
`
export const ADD_TO_CART = gql `
mutation addToCart($productId: ID, $quantity: Float) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
    quantity
    product {
      id
      price
      description
    }
  }
}
`
export const MY_CART = gql `
{
  cart {
    id
    quantity
    product {
      id
      price
      name
      description
    }
  }
}
`
export const ALL_ADDRESS = gql `
{
  addresses {
    id
    zip
    province
    municipal
    baranggay
    fee
    isPickUpAvailable
  }
}
`
export const ALL_CART = gql `
{
  cart {
    id
    product {
      id
      name
      price
      description
    }
    quantity
  }
}
`
export const MY_ADDRESS = gql `
{
  me {
    id
    address {
      id
      province
      municipal
      baranggay
      zip
      fee
      isPickUpAvailable
    }
  }
}
`

export const ADDRESS = gql `
query Address($id: ID!){
  address(id: $id){
    id
    isPickUpAvailable
    baranggay
    municipal
    province
    zip
    fee
  }
}
`
export const ORDER_TYPE = gql `
query OrderType($id: ID!){
  orderType(id: $id) {
    id
    type
  }
}
`
export const PLACE_ORDER = gql `
mutation placeOrder($orderTypeId: ID!, $datePlaced: Date, $datePickUp: Date, $addressId: ID!, $input: [OrderItemInput]) {
  placeOrder(
    orderTypeId: $orderTypeId,
    datePlaced: $datePlaced,
    datePickUp: $datePickUp
    addressId: $addressId,
    input: $input) {
    number
  }
}
`
export const MY_ORDERS = gql `
{
  me {
    id
    orders {
      id
      isOpened
      orderType {
        type
      }
    }
  }
}
`
export const MY_ORDER = gql `
query order($id: ID){
  order(id: $id) {
    id
    orderStatus {
      status
    }
    orderType {
      type
    }
    datePlaced
    datePickUp
    isOpened
    orderInvoice {
      invoiceNumber
    }
    orderShipment {
      shipmentAddress {
        province
        municipal
        baranggay
        isPickUpAvailable
        fee
        zip
      }
    }
    orderItems {
      id
      itemStatus {
        status
      }
      product {
        name
        description
      }
      quantity
      price
    }  
  }
}
`

export const MY_MESSAGES = gql `
{
  me {
    id
    messages {
      id
      isOpened
      title
      body
    }
  }
}
`
export const SINGLE_MESSAGE = gql `
query message($id: ID!){
  message(id: $id) {
    id
    isOpened
    title
    body
    userId
  }
}
`

export const ME_PRIMARY = gql `
{
  me {
    id
    email
    mobile
    name
  }
}
`
export const ME_MORE = gql `
{
  meMore {
    id
    address {
      id
      province
      municipal
      baranggay
      zip
    }
    gender
    birthday
  }
}
`
export const UPDATE_BASICINFO = gql `
mutation updateBasicInfo($name: String!, $email: String!, $mobile: String!){
  updateBasicInfo(name: $name , email: $email, mobile: $mobile) {
    id
    name
    email
  }
}
`
export const UPDATE_MOREINFO = gql `
mutation addMoreInfo($address: ID!, $gender: String!, $birthday: Date!) {
  addMoreInfo(address: $address, gender: $gender, birthday: $birthday) {
    id
    gender
    address {
      id
      province
      municipal
      baranggay
      zip
    }
    birthday
  }
}
`
export const SIGN_UP = gql `
mutation signUp($email: String!, $name: String!, $mobile: String!, $password: String!) {
  signUp(email: $email, name: $name, mobile: $mobile, password: $password)
}
`
export const CHANGE_PASS = gql `
mutation changePassword($newPassword: String!, $oldPassword: String!) {
  changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
}
`
export const SIGN_OUT = gql `
mutation {
  signOut
}
`
export const FORGOT_PASSWORD = gql `
mutation changeForgotten($email: String!){
  changeForgotten(email: $email)
}
`
export const VERIFY_PASSWORD = gql `
mutation verifyForgotten($token: String!, $newPassword: String!){
  verifyForgotten(token: $token, newPassword: $newPassword)
}
`

export const CANCEL_ORDER = gql `
mutation cancelOrder($order: ID!) {
  cancelOrder(order: $order)
}
`
