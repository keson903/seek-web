import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NumericInput from '../shared/NumericInput';
import Typography from '@material-ui/core/Typography';
import {API_URL} from '../helpers/Global';

const MainButton = styled(Button)({
  marginTop: 15,
  marginBottom: 10,
  marginRight: 20
});

const AdContent = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: 10,
  marginBottom: 20,
  justifyItems: 'center',
  alignItems: 'center'
});

class ProductsForm extends Component {

  state = {
    ads: []
  }

  componentWillReceiveProps(nextProps) {
    const {ads} = nextProps;
    const {ads: as} = this.props;
    if (ads !== as) {
      this.setState({ads});
    }
  }

  async componentDidMount() {
    let {ads} = this.props;
    ads = ads.length ? ads : await this.fetchAds();
    this.setState({ads});
  }

  async fetchAds() {
    try {
      const response = await fetch(`${API_URL}ads`);
      const ads = await response.json();

      return ads.map(s => {
        s.qty = 0;
        return s;
      });
    } catch (ex) {
      // todo : error 
    }
  }


  back() {
    const {back} = this.props;
    back && back();
  }

  updateAdValue(qty, index) {
    const {ads} = this.state;
    ads[index].qty = qty;
    this.setState({ads});

  }

  async checkOut(e) {
    const {onSubmit, onChange} = this.props;
    const {ads} = this.state;
    onChange && onChange({
      ads,
      request: ads.reduce((prev, ad) => prev.concat(new Array(ad.qty).fill(ad.id)), [])
    });
    onSubmit && onSubmit(e);
  }

  render() {
    const {ads} = this.state;
    return (
      <form onSubmit={e => this.checkOut(e)}>
        {ads.map((ad, index) => (
          <AdContent key={ad.id}>
            <Typography>{ad.name}</Typography>
            <NumericInput label="qty" value={ad.qty} onChange={(value) => this.updateAdValue(value, index)} />
          </AdContent>
        ))}
        <div>
          <MainButton onClick={() => this.back()}>Back</MainButton>
          <MainButton variant="contained" color="primary" type="submit">Check Out</MainButton>
        </div>
      </form>
    );
  }
}

export default ProductsForm;