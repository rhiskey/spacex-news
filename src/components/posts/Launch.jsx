import React, { Component, Fragment } from "react";
import Container from "./Container";
import "react-dropdown/style.css";
// import Dropdown from "react-dropdown";
import "./Launch.css";
import DropdownCustom from "./Dropdown";

export class News extends Component {
  state = {
    result: [],
    launch_sites: [],
    rockets: [],
    fLauchSite: "",
    fRocketName: "",
    isLoading: undefined,
    done: undefined,
  };

  componentDidMount() {
    this.fetchData(process.env.REACT_APP_BASE_PATH);
  }

  fetchData = (api) => {
    let self = this;
    setTimeout(() => {
      fetch(`${api}`)
        .then((res) => res.json())
        .then(function (result) {
          self.setState({ isLoading: true });
          self.setNews(result);
          setTimeout(() => {
            self.setState({ done: true });
          }, 1000);
        })
        .catch((error) => error);
    }, 1200);
  };

  propSort = function (array, prop, desc) {
    array.sort(function (a, b) {
      if (a[prop] < b[prop]) return desc ? 1 : -1;
      if (a[prop] > b[prop]) return desc ? -1 : 1;
      return 0;
    });
  };

  setNews = (result) => {
    this.setState({ result: result });

    const launch_sites = [
      ...new Set(result.map((x) => x.launch_site.site_name)),
    ];
    this.setState({ launch_sites });

    const rockets = [...new Set(result.map((x) => x.rocket.rocket_name))];
    this.setState({ rockets });

    let extendedR = this.state.rockets.slice();
    extendedR.unshift(null);
    this.setState({ rockets: extendedR });

    let extendedL = this.state.launch_sites.slice();
    extendedL.unshift(null);
    this.setState({ launch_sites: extendedL });
  };

  componentWillUnmount() {
    this.setState({
      result: [],
      launch_sites: [],
      rockets: [],
      fLauchSite: "",
      fRocketName: "",
    });
  }

  // _onSelectLaunchSite(value) {
  //   this.setLauchSite(value);
  // }

  // _onSelectRocket(value) {
  //   this.setRocketName(value);
  // }

  setLauchSite = (fLauchSite) => {
    this.setState({ fLauchSite });
  };

  setRocketName = (fRocketName) => {
    this.setState({ fRocketName });
  };

  callbackFunctionLaunchSite = (childData) => {
    this.setLauchSite(childData);
  };

  callbackFunctionRocket = (childData) => {
    this.setRocketName(childData);
  };

  render() {
    const {
      result,
      launch_sites,
      rockets,
      fLauchSite,
      fRocketName,
      isLoading,
      done,
    } = this.state;

    // const defaultOption1 = launch_sites[4];
    // const defaultOption2 = rockets[3];

    let filteredResults = result.filter((rocket) => {
      if (
        (fLauchSite && fRocketName == null) ||
        (fLauchSite && fRocketName === "")
      )
        return rocket.launch_site.site_name.includes(fLauchSite);
      else if (
        (fRocketName && fLauchSite == null) ||
        (fRocketName && fLauchSite === "")
      )
        return rocket.rocket.rocket_name.includes(fRocketName);
      else if (fLauchSite === "" && fRocketName === "") return rocket;
      else {
        return (
          rocket.launch_site.site_name.includes(fLauchSite) &&
          rocket.rocket.rocket_name.includes(fRocketName)
        );
      }
    });

    let sortedLaunches = filteredResults
      .slice()
      .sort((a, b) => b.launch_year - a.launch_year);
    sortedLaunches = sortedLaunches.sort(
      (a, b) => b.launch_date_unix - a.launch_date_unix
    );

    return (
      <Fragment>
        <center>
          <div className="news-page">
            <div className="news-body">
              {!done ? (
                <h1>Launches</h1>
              ) : (
                <h1>Launches {filteredResults.length}</h1>
              )}
              {/* 
        < Filter
              launch_sites={launch_sites}
              rockets={rockets}
          /> */}
              {!isLoading ? (
                // <div className="loading-skeleton">
                <div className="card">
                  <div className="card-content">
                    <div className="card-avatar-text">
                      <div className="load-wraper">
                        <div className="activity"></div>
                      </div>
                    </div>
                    <div className="card-avatar-text">
                      <div className="load-wraper">
                        <div className="activity"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // </div>
                <Fragment>
                  <div className="grid_container_filter">
                    <div className="item launch__text">
                      <p>Launch Site</p>
                    </div>
                    <div className="item rocket__text">
                      <p>Rocket</p>
                    </div>
                    <div className="item launch__ddl">
                      <DropdownCustom
                        title="Select a Launch"
                        list={launch_sites}
                        // onChange={this._onSelectLaunchSite.bind(this)}
                        parentCallback={this.callbackFunctionLaunchSite}
                      />
                    </div>
                    <div className="item rocket__ddl">
                      <DropdownCustom
                        title="Select a Rocket"
                        list={rockets}
                        // onChange={this._onSelectLaunchSite.bind(this)}
                        parentCallback={this.callbackFunctionRocket}
                      />
                    </div>
                  </div>
                </Fragment>
              )}

              {!done ? (
                <center>
                  <div>
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image">
                          <div className="load-wraper">
                            <div className="activity"></div>
                          </div>
                        </div>

                        <div className="card-avatar-text">
                          <div className="load-wraper">
                            <div className="activity"></div>
                          </div>
                          <br />
                          <div className="load-wraper">
                            <div className="activity"></div>
                          </div>
                          <br />
                          <div className="load-wraper">
                            <div className="activity"></div>
                          </div>
                        </div>
                      </div>

                      {/* <div class="card-content">
                      <div class="card-avatar">
                        <div class="load-wraper circular">
                          <div class="activity"></div>
                        </div>
                      </div>
                      <div class="card-avatar-text">
                        <div class="load-wraper">
                          <div class="activity"></div>
                        </div>
                      </div>
                    </div> */}
                    </div>

                    {/* <br />
                  <img src={process.env.PUBLIC_URL + '/preloader.gif'} alt="loading" /> */}
                  </div>
                </center>
              ) : filteredResults.length <= 0 ? (
                <p>Nothing found...</p>
              ) : (
                <Container launches={sortedLaunches} />
              )}
            </div>
          </div>
        </center>
      </Fragment>
    );
  }
}
