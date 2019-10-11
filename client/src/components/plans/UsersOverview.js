import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";


class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }


}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,

};


export default UsersOverview;
