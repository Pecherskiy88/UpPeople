// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import ActivityTableRow from "./TableRow";
import PaginationBackend from "../../shared/PaginationBackend";

const ActivityTable = ({
  logs,
  totalItems,
  pageSize,
  totalPages,
  currentPage,
  onChangePage
}) => {
  const logsJSX =
    logs.length > 0 ? (
      logs.map((log, idx) => (
        <tr key={log.logId}>
          <ActivityTableRow idx={idx} {...log} />
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
            <th scope="col">Date</th>
            <th scope="col">Action</th>
            <th scope="col">Vacancy</th>
            <th scope="col">Company</th>
          </tr>
        </thead>
        <tbody>{logsJSX}</tbody>
      </Table>
      {logs.length > 0 ? (
        <Row>
          <Col>
            <PaginationBackend
              items={logs}
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

ActivityTable.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequered,
      title: PropTypes.string,
      link: PropTypes.string
    })
  ),
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func
};

ActivityTable.defaultProps = {
  logs: [],
  currentPage: null,
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null
};

export default ActivityTable;
