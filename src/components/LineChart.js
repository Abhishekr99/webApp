import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from "react";

// Resolves charts dependancy
charts(FusionCharts);
export default function LineChart(props) {
    console.log("propss",props);
const dataSource = {
  chart: {
    caption: "Stock Price Analysis",
    yaxisname: "Stock Price",
    subcaption: "June 2019",
    showhovereffect: "1",
    numbersuffix: " Rs",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> value of $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [...props.category]
    }
  ],
  dataset: [...props.dataset]
};


  
    return (
      <ReactFusioncharts
        type="msline"
        width="100%"
        height="250%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  
}