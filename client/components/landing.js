import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Landing extends Component {


	render() {
		return (
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
    	);
  	}
}
