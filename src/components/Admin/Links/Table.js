// Core
import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
// Components
import LinksTableRow from "./TableRow";

const LinksTable = ({ links, onDelete }) => {
  const linksJSX =
    links.length > 0 ? (
      links.map((link, idx) => (
        <tr key={link.id}>
          <LinksTableRow idx={idx} {...link} onDelete={onDelete} />
        </tr>
      ))
    ) : (
      <tr style={{ color: "var(--secondary)" }}>
        <td colSpan={9} align="center">
          Nothing found{" "}
          <span role="img" aria-label="confused face">
            😕
          </span>
        </td>
      </tr>
    );

  return (
    <Table style={{ background: "var(--white)" }} responsive hover>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Link</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{linksJSX}</tbody>
    </Table>
  );
};

LinksTable.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequered,
      title: PropTypes.string,
      link: PropTypes.string
    })
  ),
  onDelete: PropTypes.func
};

LinksTable.defaultProps = {
  links: [],
  onDelete: () => null
};

export default LinksTable;
