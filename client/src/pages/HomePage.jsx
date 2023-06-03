import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
  className: "container",
})``;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 24px;
`;

class FirstPage extends Component {
  render() {
    return (
      <Container>
        <WelcomeMessage>
          Welcome to Your Task Manager! Use the navigation bar to manage your
          tasks.
        </WelcomeMessage>
      </Container>
    );
  }
}

export default FirstPage;
