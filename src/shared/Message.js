import React, {Component} from 'react';
import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';
import MuiIcon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Content = styled(SnackbarContent)(({bg}) => ({
  backgroundColor: bg,

  'div:first-child': {
    flex: 1,
  },
}));

const ContentMessage = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const Icon = styled(MuiIcon)(({clr, name}) => ({
  color: clr,
  marginRight: name === 'close' ? 0 : 15,
  fontSize: 20,
}));

const MessageIcon = ({name, clr}) => (
  <Icon clr={clr} name={name}>
    {name}
  </Icon>
);

const variantIcon = {
  success: 'check_circle',
  error: 'error',
};

const variantColor = {
  success: green[600],
  error: '#f44336',
};

const variantAutoHide = {
  success: 3000,
  error: 50000,
};

class Message extends Component {
  constructor(props) {
    super(props);
    const {message, type} = props;
    this.state = {
      open: !!message,
      message,
      type,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {message, type} = nextProps;
    const {message: msg, type: typ} = this.props;
    if (msg !== message) {
      this.setState({message, open: !!message});
    }

    if (typ !== type) {
      this.setState({type});
    }
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  }

  render() {
    const {message, type, open} = this.state;
    const variant = type || 'success';
    const iconName = variantIcon[variant];
    const color = variantColor[variant];
    const duration = variantAutoHide[variant];

    return (
      <Snackbar open={open} autoHideDuration={duration} onClose={() => this.handleClose()}>
        <Content
          bg={color}
          message={
            <ContentMessage color="inherit" component="span">
              <MessageIcon name={iconName} />
              {message}
            </ContentMessage>
          }
          action={[
            <IconButton key="close" color="inherit" onClick={() => this.handleClose()}>
              <MessageIcon name="close" />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

export default Message;
