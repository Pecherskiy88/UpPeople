// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import PlatformsTableRow from "./TableRow";
import PaginationBackend from "../../shared/PaginationBackend";

const PlatformsTable = ({
  platforms,
  totalItems,
  pageSize,
  totalPages,
  currentPage,
  onChangePage,
  onDelete
}) => {
  const platformsJSX =
    platforms.length > 0 ? (
      platforms.map((platform, idx) => (
        <tr key={platform.id}>
          <PlatformsTableRow idx={idx} {...platform} onDelete={onDelete} />
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
    <>
      <Table style={{ background: "var(--white)" }} responsive hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Platform</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{platformsJSX}</tbody>
      </Table>
      {platforms.length > 0 ? (
        <Row>
          <Col>
            <PaginationBackend
              items={platforms}
              totalItems={totalItems}
              pageSize={pageSize}
              totalPages={totalPages}
              initialPage={currentPage}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};

PlatformsTable.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequered,
      name: PropTypes.string
    })
  ),
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  onDelete: PropTypes.func
};

PlatformsTable.defaultProps = {
  platforms: [],
  currentPage: null,
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null,
  onDelete: () => null
};

export default PlatformsTable;
