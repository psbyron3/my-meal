import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { renderSearchFunc } from '../actions/index';
import { connect } from 'react-redux';
import SearchBar from '../containers/searchBar';


class Landing extends Component {

  componentWillMount() {
    this.props.renderSearchFunc(false);
  }

  componentDidMount() {
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

  componentWillUnmount() {
    this.props.renderSearchFunc(true);
  }

  render() {
    return (
      <div>
        <div className="homepage-hero-module">
          <div className="video-container">
            <div className="landing-overlay">
              <h1 className="landing-mission">
              Your perfect meal awaits.
              </h1>
              <br />
              <div>
                <SearchBar />
              </div>
            </div>
            <div className="filter" style={{ zIndex: '1' }}></div>
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
            <h2 className="featurette-heading"> Discover.
              <span className="text-muted">  Find your new favorite dish</span>
            </h2>
            <p className="lead">
              Explore in your neighborhood or find a great meal across town.
              Our chefs are waiting to serve you.
              Choose a meal you crave like grandma's secret recipe fried chicken.
              Branch out and try something new like Japanese Omakase.
              Limited diet? No problem.
              Our search engine will tailor to your every need.
              The possibilities are limitless!
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
          <div className="col-md-7 col-md-push-5">
            <h2 className="featurette-heading"> Book Now.
              <span className="text-muted"> You're meal awaits you </span>
            </h2>
            <p className="lead">
              Find a day and time that works for you.
              Once your perfect meal is discovered, reserve your spot.
              Don't worry, we set you up with a chat to reach out to your host and work out all the details.
              Need more details? Head to your dashboard and manage your meals.
            </p>
          </div>
          <div className="col-md-5 col-md-pull-7">
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
            <h2 className="featurette-heading">  Enjoy.
              <span className="text-muted"> You're in good company now </span>
            </h2>
            <p className="lead">
              Savor your meal. Share new experiences with new people.
              Eat like a local.
              Uncover new cultures from both your host and your new friends.
              Relax and let us take care of everything.
            </p>
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


// const mapStateToProps = (state) => {
//   return {};
// };

Landing.propTypes = {
  renderSearchFunc: PropTypes.func,
};

export default connect(null, { renderSearchFunc })(Landing);

