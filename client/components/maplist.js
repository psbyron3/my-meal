import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

// Table data as a list of array.

// Render your table
export default class MapList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: [
        { name: 'Rylan' },
        { name: 'Amelia' },
        { name: 'Estevan' },
        { name: 'Florence' },
        { name: 'Tressa' },
      ],
    };
  }

  render() {
    return (

      <div>
        <Table
          rowHeight={50}
          rowsCount={this.state.rows.length}
          width={5000}
          height={5000}
          headerHeight={50}
        >
        This is the table
        </Table>
      </div>
    );
  }
}
