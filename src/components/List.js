import React, {Component, Fragment} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class List extends Component {
  state = {
    selected: [1],
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  render() {
    const {
      items,
      title,
      headerColumns
    } = this.props;

    return (
      <Fragment>
        <h3>{title}</h3>
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              {headerColumns.map((name) => (
                <TableHeaderColumn key={name}>{name}</TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Should probably pass this in as a render function or something */}
            {items.map((item, index) => {
              return (
                <TableRow key={index} selected={this.isSelected(index)}>
                  <TableRowColumn>{item.date.toString()}</TableRowColumn>
                  <TableRowColumn>{item.description}</TableRowColumn>
                  <TableRowColumn>{item.amount}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}