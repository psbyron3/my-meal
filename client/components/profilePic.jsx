import React, { Component, PropTypes } from 'react';
import { fileinput } from 'bootstrap-fileinput';
import $ from 'jquery';

export default class ProfilePic extends Component {


  componentDidMount() {
    $('#avatar-2').fileinput({
      overwriteInitial: true,
      maxFileSize: 1500,
      showClose: false,
      showCaption: false,
      showBrowse: false,
      browseOnZoneClick: true,
      removeLabel: '',
      removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
      removeTitle: 'Cancel or reset changes',
      elErrorContainer: '#kv-avatar-errors-2',
      msgErrorClass: 'alert alert-block alert-danger',
      defaultPreviewContent: '<img src="../images/avatar.jpeg" alt="Your Avatar' +
      'class="avatar" style="width:160px"><p class="text-muted">Click to add a picture</p>',
      layoutTemplates: { main2: '{preview} {remove} {browse}' },
      allowedFileExtensions: ['jpg', 'png', 'gif'],
    });
  }

  onSubmit(e) {
    this.props.onValueChange(e.target.files);
  }

  render() {
    return (
      <div>
        <div id="kv-avatar-errors-2" className="center-block" style={{ width: '800px', display: 'none' }}>
        </div>
        <div className="kv-avatar center-block" style={{ width: '200px' }}>
          <input
            id="avatar-2"
            name="avatar-2"
            type="file"
            className="file-loading"
            onChange={(e) => { this.onSubmit(e); }}
          />
        </div>
      </div>
    );
  }
}

ProfilePic.propTypes = { onValueChange: PropTypes.func };
