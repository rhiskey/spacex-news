import React, { Component, Fragment } from "react";
import NewsPostClass from "./item";

class Container extends Component {
  render() {
    return (
      <Fragment>
        {this.props.launches.map((launch) => (
          <NewsPostClass
            key={launch.mission_name}
            title={launch.mission_name}
            details={launch.details}
            date={launch.launch_date_utc}
            image={launch.links.mission_patch_small}
            upcoming={launch.upcoming}
            link={launch.links.article_link}
            video={launch.links.video_link}
          />
        ))}
      </Fragment>
    );
  }
}

export default Container;
