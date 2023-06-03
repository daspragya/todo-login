import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../api";

const Collapse = styled.div.attrs({
  className: "collapse navbar-collapse",
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto",
})``;

const Item = styled.div.attrs({
  className: "ml-auto",
})`
  display: flex;
  align-items: center;
`;

function Links() {
  const handleLogout = () => {
    if (window.confirm("Do you want to Logout?")) {
      logout();
      window.location.href = `/`;
    }
  };

  return (
    <React.Fragment>
      <Link to="/" className="navbar-brand">
        TODO Application
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to="/items/list" className="nav-link">
              List All Tasks
            </Link>
          </Item>
          <Item>
            <Link to="/items/create" className="nav-link">
              Create a Task
            </Link>
          </Item>
          <Item>
            <Link to="#" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </Item>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default Links;
