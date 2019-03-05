import React, { Component, Fragment } from 'react'
import { Container, Button, Divider, Menu, Dropdown, Header, Checkbox } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react'
// import { throws } from 'assert'
import { Query } from 'react-apollo'
import { ALL_ADDRESS } from '../../QUERIES/ALL_QUERIES'

class Delivery extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep()
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep()
    }

    checkDeliveryIsTrue = (option) => {
        if (option === '5c74847e7d34ca059bf53958') {
            if (this.props.delivery.isPickUpAvailable === false) {
                return true
            } else {
                return false
            }
        }
        return false
    }

    render(){
        const {
                delivery,
                handleChangeMunicipal,
                handleChangeBaranggay,
                handleChangeDateTime,
                handleClickDelivery,
            } = this.props
        console.log(delivery)
        return(
           
                <Fragment>
                <Query query={ALL_ADDRESS}>
                    {({ loading : loadingAll, data: {addresses} }) => {
                        // const checkempty = delivery.municipal === null || delivery.municipal === undefined
                        if (loadingAll) return ''
                        const addressMunicipalInit = addresses
                            .map(x=> ({
                                key: x.id,
                                value: x.municipal,
                                text: x.municipal.toUpperCase() }))
                        const addressMunicipal = [...new Set(addressMunicipalInit)]
                        const addressBaranggay = addresses
                            .filter(x => x.municipal === delivery.municipal)
                            .map(y => ({
                                key: y.id,
                                value: y.baranggay,
                                text: y.baranggay.toUpperCase(),
                                fee: y.fee,
                                ispickupavailable: y.isPickUpAvailable }))
                        console.log(addressBaranggay)
                        return (
                            <Fragment>
                            <Menu vertical fluid>
                                <Menu.Menu>
                                    <Header size='large' textAlign='center'>Delivery Addresses</Header>
                                    <Menu.Item>
                                     <Dropdown placeholder='Municipal' 
                                       fluid search selection
                                       defaultValue={delivery.municipal}
                                       options={addressMunicipal}
                                       onChange={handleChangeMunicipal}
                                    />
                                    </Menu.Item>
                                    <Menu.Item>
                                     <Dropdown placeholder='Baranggay' 
                                       fluid search selection
                                       defaultValue={delivery.baranggay}
                                       options={addressBaranggay}
                                       onChange={handleChangeBaranggay}
                                    />
                                    </Menu.Item>
                                </Menu.Menu>
                            </Menu>
                            </Fragment>
                        )
                    }}
                </Query>
                <Menu vertical fluid>
                    <Menu.Menu>
                        <Header size='large' textAlign='center'>Options</Header>
                        <Menu.Item>
                              <Checkbox
                                id='5c74847e7d34ca059bf53958'
                                checked={delivery.deliveryOption === '5c74847e7d34ca059bf53958'}
                                label='FOR DELIVERY'
                                onClick={handleClickDelivery} />
                        </Menu.Item>
                        <Menu.Item>
                              <Checkbox
                                id='5c74849d7d34ca059bf53959'
                                checked={delivery.deliveryOption === '5c74849d7d34ca059bf53959'}
                                label='FOR PICK-UP'
                                onClick={handleClickDelivery}  />
                              <Divider />
                                <DateTimeInput
                                  disabled={delivery.deliveryOption === '5c74847e7d34ca059bf53958'}
                                  name="dateTime"
                                  placeholder="MM-DD-YYYY,hh:mm AM/PM"
                                  dateFormat="MM-DD-YYYY"
                                  timeFormat="AMPM"
                                  divider=","
                                  value={delivery.dateTime}
                                  iconPosition="left"
                                  onChange={handleChangeDateTime}
                                />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Divider hidden />
                <Container>
                    <Button
                        fluid
                        color='orange'
                        disabled={delivery.deliveryOption === null || delivery.deliveryOption === '' || delivery.addressId === null || delivery.addressId === '' || this.checkDeliveryIsTrue(delivery.deliveryOption)}
                        onClick={this.saveAndContinue}>
                        Proceed
                    </Button>
                    <Button
                        fluid
                        onClick={this.back}
                        style={{ marginTop: '0.5em' }}>
                        Back
                    </Button>
                </Container>
                </Fragment>
        )
    }
}

export default Delivery