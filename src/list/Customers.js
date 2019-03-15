import React from 'react';
import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import {API_URL} from '../helpers/Global';
import BaseComponent from '../shared/BaseComponent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const Content = styled.div({
  maxWidth: 600,
  margin: '24px auto',
});

const Card = styled(MuiCard)({
  padding: 8,
  marginBottom: 20,
});

const CardContent = styled(MuiCardContent)({

});

const SubTitle = styled(Typography)({
  fontSize: 16,
  color: 'rgba(0,0,0, .6)',
  marginBottom: 5
})

const CreatedDate = styled(Typography)({
  marginTop: 25,
});

const Rule = styled.li({
  color: 'rgba(0,0,0, .5)',
  lineHeight: '1.8'
});

const Price = styled(Typography)({
  marginBottom: 16,
});

class JobsPage extends BaseComponent {

  state = {
    customers: []
  }

  constructor(props) {
    super(props, {});
  }

  async componentDidMount() {
    this.setState({loading: true});
    const [customers, ads] = await Promise.all(
      [this.fetchCustomers(), this.fetchAds()]
    );

    this.setState({loading: false, customers, ads});
  }

  async fetchCustomers() {
    try {
      const response = await fetch(`${API_URL}customers`);
      return await response.json();
    } catch (ex) {
      // todo : error 
      return [];
    }
  }

  async fetchAds() {
    try {
      const response = await fetch(`${API_URL}ads`);
      return await response.json();
    } catch (ex) {
      // todo : error 
      return [];
    }
  }

  findAd(id) {
    const {ads} = this.state;
    return ads.find(ad => ad.id === id);
  }


  renderRuleAds(rule) {
    const {ads, deal, discount, bundle} = rule;
    const ad = this.findAd(ads);
    const {name, price} = ad;
    if (deal) {
      return `Get a ${deal.get} for ${deal.replace} deal on ${name}s`;
    }

    if (discount) {
      return `Get a discount on ${name}s where the price drops to $${price - discount} per ad`;
    }

    if (bundle) {
      return `Get a discount on ${name}s when ${bundle.qty} or more are purchased. The price drops to $${price - bundle.discount} per ad`;
    }

    return '';
  }


  renderRules(rules) {
    if (!rules || rules.length === 0) {
      return <SubTitle>Rules: None</SubTitle>
    }

    return (
      <div>
        <SubTitle>Rules: </SubTitle>
        <ul>
          {rules.map(rule => (
            <Rule key={rule.ads}>
              {this.renderRuleAds(rule)}
            </Rule>
          ))}
        </ul>
      </div>
    )
  }

  renderCustomer(cust) {
    const {id, name, adIds, createdAt, rules, totalAmount} = cust;
    return (
      <Card key={id}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>{name}</Typography>
          <Price color="primary" variant="b" component="b">Total: {totalAmount}</Price>
          <SubTitle>{adIds.map(id => this.findAd(id).name).join(', ')}</SubTitle>
          {this.renderRules(rules)}
          <CreatedDate component="p" color="textSecondary">Created At: {moment(createdAt).format("LL")}</CreatedDate>
        </CardContent>
      </Card>
    )
  }


  renderCustomers() {
    const {customers} = this.state;
    return (
      <Content>
        {customers.map(cust => this.renderCustomer(cust))}
      </Content>
    );
  }

  render() {
    const {loading} = this.state;
    return (
      loading ? this.renderLoader() : this.renderCustomers()
    );
  }
}

export default JobsPage;
