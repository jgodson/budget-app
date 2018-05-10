import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

export default class AddNewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'income',
      date: new Date(),
      description: '',
      amount: '0.00',
      errors: [],
    }
  }

  handleClose = () => {
    this.props.onAdd(false);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAdd( {...this.state} );
    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      type: 'income',
      description: '',
      amount: '0.00',
    });
  }

  handleDateChange = (_, date) => {
    this.setState({ date });
  }

  handleSelectChange = (_, __, payload) => {
    this.setState({ type: payload });
  }

  handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  formatMoney = (e) => {
    const name = e.target.id;
    const value = parseFloat(e.target.value).toFixed(2);

    this.setState({ [name]: value });
  }

  render() {
    const {
      type,
      date,
      description,
      amount,
      errors
    } = this.state;

    const actions = [
      <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      disabled={errors.length > 0}
      onClick={this.handleSubmit}
    />,
    ];

    return (
      <Dialog
        title="Add new"
        contentClassName="AddNewModal"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <form ref={this.form} onSubmit={this.handleSubmit}>
          <SelectField
            id="type"
            style={{width: '100%'}}
            value={type}
            onChange={this.handleSelectChange}
            floatingLabelText="Type"
            floatingLabelFixed={true}
            hintText="Hint text"
          >
            <MenuItem value="income" primaryText="Income" />
            <MenuItem value="expense" primaryText="Expense" />
          </SelectField>

          <br />

          <DatePicker
            textFieldStyle={{width: '100%'}}
            autoOk={true}
            floatingLabelText="Date"
            container="inline"
            mode="landscape" 
            value={date}
            onChange={this.handleDateChange}
          />

          <br />

          <TextField
            id="description"
            style={{width: '100%'}}
            floatingLabelText="Descripton"
            floatingLabelFixed={true}
            hintText="Enter a description..."
            value={description}
            onChange={this.handleChange}
          />

          <br />

          <TextField
            id="amount"
            style={{width: '100%'}}
            floatingLabelText="Amount"
            floatingLabelFixed={true}
            value={amount}
            onChange={this.handleChange}
            onBlur={this.formatMoney}
          />
        </form>
      </Dialog>
    );
  }
}