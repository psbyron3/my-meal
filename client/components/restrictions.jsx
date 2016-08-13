import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class RestrictionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount(){
  //   // this.getDOMNode().querySelector('input').checked = "false"
  //   // this.props.selectedRestrictions.forEach((id) => {
  //   //   let node = 'this.refs' + `idis${id}`;
  //   //
  //   //
  //   //   console.log('input element is: ', ReactDOM.findDOMNode(node));
  //   //   ReactDOM.findDOMNode(node).checked = "true";
  //   //
  //   // })
  //
  //   // console.log('mounted:', ReactDOM.findDOMNode(this.refs));
  //   console.log('mounted:', this.refs.idis1);
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     localRestrictions: nextProps.selectedRestrictions
  //   })
  // }

  renderRestrictions() {
    return this.props.restrictions.map((restriction) => {
      console.log(`${restriction.id} should be checked:`, this.props.selectedRestrictions.indexOf(restriction.id) > -1);

      return (
        <div style={{ display: 'inline-block' }}>
          <label key={restriction.id} className="checkboxLabel">
            <input
              type="checkbox"
              value={restriction.id}
              checked={this.props.selectedRestrictions.indexOf(restriction.id) > -1}
              onFocus={this.props.onCheckChange}
            />

          {restriction.tagName}

          </label>
        </div>
      );
    });
  }

  render() {
    // console.log('props in restriction menu:', this.props);
    console.log('...........', this.props.selectedRestrictions);

    return (
      <div id="checkboxes">{this.renderRestrictions()}</div>
    );
  }
}

export default RestrictionMenu;
