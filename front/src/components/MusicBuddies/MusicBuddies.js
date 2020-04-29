import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import './MusicBuddies.scss';

function MusicBuddies() {

  const buddies = {
    labels: ['Jane', 'John', 'Jill',
             'Jess', 'Jack'],
    datasets: [
      {
        backgroundColor: '#62d36e',
        data: [76, 65, 44, 32, 16],
      }
    ]
  }

   return (
      <div class="music-buddies">
        <p className="music-buddies--header">
          Your top music buddy is Jane Doe who has a 76% similarity quotient
        </p>
        <div>
          <HorizontalBar
            width={400}
            height={350}
            data={buddies}
            options={{
            legend:{
              display:false,
            },
            scales: {
              yAxes: [{
                barPercentage: 0.5,
                categoryPercentage: 1.0,
                gridLines: {
                  color: 'transparent',
                },
                ticks: {
                  fontColor: '#ecebe8',
                  fontSize: 16,
                },
              }],
              xAxes: [{
                display: false,
              }]
            },
            plugins: {
              datalabels: {
                align: 'end',
                anchor: 'end',
                color: '#ecebe8',
                formatter: function (value) {
                  return Math.round(value) + '%';
                },
                font: {
                  size: 16,
                }
              }
            }
          }}
            />
        </div>
      </div>
    );
}

export default MusicBuddies;
