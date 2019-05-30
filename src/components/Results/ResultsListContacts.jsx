import React from "react";
import ResultsItemsContacts from "./ResultsItemsContacts";

const ResultsListContacts = ({ contacts }) => {
  return (
    <ul>
      {contacts
        ? contacts.map((el, idx) => (
            <ResultsItemsContacts contacts={el} key={idx} />
          ))
        : []}
    </ul>
  );
};

export default ResultsListContacts;
