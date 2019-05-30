// Core
import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";
// Instruments
import noAvatar from "../../assets/img/no_avatar.png";

const UserInfo = ({
  avatar,
  name,
  phone,
  email,
  onAvatarSelect,
  onAvatarUpload
}) => (
  <Card>
    <CardBody style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <CardImg
          top
          style={{
            width: 150,
            height: 150
          }}
          src={avatar !== null ? avatar : noAvatar}
          alt="avatar"
        />
      </div>
      <CardTitle style={{ marginBottom: "1rem", fontSize: "1rem" }}>
        {name}
      </CardTitle>
      <Input
        type="file"
        style={{ marginBottom: "1rem" }}
        onChange={onAvatarSelect}
      />
      <Button
        color="success"
        style={{ marginBottom: "1rem" }}
        onClick={onAvatarUpload}
      >
        Upload avatar
      </Button>
      <ListGroup>
        {phone && (
          <ListGroupItem>
            Phone: <a href={`tel:${phone}`}>{phone}</a>
          </ListGroupItem>
        )}
        {email && (
          <ListGroupItem>
            Email:{" "}
            <a href={`mailto:${email}`} target="_top">
              {email}
            </a>
          </ListGroupItem>
        )}
      </ListGroup>
    </CardBody>
  </Card>
);

UserInfo.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
  onAvatarSelect: PropTypes.func,
  onAvatarUpload: PropTypes.func
};

UserInfo.defaultProps = {
  avatar: "",
  phone: "",
  email: "",
  onAvatarSelect: () => null,
  onAvatarUpload: () => null
};

export default UserInfo;
