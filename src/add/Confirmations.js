import React, {Component} from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiDivider from '@material-ui/core/Divider';


const SubTitle = styled(Typography)({
  color: "#9e9e9e",
  marginTop: 20,
});

const Divider = styled(MuiDivider)({
  margin: '20px 0',
})


class CofirmationDialog extends Component {

  state = {
    open: false,
    total: 0,
  };


  async componentDidMount() {
    const {total, customer} = this.props;
    this.setState({
      total,
      customer,
      open: true
    })
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  submit() {
    const {submit} = this.props;
    submit && submit();
    this.handleClose();
  }

  render() {
    const {customer, open, total} = this.state;
    if (!customer) {
      return (<div></div>);
    }

    const {name, adIds} = customer;
    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
      >
        <DialogTitle>Hi {name}, Are you sure to check out now?</DialogTitle>
        <DialogContent>
          <SubTitle variant="h6" component="p">
            <b>SKUs: </b> {adIds.join(', ')}
          </SubTitle>
          <Divider />
          <Typography variant="h5" component="h5">
            <b>Total: </b> ${total}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Maybe Later
            </Button>
          <Button onClick={() => this.submit()} color="primary" autoFocus>
            Checkout
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CofirmationDialog;