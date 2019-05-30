// Core
import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";
import { Col, Spinner, Row, Table } from "reactstrap";
// Components
import UserRow from "./TableRow";
import PaginationFront from "../shared/PaginationFront";

export default class UsersTable extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
    ),
    onChangeRecruiter: PropTypes.func,
    onDeleteUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    users: [],
    onChangeRecruiter: () => {}
  };

  state = {
    pageOfItems: [],
    currentPage: 1
  };

  deleteUser = id => {
    const { pageOfItems } = this.state;
    const { onDeleteUser } = this.props;
    onDeleteUser(id);

    this.setState({
      pageOfItems: pageOfItems.filter(user => user.id !== id)
    });
  };

  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  render() {
    const { users, usersGroup, onChangeRecruiter } = this.props;
    const { pageOfItems, currentPage } = this.state;

    const usersJSX =
      users.length > 0 &&
      pageOfItems.map((user, idx) => (
        <UserRow
          key={user.id}
          idx={idx}
          {...user}
          usersGroup={usersGroup}
          onChangeRecruiter={onChangeRecruiter}
          onDeleteUser={() => this.deleteUser(user.id)}
        />
      ));

    const loading = () => (
      <Spinner
        color="info"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%"
        }}
      />
    );

    return (
      <Row>
        <Col>
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Role</th>
                {usersGroup === "freelancers" && <th scope="col">Recruiter</th>}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={loading()}>{usersJSX}</Suspense>
            </tbody>
          </Table>
          <PaginationFront
            items={users}
            initialPage={currentPage}
            onChangePage={this.onChangePage}
          />
        </Col>
      </Row>
    );
  }
}
