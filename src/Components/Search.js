import React from "react";

import "./Search.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  onFieldChange(event) {
    console.log("onchange child");
    const fieldValue = event.target.value;
    console.log(fieldValue);
    this.props.onChange(fieldValue);
  }

  render() {
    return (
      <input
        placeholder="Find movies, TV shows and more ..."
        className="searchField"
        onChange={this.onFieldChange.bind(this)}
      />
    );
  }
}

export default Header;
