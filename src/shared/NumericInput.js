import React, {Component} from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const iconButtonSize = 56;


const InputContent = styled.div({
  position: 'relative',
});


const AddButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
  height: iconButtonSize,
  width: iconButtonSize,
});

const MinusButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 50,
  height: iconButtonSize,
  width: iconButtonSize,
});



class NumericInput extends Component {

  state = {
    value: 0,
  }

  componentDidMount() {
    const {value} = this.props;
    if (value) {
      this.setState({value});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    const {value: val} = this.props;

    if (value !== val) {
      this.setState({value});
    }
  }


  onChange(value) {
    const {onChange} = this.props;
    onChange && onChange(value);
  }

  plus() {
    let {value} = this.state;
    value += 1;
    this.setState({value});
    this.onChange(value);
  }

  minus() {
    let {value} = this.state;
    value = Math.max(value - 1, 0);
    this.setState({value});
    this.onChange(value);
  }


  render() {
    const {helperText, error, label} = this.props;
    const {value} = this.state;
    return (
      <InputContent>
        <TextField
          fullWidth
          error={error}
          helperText={helperText}
          value={value}
          onChange={(event) => this.onChange(event.target.value)}
          label={label}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <AddButton size="small" onClick={() => this.plus()}>
          <AddIcon />
        </AddButton>
        <MinusButton size="small" onClick={() => this.minus()}>
          <RemoveIcon />
        </MinusButton>
      </InputContent>
    );
  }
}

export default NumericInput;
