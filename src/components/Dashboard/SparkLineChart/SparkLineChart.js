// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Col,
  Progress,
  Row
} from "reactstrap";
import { Line } from "react-chartjs-2";
// Instruments
import { getStyle } from "@coreui/coreui-pro/dist/js/coreui-utilities";
import {
  getSparkLineChartData,
  makeSparkLineData,
  sparklineChartOpts
} from "../../../utils/selectors";

const brandPrimary = getStyle("--primary");
const brandDanger = getStyle("--danger");

const SparkLineChart = ({ title, data }) => {
  const reducingReviewInterviewStatus = arr =>
    arr.reduce(
      (acc, value) => {
        const review = value.Review ? acc.review + value.Review : acc.review;
        const interview = value.Interview
          ? acc.interview + value.Interview
          : acc.interview;

        return {
          review,
          interview
        };
      },
      { review: 0, interview: 0 }
    );

  const sparkLineData = (arr, sparkLineChartData, arrOfKeys) => {
    return arr.map((status, idx) => {
      const colorSparkLine = idx === 0 ? brandPrimary : brandDanger;

      return (
        <Col key={`${status.name}-${status.amountCandidates}`} sm="6">
          <div className="callout callout-info">
            <small className="text-muted">{status.name.toUpperCase()}</small>
            <br />
            <strong className="h4">{status.amountCandidates}</strong>
            <div className="chart-wrapper">
              <Line
                data={makeSparkLineData(
                  idx,
                  colorSparkLine,
                  sparkLineChartData,
                  arrOfKeys
                )}
                options={sparklineChartOpts}
                width={100}
                height={30}
              />
            </div>
          </div>
        </Col>
      );
    });
  };

  const chartData = (arr, objWithStatuses) =>
    arr.map(value => {
      const review = objWithStatuses[value].Review;
      const interview = objWithStatuses[value].Interview;

      return (
        <div
          className="progress-group mb-4"
          key={`${value}-${review}-${interview}`}
        >
          <div className="progress-group-prepend">
            <span className="progress-group-text">{value}</span>
          </div>
          <div className="progress-group-bars">
            <Progress
              className="progress-xs"
              color="info"
              value={String(review)}
            />
            <Progress
              className="progress-xs"
              color="danger"
              value={String(interview)}
            />
          </div>
        </div>
      );
    });

  const dataArray = Object.values(data);

  const reducedStatuses = reducingReviewInterviewStatus(dataArray);

  const { review, interview } = reducedStatuses;

  const sparkLineChartDataReview = getSparkLineChartData(dataArray, "Review");

  const sparkLineChartDataInterview = getSparkLineChartData(
    dataArray,
    "Interview"
  );

  const statuses = [
    { name: "Review", amountCandidates: review },
    { name: "Interview", amountCandidates: interview }
  ];

  const sparkLineChartData = [
    sparkLineChartDataReview,
    sparkLineChartDataInterview
  ];

  const dataKeys = Object.keys(data);

  const sparkLine = sparkLineData(statuses, sparkLineChartData, dataKeys);

  const chart = chartData(dataKeys, data);

  const legend = statuses.map((status, idx) => {
    const color = idx === 0 ? "info" : "danger";

    return (
      <div key={status.name}>
        <sup className="px-1">
          <Badge pill color={color}>
            &nbsp;
          </Badge>
        </sup>
        {status.name} &nbsp;
      </div>
    );
  });

  return (
    <Card>
      <CardHeader>{`${title} of ${moment().format("MMMM")}`}</CardHeader>
      <CardBody>
        <Row>{sparkLine}</Row>
        <hr className="mt-0" />
        {chart}
        <div className="legend text-center">
          <small style={{ display: "flex", justifyContent: "center" }}>
            {legend}
          </small>
        </div>
        <br />
      </CardBody>
    </Card>
  );
};

SparkLineChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({})
};

SparkLineChart.defaultProps = {
  title: "",
  data: {}
};

export default SparkLineChart;
