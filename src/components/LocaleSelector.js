// Core
import React, { Component } from "react";
import { Button } from "reactstrap";
import classnames from "classnames";
// Context
import { LocalizationContext } from "../providers/Localization";

export class LocaleSelector extends Component {
  static contextType = LocalizationContext;

  render() {
    const { currentColumn, locales, top, bottom, changeLocale } = this.context;

    const topBottomArrow = classnames({
      "cui-arrow-top": top,
      "cui-arrow-bottom": bottom,
      icons: true,
      "font-xs": true
    });

    return (
      <>
        {locales.map(locale => (
          <th scope="col" key={locale}>
            <Button
              style={{
                minWidth: "80px",
                padding: 0,
                fontWeight: "bold",
                textAlign: "start",
                background: "transparent",
                border: 0
              }}
              onClick={() => changeLocale(locale)}
            >
              {/* className={getBtnClass(locale, currentLocale)} */}
              {locale}{" "}
              <i className={currentColumn === locale ? topBottomArrow : ""} />
            </Button>
          </th>
        ))}
      </>
    );
  }
}

export default LocaleSelector;
