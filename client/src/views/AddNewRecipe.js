import React from "react";
import { Container, Row, Col } from "shards-react";

import Editor from "../components/add-new-recipe/Editor";
import SidebarActions from "../components/add-new-recipe/SidebarActions";
import SidebarCategories from "../components/add-new-recipe/SidebarCategories";

const AddNewRecipe = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      {/* <PageTitle sm="4" title="Add New Recipe" subtitle="Recipes" className="text-sm-left" /> */}
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <Editor />
      </Col>


    </Row>

    <h1>Add New Recipe</h1>;

  </Container>
);

export default AddNewRecipe;
