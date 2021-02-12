import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "./newsbody.css";

export class NewsPostClass extends Component {

  render() {
    var details = this.props.details;
    const title = this.props.title;
    const image = this.props.image;
    const date = this.props.date;

    return (
      <Fragment>
        <li className="news">
          <div className="description">
            <table className="tbl">
              <tbody>
                <tr>
                  <td rowSpan="2" className="left">
                    {!image ? (<div className="rectangle"><div className="prev-text">Preview Not Avalible</div></div>)
                      : (<img className="image" src={image} alt="Preview_Mark" />)
                    }
                  </td>
                  <td className="right">
                    <tr className="title-date">
                      <td align="left" className="newsTitle">
                        {title}
                      </td>
                      <td align="right" className="date">
                        {new Date(date).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr align="left" className="text">
                      <td colSpan="2" >
                        {details === null ? (<p>Upcoming</p>) : (details)}
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
