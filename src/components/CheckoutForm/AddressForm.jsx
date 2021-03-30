import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';


const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setshippingCountries] = useState([]);
    const [shippingCountry, setshippingCountry] = useState('');
    const [shippingSubdivision, setshippingSubdivision] = useState('');
    const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');

    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {

        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setshippingCountries(countries);
        setshippingCountry(Object.keys(countries)[0])

    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {... methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First name' />
                        <FormInput required name='lastName' label='Last name' />
                        <FormInput required name='address1' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='ZIP' label='ZIP / Postal Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                            </MenuItem>
                            ))}
                                                        

                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={''} fullWidth onChange={''}>
                                <MenuItem key={''} value={''}>
                                    Select Me
                                </MenuItem>

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={''} fullWidth onChange={''}>
                                <MenuItem key={''} value={''}>
                                    Select Me
                                </MenuItem>

                            </Select>
                        </Grid> */}
                       


                    </Grid>

                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
