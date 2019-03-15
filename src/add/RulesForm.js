import React, {Component} from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import Rules, {RULE} from './Rules';

const MainButton = styled(Button)({
  marginTop: 15,
  marginBottom: 10,
  marginRight: 20
});

class RulesForm extends Component {

  state = {
    rules: []
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const {rules} = nextProps;
    const {rules: rls} = this.props;
    if (rules !== rls) {
      this.setState({rules});
    }
  }

  componentDidMount() {
    const {rules} = this.props;
    this.setState({rules});
  }

  addRule() {
    const {rules} = this.state;
    rules.push(undefined);
    this.setState({rules});
  }

  removeRule(index) {
    const {rules} = this.state;
    rules.splice(index, 1);
    this.setState({rules});
  }

  ruleChanged(rule, index) {
    const {rules} = this.state;
    rules[index] = rule;
    this.setState({rules});
  }

  back() {
    const {back} = this.props;
    back && back();
  }

  preparePriceRules() {
    const {rules} = this.state;

    return rules.map(r => {
      const {ad, rule} = r;
      return {
        ads: ad,
        ...this.prepareRule(rule)
      }
    });
  }

  prepareRule(rule) {
    const {mode, value1, value2} = rule;
    switch (mode) {
      case RULE.GET_X_FOR_Y:
        return {
          deal: {
            get: value1,
            replace: value2
          }
        };

      case RULE.DISCOUNT:
        return {discount: value1};

      case RULE.BUNDLE_SET:
        return {
          bundle: {
            qty: value1,
            discount: value2
          }
        };
    }
  }

  addedRule(e) {
    e.preventDefault();

    const {onSubmit} = this.props;
    const {rules} = this.state;

    onSubmit && onSubmit({
      rules,
      request: this.preparePriceRules()
    });
  }

  render() {
    const {rules} = this.state;
    return (
      <div>
        <MainButton color="primary" onClick={() => this.addRule()} >Add Ad Rule</MainButton>
        <form onSubmit={e => this.addedRule(e)}>
          {rules.map((rule, index) => <Rules key={index}
            value={rule}
            remove={() => this.removeRule(index)}
            onChange={(e) => this.ruleChanged(e, index)} />)}
          <div>
            <MainButton onClick={() => this.back()}>Back</MainButton>
            <MainButton variant="contained" color="primary" type="submit">Next</MainButton>
          </div>
        </form>
      </div>
    );
  }
}

export default RulesForm;