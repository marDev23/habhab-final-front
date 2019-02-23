import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { DesktopContainer, MobileContainer } from '../Header'
import { USER_DATA } from '../../QUERIES/ALL_QUERIES'
import Footer from '../footer'
import Spinner from '../loader'

const ResponsiveContainer = ({...props}) => (
  <div>
    <DesktopContainer userData={props.userData}>{props.children}</DesktopContainer>
    <MobileContainer userData={props.userData}>{props.children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const MainLayout = (props) => (
  <Query query={USER_DATA}>
  	{({ data, loading }) => {
	  	if (loading) return <Spinner />
		return  (
			<ResponsiveContainer userData={data}>
			  {props.children}
			  <Footer />
		  	</ResponsiveContainer>
		  )
		}
	}
  </Query>
)
export default MainLayout
