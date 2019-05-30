// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row, TabPane } from "reactstrap";
// Components
import Tabs from "../shared/Tabs/Tabs";
import UsersTable from "./Table";
import UserCreateForm from "../User/CreateForm";
// HOC
import withModal from "../hoc/withModal";
// Context
import { ModalConsumer } from "../../providers/ModalProvider";
// Instruments
import { getUsers } from "../../utils/api/users";
import { addNewUser, deleteUserById } from "../../utils/api/user";
import { updateRecruiterForFreelancer } from "../../utils/api/freelancer";

const WithModalUserCreateForm = withModal(UserCreateForm);

const tabsForAdmin = [
  { id: "1", name: "Staff" },
  { id: "2", name: "Partners" },
  { id: "3", name: "Freelancers" }
];

const tabsForManager = [{ id: "1", name: "Freelancers" }];

export default class Users extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.number.isRequired
    }).isRequired
  };

  state = {
    staff: [],
    partners: [],
    freelancers: []
  };

  componentDidMount() {
    getUsers().then(users => {
      this.setState({ ...users });
    });
  }

  addUser = user => {
    addNewUser(user).then(createdUser => {
      if (createdUser.role_id) {
        this.checkUserRole(createdUser, createdUser.role_id);
      }
    });
  };

  checkUserRole = (user, role) => {
    console.log("user: ", user, "role: ", role);
    switch (role) {
      case 4:
        return this.setState(state => ({
          freelancers: [user, ...state.freelancers]
        }));

      case 5:
        return this.setState(state => ({
          partners: [user, ...state.partners]
        }));

      default:
        return this.setState(state => ({
          staff: [user, ...state.staff]
        }));
    }
  };

  deleteUser = id => {
    deleteUserById(id).then(users => {
      this.setState({
        ...users
      });
    });
  };

  changeRecruiterForFreelancer = content => {
    updateRecruiterForFreelancer(content);
  };

  render() {
    const { freelancers } = this.state;
    const {
      user: { role }
    } = this.props;
    const users = this.state;

    const tabPanesForAdmin = Object.keys(users).map((key, idx) => {
      const index = (idx + 1).toString();
      return key !== undefined ? (
        <TabPane tabId={index} key={key}>
          <UsersTable
            users={users[key]}
            usersGroup={key}
            onChangeRecruiter={this.changeRecruiterForFreelancer}
            onDeleteUser={this.deleteUser}
          />
        </TabPane>
      ) : (
        <p>`There are no ${key} yet. You could add a new one.`</p>
      );
    });

    return (
      <>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <ModalConsumer>
              {({ showModal }) => (
                <Button
                  color="success"
                  onClick={() =>
                    showModal(WithModalUserCreateForm, {
                      isOpenModal: true,
                      title: "New user",
                      userRole: role,
                      onAddUser: this.addUser
                    })
                  }
                >
                  <i
                    style={{ marginRight: "0.2rem" }}
                    className="fa fa-plus-circle"
                  />
                  Create
                </Button>
              )}
            </ModalConsumer>
          </Col>
        </Row>
        <Row>
          <Col>
            {role === 1 ? (
              <Tabs tabs={tabsForAdmin}>{tabPanesForAdmin}</Tabs>
            ) : (
              <Tabs tabs={tabsForManager}>
                <TabPane tabId="1">
                  {freelancers !== undefined ? (
                    <UsersTable
                      users={freelancers}
                      onDeleteUser={this.deleteUser}
                    />
                  ) : (
                    <p>
                      There are no freelancers yet. Click the button "Create"
                      above to add a new one.
                    </p>
                  )}
                </TabPane>
              </Tabs>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
