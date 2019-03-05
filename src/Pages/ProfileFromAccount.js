import React, { Component, Fragment } from 'react'
import { Segment, Grid, Menu, Header, Button, Modal, Form, Dropdown, Loader, Message } from 'semantic-ui-react'
import { Query, Mutation } from 'react-apollo'
import dayjs from 'dayjs'
import { DateInput } from 'semantic-ui-calendar-react'
import { withRouter } from 'react-router-dom'
import { ME_PRIMARY, ME_MORE, UPDATE_BASICINFO, ALL_ADDRESS, UPDATE_MOREINFO, CHANGE_PASS } from '../QUERIES/ALL_QUERIES'
import { AccountMenu } from '../Components/Account'

const genderOptions = [ { key: 'male', value: 'male', text: 'Male' }, { key: 'female', value: 'female', text: 'Female' } ]

class ProfileFromAccount extends Component {
	state = {
		openModalBasic: false,
		openModalMore: false,
		openModalPass: false,
		name: '',
		email: '',
		mobile: '',
		birthday: '',
		gender: '',
		address: '',
		addressId: '',
		newPassword: '',
		oldPassword: ''
	}

  showBasicInfo = () => this.setState({ openModalBasic: true })
  showMoreInfo = () => this.setState({ openModalMore: true })
  showPassInfo = () => this.setState({ openModalPass: true })
  closeBasicInfo = () => this.setState({ openModalBasic: false })
  closeMoreInfo = () => this.setState({ openModalMore: false })
  closePassInfo = () => this.setState({ openModalPass: false })
  changeNameInfo = ({target: { value } }) => this.setState({ name: value })
  changeEmailInfo = ({target: { value } }) => this.setState({ email: value })
  changeMobileInfo = ({target: { value } }) => this.setState({ mobile: value })
  changeDateInfo = (e, { name, value }) => {
  	// console.log(value)
  this.setState({ birthday: value })
}
  changeGenderInfo = (e, { name, value }) => {
  	console.log(value)
   this.setState({ gender: value })
  }
   changeAddressInfo = (e, { value, options}) => {
  	const selectedAddress = options.find(x => x.key === value)
   this.setState({ address: selectedAddress.key, addressId: selectedAddress.key })
  }

  changeOldPass = ({target: { value } }) => this.setState({ oldPassword: value })
  changeNewPass = ({target: { value } }) => this.setState({ newPassword: value })

	render() {
		const { match, history } = this.props
		const { 
			openModalBasic, 
			openModalMore,
			openModalPass,
			name, 
			email, 
			mobile, 
			birthday: newBirthday, 
			gender: newGender,  
			addressId: newAddressId,
			oldPassword,
			newPassword,
		} = this.state
		console.log(newBirthday, newGender, newAddressId)
		const isNull = newBirthday === '' || newGender === '' || newAddressId === ''
		const isEmpty = newBirthday === null || newGender === null || newAddressId === null
		const isUndefined = newGender === undefined || newBirthday === undefined || newAddressId === undefined 
		return (
			<Segment style={{ padding: '3em 0em', minHeight: '100%' }} vertical>
				<Grid container stackable centered columns={2}>
				<Grid.Row>
				    <Grid.Column width={4}>
						<AccountMenu activeItem={`${match.url}`} />
					</Grid.Column>
					<Grid.Column width={8}>
						<Menu vertical fluid>
					        <Menu.Item>
					          <Header color='orange' as='h4'>Basic Info</Header>
					          <Query query={ME_PRIMARY}>
					          {({ loading, data: { me } }) => {
					          	if (loading) return <Loader active inline='centered' />
					          	console.log(me)
					          	return (
					          		<Fragment>
					          		<p>NAME:&nbsp;&nbsp;{me.name.toUpperCase()}</p>
					          		<p>MOBILE:&nbsp;&nbsp;{me.mobile}</p>
					          		<p>E-MAIL:&nbsp;&nbsp;{me.email}</p>
					          		<Button
							      	fluid
							      	size='tiny'
							      	color='orange'
							      	onClick={this.showBasicInfo}
							      >Update</Button>
							      	<Modal size='tiny' open={openModalBasic} onClose={this.closeBasicInfo} closeIcon>
							          <Modal.Header>Update Basic Info</Modal.Header>
							          <Modal.Content>
							          <Mutation mutation={UPDATE_BASICINFO}>
							          {( updateBasicInfo, { loading, error, data }) => (
							          	<Fragment>
							          	{ loading && <Loader active inline='centered' />}
							          	{error && 
							          	<Message
							          		negative
							          		size='small'
							          	>
										    <Message.Header>Error!</Message.Header>
										    <p>Error Updating Basic Info</p>
										</Message>}
							          	{ data && history.go(0) }
							            <Form onSubmit={evt => {
							            	const { target } = evt
							            	evt.preventDefault();
							            	const nameForm = target[0].value
							            	const emailForm = target[1].value
							            	const mobileForm = target[2].value
							            	updateBasicInfo({
							            		variables: {
							            			name: nameForm,
							            			email: emailForm,
							            			mobile: mobileForm
							            		}
							            	})
							            }}
							            >
										    <Form.Field>
										      <label>Name</label>
										      <input
										      	placeholder='Full Name'
										      	name='name'
										      	value={name === null || name === '' ? me.name : name}
										      	onChange={this.changeNameInfo} />
										    </Form.Field>
										    <Form.Field>
										      <label>Mobile</label>
										      <input 
										      	placeholder='Mobile'
										      	name='mobile'
										      	value={mobile === null || mobile === '' ? me.mobile : mobile} 
										      	onChange={this.changeMobileInfo}/>
										    </Form.Field>
										    <Form.Field>
										      <label>E-MAIL</label>
										      <input 
										      	placeholder='E-mail' 
										      	name='email'
										      	value={email === null || email === '' ? me.email : email}
										      	onChange={this.changeEmailInfo}/>
										    </Form.Field>
										    <Button color='orange' size='small' fluid type='submit'>Submit</Button>
										  </Form>
										  </Fragment>
										 )}
										</Mutation>
							          </Modal.Content>
							        </Modal>
					          		</Fragment>
					          	)
					          }}
					          </Query>
					        </Menu.Item>

					        <Menu.Item>
					          <Header color='orange' as='h4'>More Info</Header>
					          <Query query={ALL_ADDRESS}>
								{({ loading : loadingAllAddress, data: { addresses } }) => (
									<Fragment>
								          <Query query={ME_MORE}>
								          {({ loading: loadingMeMore, data }) => {
								          if (loadingMeMore || loadingAllAddress) return <Loader active inline='centered' />
								          console.log(data)
								          const addressOptions= addresses.map(x => ({ key: x.id, value: x.id, text: x.municipal.toUpperCase()+'/'+x.baranggay.toUpperCase()
									      	}))
								      	return (
								          	<Fragment>
								          	{
								          		data.meMore.gender === null || data.meMore.gender === undefined || data.meMore === undefined
								          		?
								          		<p>GENDER:&nbsp;&nbsp;</p>
								          		:
								          		<p>GENDER:&nbsp;&nbsp;{data.meMore.gender.toUpperCase()}</p>
								          	}
								          	{
								          		data.meMore.birthday === null || data.meMore.birthday === undefined || data.meMore === undefined
								          		?
								          		<p>BIRTHDAY:&nbsp;&nbsp;</p>
								          		:
								          		<p>BIRTHDATE:&nbsp;&nbsp;{dayjs(data.meMore.birthday).format('MM-DD-YYYY')}</p>
								          	}

								          	{
									          	data.meMore.address === null || data.meMore.address === undefined || data.meMore === undefined
									          	?
									          	<p>ADDRESS:&nbsp;&nbsp;</p>
									          	:
									          	<p>
									          	ADDRESS:&nbsp;&nbsp;
									          	{data.meMore.address.province.toUpperCase()},&nbsp;&nbsp;
									          	{data.meMore.address.municipal.toUpperCase()},&nbsp;&nbsp;
									          	{data.meMore.address.baranggay.toUpperCase()}&nbsp;&nbsp;
									          	Philippines &nbsp;&nbsp;{data.meMore.address.zip}
									          	</p>
								          	}
								          	<Button
										      	fluid
										      	size='tiny'
										      	color='orange'
										      	onClick={this.showMoreInfo}
										    >Update New</Button>
										    <Modal size='tiny' open={openModalMore} onClose={this.closeMoreInfo} closeIcon>
										          <Modal.Header>Update New Info</Modal.Header>
										          <Modal.Content>
										          <Mutation mutation={UPDATE_MOREINFO}>
										          {( addMoreInfo, { loading, data: dataMutationMoreInfo, error }) => (
										          	<Fragment>
										          	{loading && <Loader active inline='centered' />}
										          	{ error && 
									                    <Message
									                    size='mini'
									                    error
									                    header='Error Updating New!'
									                    list={error.graphQLErrors.map(x => x.message)}
									                  /> }
													{ dataMutationMoreInfo && history.go(0) }
										            <Form onSubmit={evt => {
										            	evt.preventDefault();
										            	addMoreInfo({
										            		variables: {
										            			gender: newGender,
										            			birthday: newBirthday,
										            			address: newAddressId
										            		}
										            	})
										            }}>
													    <Form.Field>
													      <label>Gender</label>
													      	<Dropdown 
													      		placeholder='Gender' 
													      		search
													      		name='gender'
													      		value={newGender}
													      		selection 
													      		options={genderOptions}
													      		onChange={this.changeGenderInfo} 
													      		/>
													    </Form.Field>
													    <Form.Field>
													      <label>Birthdate</label>
													      <DateInput
													          name="date"
													          dateFormat="MM-DD-YYYY"
													          placeholder="Date"
													          value={newBirthday}
													          iconPosition="left"
													          onChange={this.changeDateInfo}
													        />
													    </Form.Field>
													    <Form.Field>
													      <label>Address</label>
													      <Dropdown 
													      		placeholder='Address' 
													      		search
													      		name='address'
													      		value={newAddressId}
													      		selection 
													      		options={addressOptions}
													      		onChange={this.changeAddressInfo} 
													      		/>
													    </Form.Field>
													    <Button color='orange' size='small' fluid type='submit' disabled={isEmpty || isNull || isUndefined}>Submit</Button>
													  </Form>
													  </Fragment>
													  )}
													</Mutation>
										          </Modal.Content>
										        </Modal>
								          	</Fragment>
								        )}}
								        </Query>
								    </Fragment>
						        )}
								</Query>
					        </Menu.Item>
					        <Menu.Item>
					          <Header color='orange' as='h4'>Password</Header>
					          		<p>Password:&nbsp;&nbsp;********</p>
					          		<Button
							      	fluid
							      	size='tiny'
							      	color='orange'
							      	onClick={this.showPassInfo}
							      >Update</Button>
							      	<Modal size='tiny' open={openModalPass} onClose={this.closePassInfo} closeIcon>
							          <Modal.Header>Change Password</Modal.Header>
							          <Modal.Content>
							          <Mutation mutation={CHANGE_PASS}>
							          {( changePassword,  { loading, data, error }) => (
							          	<Fragment>
							          	{loading && <Loader active inline='centered' />}
							          	{ error && 
						                    <Message
						                    size='mini'
						                    error
						                    header='Error Changing Password!'
						                    list={error.graphQLErrors.map(x => x.message)}
						                  /> }
										{ data && history.go(0) }
								            <Form onSubmit={evt => {
								            	evt.preventDefault();
								            	changePassword({
								            		variables: {
								            			oldPassword,
								            			newPassword
								            		}
								            	})
								            }}>
											    <Form.Field>
											      <label>Old Password</label>
											      <input
											      	placeholder='Old Password'
											      	name='oldPassword'
											      	type='password'
											      	value={oldPassword}
											      	onChange={this.changeOldPass} />
											    </Form.Field>
											    <Form.Field>
											      <label>New Password</label>
											      <input 
											      	placeholder='New Password' 
											      	name='newPassword'
											      	type='password'
											      	value={newPassword}
											      	onChange={this.changeNewPass}/>
											    </Form.Field>
											    <Button color='orange' size='small' fluid type='submit'>Submit</Button>
											  </Form>
										  </Fragment>
										)}
										</Mutation>
							          </Modal.Content>
							        </Modal>
					        </Menu.Item>
		      			</Menu>
				    </Grid.Column>
				</Grid.Row>
				</Grid>
			</Segment>
		)
	}
}

export default withRouter(ProfileFromAccount)
