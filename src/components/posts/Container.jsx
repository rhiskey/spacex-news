import React, { Component, Fragment } from 'react';
import NewsPostClass from '../news/newsbody';
class Container extends Component {

    render() {
        return (
            <Fragment>
                {this.props.launches.map(launch =>
                    <NewsPostClass
                        key={launch.mission_name}
                        title={launch.mission_name}
                        details={launch.details}
                        date={launch.launch_date_utc}
                        image={launch.links.mission_patch_small}
                        upcoming={launch.upcoming}
                    />
                )}
            </Fragment>
        );
    }
}

export default Container;