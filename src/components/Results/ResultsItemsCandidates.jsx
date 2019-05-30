import React from "react";
import noAvatar from "../../assets/img/no_avatar.png";
import s from "./Results.module.css";

const ResultsItemsCandidates = ({ candidates }) => {
  return (
    <li className={s.Item_candidates}>
      <img src={noAvatar} alt={candidates.name} />
      <p>{candidates.name}</p>
      <p>{candidates.platform}</p>
      <p>{candidates.phone}</p>
      <p>{candidates.email}</p>
      <p>{candidates.skype}</p>
    </li>
  );
};

export default ResultsItemsCandidates;
