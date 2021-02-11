import React, { Component, Fragment } from "react";
import Container from "./Container";
import Filter from "./Filter";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import './Launch.css';
// import Skeleton from '@material-ui/lab/Skeleton';


export class News extends Component {
  state = {
    result: [],
    launch_sites: [],
    rockets: [],
    fLauchSite: "",
    fRocketName: "",
    isLoading: undefined,
    done: undefined
  };

  componentDidMount() {
    let self = this;
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

  setNews = (result) => {
    this.setState({ result });

    const launch_sites = [...new Set(result.map((x) => x.launch_site.site_name))];
    this.setState({ launch_sites });

    const rockets = [...new Set(result.map((x) => x.rocket.rocket_name))];
    this.setState({ rockets });

    let extendedR = this.state.rockets.slice();
    extendedR.push("All");
    this.setState({ rockets: extendedR });

    let extendedL = this.state.launch_sites.slice();
    extendedL.push("All");
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
      isLoading,
      done
    } = this.state;
    console.log('loading?', isLoading)
    console.log('done?', done);
    // const filteredLaunches = result.filter((rocket) => 
    //   rocket.launch_site.site_name == fLauchSite.value
    // );
    // const filteredRockets= result.filter((rocket) => 
    //   rocket.rocket.rocket_name == fRocketName.value
    // );
    const defaultOption1 = launch_sites[4];
    const defaultOption2 = rockets[3];

    var filteredResults = result.filter(
      rocket => {
        if ((fLauchSite.value && fRocketName.value == null) || (fLauchSite.value && fRocketName.value == "All"))
          return rocket.launch_site.site_name.includes(fLauchSite.value);
        else if ((fRocketName.value && fLauchSite.value == null) || (fRocketName.value && fLauchSite.value == "All"))
          return rocket.rocket.rocket_name.includes(fRocketName.value)
        else if ((fLauchSite.value == null && fRocketName.value == null) || ((fLauchSite.value == "All" && fRocketName.value == "All")))
          return rocket
        else {
          return rocket.launch_site.site_name.includes(fLauchSite.value) &&
            rocket.rocket.rocket_name.includes(fRocketName.value)
        }
      }
    );

    filteredResults = filteredResults.sort(function (a, b) {
      return a.launch_date_utc.localeCompare(b.launch_date_utc);
    });


    return (
      <Fragment>
        <center>
          <div className="news-page">
            <div >
              <h1>Launches {filteredResults.length}</h1>
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
                      <td width="300px">
                        {" "}
                        <Dropdown
                          options={launch_sites}
                          onChange={this._onSelectLaunchSite.bind(this)}
                          placeholder="Select a Launch Site"
                          value={defaultOption1}
                        />
                      </td>
                      <td width="300px">
                        <Dropdown
                          options={rockets}
                          onChange={this._onSelectRocket.bind(this)}
                          placeholder="Select a Rocket"
                          value={defaultOption2}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Fragment>
              {!this.state.done ? (<div>Loading...<br/><img src={process.env.PUBLIC_URL + '/preloader.gif'} /></div>/*<Skeleton variant="rect" width={800} height={300} />*/) : (<Container launches={filteredResults} />)}
            </div>
          </div>
        </center>
      </Fragment>
    );
  }
}
