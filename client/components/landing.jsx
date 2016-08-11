import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Landing extends Component {


  render() {
    return (
      <div>
        <div className="homepage-hero-module">
          <div className="video-container">
            <div className="filter"></div>
            <video className="fillWidth" autoPlay muted loop>
              <source src="https://s3-us-west-2.amazonaws.com/mymealmks/videos/523395704.mp4" type="video/mp4" />
              <source src="https://s3-us-west-2.amazonaws.com/mymealmks/videos/523395704.webm" type="video/webm" />
            </video>
            <div className="poster hidden">
              <img src="https://s3-us-west-2.amazonaws.com/mymealmks/lac+NZ.jpg" alt="" />
            </div>
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">First featurette heading.
              <span className="text-muted"> It&#39;ll blow your mind.</span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla.
            Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
            </p>
          </div>
          <div className="col-md-5">
            <img
              className="featurette-image img-responsive center-block"
              data-src="holder.js/500x500/auto" alt="500x500" src="../images/meal2.png"
              data-holder-rendered="true"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">First featurette heading.
              <span className="text-muted"> It&#39;ll blow your mind. </span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla.
            Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div className="col-md-5">
            <img
              className="featurette-image img-responsive center-block"
              data-src="holder.js/500x500/auto" alt="500x500" src="../images/meal3.png"
              data-holder-rendered="true"
            />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">First featurette heading.
              <span className="text-muted"> It&#39;ll blow your mind.</span>
            </h2>
            <p className="lead">Donec ullamcorper nulla non metus auctor fringilla.
            Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div className="col-md-5">
            <img
              className="featurette-image img-responsive center-block"
              data-src="holder.js/500x500/auto" alt="500x500" src="../images/meal1.png"
              data-holder-rendered="true"
            />
          </div>
        </div>


        <hr className="featurette-divider" />

        <footer>
          <p className="pull-right"><a href="#">Back to top</a></p>
          <p>© 2016 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
        </footer>

      </div>


    );
  }
}
