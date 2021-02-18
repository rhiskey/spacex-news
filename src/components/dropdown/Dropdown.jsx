import React, { Fragment } from "react";
import "./Dropdown.css";
class DropdownCustom extends React.Component {
  sendData = (e) => {
    let { name, value } = e.target;
    this.props.onChange(value);
    console.log(name);
  };

  render() {
    const { list } = this.props;
    // const defValue = list[0];

    return (
      <Fragment>
        <div>
          <select
            defaultValue="none"
            onChange={this.sendData}
          >
            <option value="none" selected disabled hidden></option> 
            {list.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </Fragment>
    );
  }
}

export default DropdownCustom;
