import React, { Component, useState, useEffect, Fragment, Text } from "react";

import NewsPost, { NewsPostClass } from "../../components/news/news";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const BASE_PATH = "https://api.spacexdata.com/v3/launches";

export class News extends Component {
  state = {
    data: [],
    searchQuery: "",
    result: [],
    hitsPerPage: 20,
    page: 0,
    laucnh: "orange",
    launch_sites: ["Kwajalein Atoll", "Baltimor", "Kentucky", "Vostok"],
    rockets: ["Falcon 9", "Appolo", "Starlink"],
    events: [],
    fLauchSite: "",
    fRocketName: "",
    filteredLaunches: [],
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
    // this.filterSites(fLauchSite)
  };

  setRocketName = (fRocketName) => {
    this.setState({ fRocketName });
  };

  // filterSites = (launchSite) => {
  //   let filteredLaunches = this.state.result;
  //   filteredLaunches = filteredLaunches.filter((result) => {
  //     let launchSiteName = result.launch_site;
  //     return launchSiteName.indexOf(launchSite.toString().toLowerCase()) !== -1;
  //   });
  //   this.setState({
  //     filteredLaunches,
  //   });
  // };

  render() {
    const {
      result,
      launch_sites,
      rockets,
      fLauchSite,
      fRocketName,
      filteredLaunches,
    } = this.state;
      console.log("🚀 ~ file: News.jsx ~ line 86 ~ News ~ render ~ filteredLaunches", filteredLaunches)
    console.log(result.launch_site[0].site_name)
    const defaultOptionLaunch = launch_sites[0];
    const defaultOptionRocket = rockets[0];


    return (
      <Fragment>
        <h1>Launches</h1>
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

        {result
          // && result
          //   .filter(item => {
          //     if (!fLauchSite) return true;
          //     if (
          //       //item.launch_site.site_name === fLauchSite //||
          //       item.launch_site.site_name.includes(fLauchSite)
          //     ) {
          //       return true;
          //     }
          //   })
          .map(
            (post) => (
              <NewsPostClass
                key={post.mission_name}
                title={post.mission_name}
                details={post.details}
                date={post.launch_date_utc}
                image={post.links.mission_patch_small}
                upcoming={post.upcoming}
              />
            )
            //Map to post component
            // <li>
            //     <p>{post.mission_name}</p>
            //     <img src={post.links.mission_patch_small}></img>
            //     <p>{post.launch_date_unix}</p>
            //     <p>{post.details}</p>
            // </li>
          )}
      </Fragment>
    );
  }
}
