import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapListEntry from './maplistentry';
import { Table, Column, Cell } from 'fixed-data-table';
import { Col } from 'react-bootstrap';

// Table data as a list of array.
// function rowGetter() {

// }
// Render your table
class MapList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
          rowHeight={10}
          headerHeight={10}
          width={300}
          height={10}
        >
          <Column
            columnKey="events"
            header={<Cell>Events:</Cell>}
            cell={
              <Cell>
                <MapListEntry />
              </Cell>
            }
            width={200}
          />

        </Table>

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('All Events in state, map comp : ', state.allEvents);
  return {
    allEvents: state.allEvents,
  };
}

export default connect(mapStateToProps)(MapList);
