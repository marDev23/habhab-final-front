import { USER_DATA } from '../QUERIES/ALL_QUERIES'

export const CACHE_CART_DATA_PLUS = (cache, { data: { updateQuantity } }) => {
  console.log(cache)
  const { id, product, quantity, ...other } = updateQuantity
  const updatedQuantityData = { id, quantity: quantity + 1, product, ...other }
  const { me } = cache.readQuery({
    query: USER_DATA
  })
  const { name, mobile, email, cart, ...rest } = me
  const pushCacheData = cart.filter(x => x.id !== updatedQuantityData.id)
  const arrayOfCache = (xCache, yCache) => {
    if (Array.isArray(xCache) === true ) {
      return [{...yCache}, ...xCache]
    }
    return [{...yCache}, {...xCache}]
  }
  cache.writeQuery({
    query: USER_DATA,
    data: {
      me: {
        name: name,
        mobile: mobile,
        email: email,
        cart: arrayOfCache(pushCacheData, updatedQuantityData),
        ...rest
      }
    }
  })
 }

 export const CACHE_CART_DATA_MINUS = (cache, { data: { updateQuantity } }) => {
  console.log(cache)
  const { id, product, quantity, ...other } = updateQuantity
  const updatedQuantityData = { id, quantity: quantity - 1, product, ...other }
  const { me } = cache.readQuery({
    query: USER_DATA
  })
  const { name, mobile, email, cart, ...rest } = me
  const pushCacheData = cart.filter(x => x.id !== updatedQuantityData.id)
  const arrayOfCache = (xCache, yCache) => {
    if (Array.isArray(xCache) === true ) {
      return [{...yCache}, ...xCache]
    }
    return [{...yCache}, {...xCache}]
  }
  cache.writeQuery({
    query: USER_DATA,
    data: {
      me: {
        name: name,
        mobile: mobile,
        email: email,
        cart: arrayOfCache(pushCacheData, updatedQuantityData),
        ...rest
      }
    }
  })
 }

export const CACHE_CART_DATA_REMOVE = (cache, { data: { deleteToCart } }) => {
  console.log(deleteToCart)
  const { me: { cart, ...otherInfo} } = cache.readQuery({
    query: USER_DATA
  })

  cache.writeQuery({
    query: USER_DATA,
    data: {
      me: {
        cart: cart.filter(x => x.id !== deleteToCart.id),
        ...otherInfo
      }
    }
  })

 }