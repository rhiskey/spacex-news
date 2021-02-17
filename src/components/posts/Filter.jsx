import React, { Component } from 'react';
import Dropdown from "react-dropdown";
import '../../App.css';

class Filter extends Component {


  render() {
    return (
      <div className="filterStuff">
        
        <table className="filter">
          <thead>
            <tr>
              <td>
                <p>Launch Site</p>
              </td>
              <td>
                <p>Rocket</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <Dropdown
                  options={this.props.launch_sites}
                  onChange={this._onSelectLaunchSite}
                  placeholder="Select a Launch Site"
                />
              </td>
              <td>
                <Dropdown
                  options={this.props.rockets}
                  onChange={this._onSelectRocket}
                  placeholder="Select a Rocket"
                />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}


export default Filter;