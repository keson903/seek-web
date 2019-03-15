import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BaseComponent from '../shared/BaseComponent';
import {createFormError} from '../helpers/Form';

const MainButton = styled(Button)({
  marginTop: 15,
  marginBottom: 10,
  marginRight: 20
});

class CustomerForm extends BaseComponent {

  state = {
    name: '',
    nameError: '',
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
    const {name} = nextProps;
    const {name: nm} = this.props;
    if (name !== nm) {
      this.setState({name});
    }
  }

  async componentDidMount() {
    let {name} = this.props;
    this.setState({name});
  }

  back() {
    const {back} = this.props;
    back && back();
  }

  addCustomer(e) {
    e.preventDefault();
    if (this.validateForm()) {
      return;
    }

    const {onSubmit} = this.props;
    const {name} = this.state;
    onSubmit && onSubmit({name});
  }

  render() {
    const {name, nameError} = this.state;
    return (
      <form onSubmit={(e) => this.addCustomer(e)}>
        <TextField
          fullWidth
          error={!!nameError}
          helperText={nameError}
          value={name}
          onChange={({target}) => this.setState({name: target.value})}
          margin="normal"
          label="Customer Name"
          variant="outlined"
        />
        <MainButton variant="contained" color="primary" type="submit"> Next</MainButton>
      </form>
    );
  }
}

export default CustomerForm;

const constraints = {
  name: {
    presence: {allowEmpty: false},
  }
};
