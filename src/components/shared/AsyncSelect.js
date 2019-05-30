import React, { Component } from "react";

import AsyncSelect from "react-select/lib/Async";
// import { colourOptions } from '../data';

// const filterColors = (inputValue: string) => {
//   return colourOptions.filter(i =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
// };

const promiseOptions = inputValues =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(inputValues);
    }, 1000);
  });

export default class WithPromises extends Component {
  render() {
    return <AsyncSelect cacheOptions isMulti loadOptions={promiseOptions} />;
  }
}
