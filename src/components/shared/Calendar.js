import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import BigCalendar from "react-big-calendar";
import moment from "moment";
// import { getEventsForCalendar } from "../../utils/api";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

const currDate = new Date();
const currYear = currDate.getFullYear();
const currMonth = currDate.getMonth();

export default class Calendar extends Component {
  state = {
    events: []
  };

  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);
    if (nextProps.events !== undefined && nextProps.events.length > 0) {
      const modifiedEvents = nextProps.events.map(event => {
        const title = event.title;
        const start = moment(event.start).toDate();
        const addHour = moment(event.start).add(1, "hour");
        const end = moment(addHour).toDate();

        return {
          title,
          start,
          end
        };
      });

      return {
        events: modifiedEvents
      };
    }

    return {
      events: []
    };
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      });
  };

  render() {
    const { events } = this.state;

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-calendar" />
            Calendar
          </CardHeader>
          <CardBody style={{ height: "40em" }}>
            <BigCalendar
              selectable
              popup
              localizer={localizer}
              // className="d-sm-down-none"
              events={events}
              views={["month", "week", "day"]}
              step={30}
              defaultDate={new Date(currYear, currMonth, 1)}
              defaultView="month"
              toolbar={true}
              onSelectEvent={event =>
                alert(
                  `Candidate: ${event.title}, Date: ${moment(
                    event.start
                  ).format("LLLL")}`
                )
              }
              onSelectSlot={this.handleSelect}
              startAccessor="start"
              endAccessor="end"
              // {...this.props}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}
