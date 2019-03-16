import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MuiDivider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import BaseComponent from '../shared/BaseComponent';
import {createFormError} from '../helpers/Form';
import {API_URL} from '../helpers/Global';

const InputsContent = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: 12
});

const AdsContent = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const DeleteButton = styled(IconButton)({
  width: 50,
  height: 50,
  marginLeft: 10
})

const Divider = styled(MuiDivider)({
  margin: '12px 0 ',
})

export const RULE = {
  GET_X_FOR_Y: 1,
  DISCOUNT: 2,
  BUNDLE_SET: 3
}
const RULES = [{
  value: RULE.GET_X_FOR_Y,
  text: 'Get X For Y'
}, {
  value: RULE.DISCOUNT,
  text: 'Discount'
}, {
  value: RULE.BUNDLE_SET,
  text: 'Bundle Set'
}];

class Rules extends BaseComponent {

  state = {
    ads: [],
    rule: this.getDefaultRule(),
    ad: ''
  }

  form = {
    name: ''
  };
  formError = {};

  constructor(props) {
    super(props, constraints);
    this.formError = createFormError(this.form);

    this.state = {
      ...this.form,
      ...super.state,
      ...this.state,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    const {value: val} = this.props;
    if (value !== val) {
      const {rule, ad} = value;
      this.setState({rule, ad});
    }
  }

  async componentDidMount() {
    const ads = await this.fetchAds();
    let {value} = this.props;

    value = value || {
      rule: this.getDefaultRule(),
      ad: ads[0].id
    };
    const {rule, ad} = value;
    this.setState({ads, rule, ad});
  }

  getDefaultRule() {
    return {
      mode: RULES[0].value,
      value1: '',
      value2: '',
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

  renderPriceRule() {
    const {rule} = this.state;
    const {mode} = rule;

    return (
      <FormControl fullWidth variant="outlined" margin="normal" >
        <InputLabel>Rules</InputLabel>
        <Select
          value={mode}
          onChange={({target}) => {
            rule.mode = target.value;
            this.ruleChanged(rule);
          }}
          input={<OutlinedInput labelWidth={40} />}>
          {RULES.map(r => (<MenuItem key={r.value} value={r.value}>{r.text}</MenuItem>))}
        </Select>
      </FormControl >
    )
  }

  renderPriceScenario() {
    const {rule} = this.state;
    const {mode} = rule;

    switch (mode) {
      case RULE.GET_X_FOR_Y:
        return this.renderBothInputs(['Get X', 'For Y']);

      case RULE.DISCOUNT:
        return this.renderDiscountInputs();

      case RULE.BUNDLE_SET:
        return this.renderBothInputs(['More than', 'Discount']);

      default:
        throw new Error(`${mode} is not avialable`);
    }

  }

  renderBothInputs(labels) {
    const {rule} = this.state;
    const {value1, value2} = rule;
    return (
      <InputsContent>
        <TextField
          value={value1}
          onChange={({target}) => {
            rule.value1 = target.value;
            this.ruleChanged(rule);
          }}
          margin="normal"
          label={labels[0]}
          variant="outlined"
        />
        <TextField
          value={value2}
          onChange={({target}) => {
            rule.value2 = target.value;
            this.ruleChanged(rule);
          }}
          margin="normal"
          label={labels[1]}
          variant="outlined"
        />
      </InputsContent>
    )
  }

  renderDiscountInputs() {
    const {rule} = this.state;
    const {value1, value1Error} = rule;
    return (
      <TextField
        error={!!value1Error}
        helperText={value1Error}
        value={value1}
        onChange={({target}) => {
          rule.value1 = target.value;
          this.ruleChanged(rule);
        }}
        margin="normal"
        label="Discount"
        variant="outlined"
      />);
  }

  renderAds() {
    const {ad, ads} = this.state;
    return (
      <AdsContent>
        <FormControl fullWidth variant="outlined" margin="normal" >
          <InputLabel>Ads</InputLabel>
          <Select
            value={ad}
            onChange={(event) => this.adChanged(event.target.value)}
            input={<OutlinedInput labelWidth={28} />}>
            {ads.map(ad => (<MenuItem key={ad.id} value={ad.id}>{ad.name}</MenuItem>))}
          </Select>
        </FormControl>
        <DeleteButton onClick={() => this.removeRule()}>
          <DeleteIcon />
        </DeleteButton>
      </AdsContent>
    );
  }

  renderAdContent() {
    const {ad, ads} = this.state;
    const found = ads.find(s => s.id === ad);
    if (!found) {
      return;
    }

    const {price, maxLength, allowLogo, priority} = found;
    return (
      <ul>
        <li>Price : ${price}</li>
        <li>Description max characters: {maxLength}</li>
        {allowLogo && <li>Able to upload company logo</li>}
        {priority && <li>Higher Visibility</li>}
      </ul>
    );
  }

  onChange(e) {
    const {onChange} = this.props;
    onChange && onChange(e);
  }

  adChanged(ad) {
    const {rule} = this.state;
    this.setState({ad})
    this.onChange({ad, rule});
  }


  ruleChanged(rule) {
    const {ad} = this.state;
    this.setState({rule});
    this.onChange({ad, rule});
  }

  removeRule() {
    const {remove} = this.props;
    remove && remove();
  }

  render() {
    return (
      <div>
        {this.renderAds()}
        {this.renderAdContent()}
        {this.renderPriceRule()}
        {this.renderPriceScenario()}
        <Divider />
      </div>
    );
  }
}

export default Rules;


const constraints = {
  name: {
    presence: {allowEmpty: false},
  }
};
