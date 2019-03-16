import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MuiPaper from '@material-ui/core/Paper';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import BaseComponent from '../shared/BaseComponent';

import {API_URL} from '../helpers/Global';
import CofirmationDialog from './Confirmations';
import RulesForm from './RulesForm';
import ProductsForm from './ProductsForm';
import CustomerForm from './CustomerForm';

const Content = styled(MuiPaper)({
  maxWidth: 600,
  margin: '24px auto',
  padding: 24,
});

class CustomerAddPage extends BaseComponent {

  state = {
    step: 0,
    rules: [],
    ads: [],
    customer: {},
    loading: false,
    confirmation: false
  }

  constructor(props) {
    super(props, {});
  }

  back() {
    const {step} = this.state;
    this.setState({step: step - 1});
  }

  addedRules(event) {
    const {rules, request} = event;
    const {customer} = this.state;
    customer.rules = request;
    this.setState({rules, customer, step: 2});
  }

  updatedAds(event) {
    const {ads, request} = event;
    const {customer} = this.state;
    customer.adIds = request;
    this.setState({ads, customer});
  }

  addCustomer(event) {
    const {name} = event;
    const {customer} = this.state;
    customer.name = name;
    this.setState({name, customer, step: 1});
  }

  async checkOut(e) {
    e.preventDefault();

    this.setState({
      loading: true
    })

    const total = await this.fetchTotal();

    this.setState({
      loading: false,
      confirmation: true,
      total,
    })
  }

  async submit() {
    try {

      await this.postCustomer();

      this.setState({
        message: 'Customer added!',
      });

      const {history} = this.props;
      history.push('/');

    } catch (ex) {
      this.setState({
        message: 'Ops! Unable to add customer',
        type: 'error'
      });
    }
  }

  async fetchTotal() {
    try {
      const {name, customer} = this.state;
      const response = await fetch(`${API_URL}customer/total`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, ...customer})
      });
      const {total} = await response.json();
      return total;
    } catch (ex) {
      // todo: error
    }
  }

  async postCustomer() {
    try {
      const {name, customer} = this.state;
      await fetch(`${API_URL}customer`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, ...customer})
      });
    } catch (ex) {
      // todo: error
    }
  }

  renderStepper() {
    const {step} = this.state;

    return (
      <Stepper activeStep={step} orientation="vertical">
        {this.renderCustomerForm()}
        {this.renderRulesForm()}
        {this.renderProductsForm()}
      </Stepper>
    );
  }

  renderCustomerForm() {
    const {name} = this.state;
    return (
      <Step>
        <StepLabel>Enter Customer Detail</StepLabel>
        <StepContent>
          <CustomerForm
            name={name}
            back={() => this.back()}
            onSubmit={(e) => this.addCustomer(e)} />
        </StepContent>
      </ Step>
    );
  }

  renderRulesForm() {
    const {rules} = this.state;
    return (
      <Step>
        <StepLabel>Add Pricing Rules</StepLabel>
        <StepContent>
          <RulesForm
            rules={rules}
            back={() => this.back()}
            onSubmit={(e) => this.addedRules(e)} />
        </StepContent>
      </ Step>
    );
  }

  renderProductsForm() {
    const {ads} = this.state;
    return (
      <Step>
        <StepLabel>Select Ad Products</StepLabel>
        <StepContent>
          <ProductsForm
            ads={ads}
            back={() => this.back()}
            onSubmit={(e) => this.checkOut(e)}
            onChange={(e) => this.updatedAds(e)} />
        </StepContent>
      </ Step>
    );
  }

  renderForm() {
    const {confirmation, total, customer} = this.state;
    return (
      <Content elevation={1}>
        <Typography variant="h6" component="h6">Add Customer</Typography>
        {this.renderStepper()}
        {confirmation && <CofirmationDialog open={confirmation} total={total} customer={customer} submit={() => this.submit()} />}
        {this.renderMessage()}
      </Content>
    );
  }

  render() {
    const {loading} = this.state;
    return loading ? this.renderLoader() : this.renderForm();
  }
}

export default CustomerAddPage;

