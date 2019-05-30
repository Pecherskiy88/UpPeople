import React, { Component, createContext } from "react";

export const LocalizationContext = createContext({
  currentColumn: "",
  locales: [],
  sort: null,
  top: true,
  bottom: false,
  changeLocale: () => null
});

export default class Localization extends Component {
  static Consumer = LocalizationContext.Consumer;

  state = {
    currentColumn: "",
    locales: this.props.locales,
    sort: null,
    top: true,
    bottom: false
  };

  changeLocale = locale => {
    const { onSort } = this.props;

    if (this.state.currentColumn !== locale) {
      this.setState(
        {
          currentColumn: locale,
          sort: 0,
          top: false,
          bottom: true
        },
        () => {
          const { currentColumn, sort } = this.state;

          const sorted = {
            currentColumn,
            sort
          };

          onSort(sorted);
        }
      );
    } else {
      const reversedSort = this.state.sort === 0 ? 1 : 0;

      this.setState(
        state => ({
          currentColumn: locale,
          sort: reversedSort,
          top: !state.top,
          bottom: !state.bottom
        }),
        () => {
          const { currentColumn, sort } = this.state;

          const sorted = {
            currentColumn,
            sort
          };

          onSort(sorted);
        }
      );
    }
  };

  render() {
    return (
      <LocalizationContext.Provider
        value={{ ...this.state, changeLocale: this.changeLocale }}
      >
        {this.props.children}
      </LocalizationContext.Provider>
    );
  }
}
