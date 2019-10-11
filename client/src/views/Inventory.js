/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";


class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {



    };
  }

  render() {
    const {
      PostsListOne,
      PostsListTwo,
      PostsListThree,
      PostsListFour
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <h1>Inventory</h1>;

        <Row noGutters className="page-header py-4">
        </Row>


      </Container>
    );
  }
}

export default Inventory;
