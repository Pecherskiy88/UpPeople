import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    cb(reader.result);
  };
  reader.onerror = function(error) {
    console.log("Error: ", error);
  };
};

export const descSort = arr => {
  return arr.sort((a, b) => b - a);
};

export const getSparkLineChartData = (arr, label) =>
  arr.reduce(
    (acc, value) => {
      const data = value[label]
        ? acc.data.concat(value[label])
        : acc.data.concat(0);

      return {
        data,
        label
      };
    },
    { data: [], label }
  );

export const makeSparkLineData = (
  dataSetNo,
  variant,
  sparkLineChartData,
  labels
) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label
      }
    ]
  };
  return () => data;
};

export const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false
      }
    ],
    yAxes: [
      {
        display: false
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  },
  legend: {
    display: false
  }
};
