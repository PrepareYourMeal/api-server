import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }


}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,

};


export default UsersByDevice;
