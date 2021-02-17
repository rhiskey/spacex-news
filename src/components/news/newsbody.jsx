import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "./newsbody.css";

export class NewsPostClass extends Component {
  render() {
    var details = this.props.details;
    const title = this.props.title;
    const image = this.props.image;
    const date = this.props.date;
    // const upcoming = this.props.upcoming;

    return (
      <Fragment>
        <li className="news-li">
          <div className="grid_container">
            <div className="item-image">
              {!image ? (
                <div className="item_image_img rectangle">
                  <p className="prev-text">Image Not Avalible</p>
                </div>
              ) : (
                <a href={this.props.video}>
                  <img
                    className="item_image_img"
                    src={image}
                    alt="Preview_Mark"
                  />
                </a>
              )}
            </div>
            <div className="item-title">
              <p>
                <a className="item__title" href={this.props.link}>
                  {title}
                </a>
              </p>
            </div>
            <div className="item-date">
              <p className="item__date">
                {" "}
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            <div className="item-text">
              <p className="item__text">
                {" "}
                {details === null ? <label>Upcoming</label> : details}
              </p>
            </div>
          </div>
        </li>
      </Fragment>
    );
  }
}

NewsPostClass.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  image: PropTypes.string,
};

NewsPostClass.defaultProps = {
  title: "Here should be a title",
  details: "Sample post",
  image: "#",
};

export default NewsPostClass;
