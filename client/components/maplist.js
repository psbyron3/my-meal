import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

// Table data as a list of array.

// Render your table
export default class MapList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTableData: [
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
      <div className="event-list" >
        <Table

          rowsCount={this.state.myTableData.length}
          rowHeight={50}
          headerHeight={50}
          width={300}
          height={1000}
        >
          <Column
            header={<Cell>Name</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.state.myTableData[props.rowIndex].name}
              </Cell>
            )}
            width={200}
          />
        </Table>
      </div>
    );
  }
}
