import React, { Fragment } from 'react'
import { Popup, Header, Grid, Menu, Loader } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import { SingleNav } from './'
import { PRODUCT_CATEGORIES } from '../../QUERIES/ALL_QUERIES'

const NavCategory = () => (
  <Popup
    trigger={<Header size='tiny'>Categories</Header>}
    flowing
    hoverable
    position='bottom center'>
    <Grid centered>
      <Grid.Column>
        <Menu fluid vertical>
          <Query query={PRODUCT_CATEGORIES}>
          {({ data, loading, error }) => {
            if (loading) return <Loader active inline='centered' size='large' />
            return (
              <Fragment>
              {data.productTypes.map(productType => (
                <SingleNav key={productType.id} navCategory={productType} />
                ))
              }
              </Fragment>
            )
          }}
          </Query>
        </Menu>
      </Grid.Column>
    </Grid>
  </Popup>
)

export default NavCategory