import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class Landing extends Component {

  componentDidMount(){
    // Video configuration
    function scaleVideoContainer() {
      const height = $(window).height() + 5;
      const unitHeight = `${parseInt(height, 10)}px`;
      $('.homepage-hero-module').css('height', unitHeight);
    }

    function scaleBannerVideoSize(element) {
      const windowWidth = $(window).width();
      const windowHeight = $(window).height() + 5;
      let videoWidth;
      let videoHeight;


      $(element).each(function () {
        const videoAspectRatio = $(this).data('height') / $(this).data('width');

        $(this).width(windowWidth);

        if (windowWidth < 1000) {
          videoHeight = windowHeight;
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({ 'margin-top': 0, 'margin-left': `${-(videoWidth - windowWidth) / 2}px` });

          $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
      });
    }

    function initBannerVideoSize(element) {
      $(element).each(function () {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
      });

      scaleBannerVideoSize(element);
    }

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', () => {
      scaleVideoContainer();
      scaleBannerVideoSize('.video-container .poster img');
      scaleBannerVideoSize('.video-container .filter');
      scaleBannerVideoSize('.video-container video');
    });

    $('.fillWidth').get(0).play();
  }

  render() {
    return (
      <div>
        <div className="homepage-hero-module">
          <div className="video-container">
            <div className="filter"></div>
            <video className="fillWidth" autoPlay muted loop>
              <source src="https://s3-us-west-2.amazonaws.com/mymealmks/videos/523395704.mp4" type="video/mp4" />
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
