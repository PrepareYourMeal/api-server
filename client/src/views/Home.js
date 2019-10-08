import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";


const Home = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      {/* <PageTitle title="Welcome to Stove & Oven" subtitle="Dashboard" className="text-sm-left mb-3" /> */}
    </Row>

  
  </Container>
);

Home.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Home.defaultProps = {

  
};

export default Home;
