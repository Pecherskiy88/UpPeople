import React, { Component } from "react";
import Calendar from "../../shared/Calendar";
import { getEventsForCalendar } from "../../../utils/api";

export default class CalendarPage extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    getEventsForCalendar().then(events =>
      this.setState({
        events
      })
    );
  }

  render() {
    const { events } = this.state;
    console.log(events);
    return <Calendar events={events} />;
  }
}
