// Core
import React from "react";
// HOC
import withToggleCardBody from "./hoc/withToggleCardBody";

const InnerHTMLMarkUp = ({ content }) => {
  const empty = "<p>Add information</p>";

  const createHTMLMarkup = content => {
    return content ? { __html: content } : { __html: empty };
  };

  return <div dangerouslySetInnerHTML={createHTMLMarkup(content)} />;
};

export default withToggleCardBody(InnerHTMLMarkUp);
