// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func
};

const defaultProps = {
  items: [],
  initialPage: 1,
  pageSize: 10,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null
};

class PaginationBackend extends Component {
  constructor(props) {
    super(props);

    this.state = { pager: {} };
  }

  componentDidMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if initialPage has changed
    if (
      this.props.initialPage !== prevProps.initialPage ||
      this.props.totalItems !== prevProps.totalItems
    ) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage = page => {
    const { totalItems, totalPages, pageSize } = this.props;

    let pager = this.state.pager;

    if (page < 1 || page > totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(totalItems, page, pageSize);

    // update state
    this.setState({ pager });

    // call change page function in parent component
    this.props.onChangePage(page);
  };

  getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };

  render() {
    let pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <Pagination className="pagination justify-content-end">
        <PaginationItem
          className="page-item"
          disabled={pager.currentPage === 1 ? true : false}
        >
          <PaginationLink className="page-link" onClick={() => this.setPage(1)}>
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="page-item"
          disabled={pager.currentPage === 1 ? true : false}
        >
          <PaginationLink
            className="page-link"
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            Previous
          </PaginationLink>
        </PaginationItem>
        {pager.pages.map((page, index) => (
          <PaginationItem
            key={index}
            className="page-item"
            active={pager.currentPage === page ? true : false}
          >
            <PaginationLink
              className="page-link"
              onClick={() => this.setPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          className="page-item"
          disabled={pager.currentPage === pager.totalPages ? true : false}
        >
          <PaginationLink
            className="page-link"
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            Next
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className="page-item"
          disabled={pager.currentPage === pager.totalPages ? true : false}
        >
          <PaginationLink
            className="page-link"
            onClick={() => this.setPage(pager.totalPages)}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

PaginationBackend.propTypes = propTypes;
PaginationBackend.defaultProps = defaultProps;

export default PaginationBackend;
