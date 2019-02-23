import React, { Fragment } from 'react'
import { Sidebar, Menu, Loader } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import { PRODUCT_CATEGORIES } from '../../QUERIES/ALL_QUERIES'

const CategoryItem = withRouter(({navCategory, history}) => (
  <Menu.Item onClick={() => {
    history.push('/categories/' + navCategory.category)
  }}>{navCategory.category.toUpperCase()}</Menu.Item>
))


const SideBarComponent = ({...props}) => (
<Sidebar
          as={Menu}
          animation='overlay'
          onHide={props.onHide}
          vertical
          visible={props.visible}
        >
          <Menu.Item as={Link} to='/' active>
            Home
          </Menu.Item>
          <Query query={PRODUCT_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <Loader active inline='centered' size='large' />
            return (
              <Fragment>
              {data.productTypes.map(productType => (
                <CategoryItem key={productType.id} navCategory={productType} />
                ))
              }
              </Fragment>
            )
          }}
          </Query>
        </Sidebar>
)


export default SideBarComponent
