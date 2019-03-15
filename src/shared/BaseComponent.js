import React, {Component} from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import {validate} from '../helpers/Form';
import Message from './Message';

const LoaderContent = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 350,
});

class BaseComponent extends Component {
  state = {
    loading: false,
    message: '',
    messageType: '',
  };

  constructor(props, constraints) {
    super(props);
    this.constraints = constraints;
    this.form = this.mapConstraintsToForm(constraints);
  }

  mapConstraintsToForm(constraints) {
    const form = {};
    Object.keys(constraints).forEach((key) => {
      form[key] = '';
    });
    return form;
  }

  validateForm() {
    const error = validate(this.form, this.state, this.constraints);
    this.setState(error);
    return Object.values(error).some((s) => !!s);
  }

  renderLoader() {
    return (
      <LoaderContent>
        <CircularProgress size={55} />
      </LoaderContent>
    );
  }

  renderMessage() {
    const {message, messageType} = this.state;
    if (!message) {
      return undefined;
    }

    return <Message message={message} type={messageType} />;
  }
}

export default BaseComponent;
