import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import List from './components/List';
import AddNewModal from './components/AddNewModal';

export default class App extends Component {
  state = {
    addModalOpen: false,
    income: [],
    expenses: [],
  }

  onNewClick = () => {
    this.setState({ addModalOpen: true });
  }

  onAddNew = (details) => {
    const newState = this.state;
    if (details) {
      if (details.type === 'income') {
        newState.income.push(details);
      } else {
        newState.expenses.push(details);
      }
    }
    newState.addModalOpen = false;
    
    this.setState(newState);
  }

  render() {
    const listHeaderColumns = [
      "Date",
      "Description",
      "Amount",
    ];

    return (
      <MuiThemeProvider>
        <AppBar
          title="Budget App"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div style={{padding: '0 20px'}}>
          <List items={this.state.income} title="Income" headerColumns={listHeaderColumns} />
          <List items={this.state.expenses} title="Expenses" headerColumns={listHeaderColumns} />

          <FloatingActionButton 
            style={{
              position: 'absolute',
              right: '30px',
              bottom: '30px'
            }}
            onClick={this.onNewClick}
          >
            <AddIcon />
          </FloatingActionButton>

          <AddNewModal open={this.state.addModalOpen} onAdd={this.onAddNew} />
        </div>
      </MuiThemeProvider>
    );
  }
}
