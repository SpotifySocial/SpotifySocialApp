import React from 'react';
import CanvasJSReact from '../../canvasjs.react';

import './MusicBuddies.scss';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MusicBuddies() {

  const options = {
    animationEnabled: true,
    backgroundColor: null,
    axisX: {
      labelFontColor: "#ecebe8",
      lineColor: "transparent",
      reversed:  true,
      tickThickness: 0
    },
    axisY: {
      gridThickness: 0,
      lineColor: "transparent",
      maximum: 100,
      tickThickness: 0,
      labelFormatter: function() {
        return " ";
      }
    },
    dataPointWidth: 40,
    data: [{
      type: "bar",
      color: "#62d36e",
      indexLabel: "{y}%",
      indexLabelFontColor: "#ecebe8",
      toolTipContent: "{label}: {y}%",
      dataPoints: [
          { y: 78, label: "Jane" },
          { y: 65, label: "John" },
          { y: 44, label: "Jill" },
          { y: 32, label: "Jess" },
          { y: 16, label: "Jack" }
      ]
    }]
   }

   return (
      <div class="music-buddies">
        <p className="music-buddies--header">
          Your top music buddy is Jane Doe who has a 76% similarity quotient
        </p>
        <div class="music-buddies--chart">
          <CanvasJSChart options = {options} />
        </div>
      </div>
    );
}

export default MusicBuddies;
