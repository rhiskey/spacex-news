import React, { Component, useState, useEffect, Fragment, Text } from "react";
import Container from "./Container";
import Filter from "./Filter";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import 'Launch.css';

const BASE_PATH = "https://api.spacexdata.com/v3/launches";


export class News extends Component {
  state = {
    result: [],
    launch_sites: [],
    rockets: [],
    fLauchSite: "",
    fRocketName: "",
  };

  componentDidMount() {
    this.fetchData(BASE_PATH);
  }

  fetchData = (api) => {
    fetch(`${api}`)
      .then((res) => res.json())
      .then((result) => this.setNews(result))
      .catch((error) => error);
  };

  setNews = (result) => {
    this.setState({ result });
    const launch_sites = [
      ...new Set(result.map((x) => x.launch_site.site_name)),
    ];
    this.setState({ launch_sites });
    const rockets = [...new Set(result.map((x) => x.rocket.rocket_name))];
    this.setState({ rockets });
  };

  componentWillUnmount() {
    this.setState({ result: [] });
  }

  _onSelectLaunchSite(value) {
    this.setLauchSite(value);
  }
  _onSelectRocket(value) {
    this.setRocketName(value);
  }

  setLauchSite = (fLauchSite) => {
    this.setState({ fLauchSite });
  };

  setRocketName = (fRocketName) => {
    this.setState({ fRocketName });
  };

  render() {
    const {
      result,
      launch_sites,
      rockets,
      fLauchSite,
      fRocketName,
    } = this.state;

    // const filteredLaunches = result.filter((rocket) => 
    //   rocket.launch_site.site_name == fLauchSite.value
    // );
    // const filteredRockets= result.filter((rocket) => 
    //   rocket.rocket.rocket_name == fRocketName.value
    // );
    const filteredResults = result.filter(
      rocket => {
        if (fLauchSite.value && fRocketName.value == null)
          return rocket.launch_site.site_name.includes(fLauchSite.value);
        else if (fRocketName.value && fLauchSite.value == null)
          return rocket.rocket.rocket_name.includes(fRocketName.value)
        else {
          return rocket.launch_site.site_name.includes(fLauchSite.value) &&
            rocket.rocket.rocket_name.includes(fRocketName.value)
        }
      }
    );
    console.log(filteredResults)

    return (
      <Fragment className="news-page">
        <h1>Launches</h1>
        {/* 
        < Filter
              launch_sites={launch_sites}
              rockets={rockets}
          /> */}
        <Fragment>
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
                    options={launch_sites}
                    onChange={this._onSelectLaunchSite.bind(this)}
                    placeholder="Select a Launch Site"
                  />
                </td>
                <td>
                  <Dropdown
                    options={rockets}
                    onChange={this._onSelectRocket.bind(this)}
                    placeholder="Select a Rocket"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
        <Container launches={filteredResults}/>

      </Fragment>
    );
  }
}

