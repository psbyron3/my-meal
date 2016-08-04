import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    let rows = this.state.allEvents ?
      this.state.allEvents.length
      :
      1;

    return (
      <div className="event-list" >
        <Table

          rowsCount={rows}
          rowHeight={50}
          headerHeight={50}
          width={300}
          height={1000}
        >
          <Column
            header={<Cell>Name</Cell>}
            cell={props => (
              <Cell {...props}>
                {this.props.allEvents}
              </Cell>
            )}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEvents : state.allEvents
  }
}

export default connect(mapStateToProps)(MapList);
