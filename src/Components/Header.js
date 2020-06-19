import React from "react";
import Columns from "react-bulma-components/lib/components/columns";

import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <Columns className="header">
        <Columns.Column size="three-quarters">
          <h1 className="logo">Movment.</h1>
          <h2 className="logoSubtitle">Entertainment on the go</h2>
        </Columns.Column>
      </Columns>
    );
  }
}

export default Header;
