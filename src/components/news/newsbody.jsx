import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "./newsbody.css";

export class NewsPostClass extends Component {
  render() {
    var details = this.props.details;
    const title = this.props.title;
    const image = this.props.image;
    const date = this.props.date;
    const upcoming = this.props.upcoming;

    return (
      <Fragment>
        <li className="news">
          <div className="content">
            {/* {!image ? (
              <div className="item item_big">
                <p className="prev-text">Preview Not Avalible</p>
              </div>
            ) : (
              <img className="item" src={image} alt="Preview_Mark" />
            )}
            <div className="item">
              <div className="item__text">
                <p className="item__date"> {new Date(date).toLocaleDateString()}</p>
                <h2 className="item__heading"> {details === null ? (<p>Upcoming</p>) : (details)}</h2>
              </div>
            </div> */}

            {/* <div  class="item"></div>
            <div class="item"></div>
            <div class="item"></div> */}

            <table className="tbl">
              <tbody>
                <tr>
                  <td rowSpan="2" className="left">
                    {!image ? (<div className="rectangle"><div className="prev-text">Preview Not Avalible</div></div>)
                      : (<a href={this.props.video} ><img className="image" src={image} alt="Preview_Mark" /></a>)
                    }
                  </td>
                  <td className="right">
                    <tr className="title-date" >
                      <td align="left" className="newsTitle" >
                        <a href={this.props.link}>{title}</a>
                      </td>
                      <td align="right" className="date" >
                        {new Date(date).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr align="left" className="text">
                      <td colSpan="2">
                        {details === null ? (<p>Upcoming {upcoming} </p>) : (<p>{details}</p> )}
                      </td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>
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
