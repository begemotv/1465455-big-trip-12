import SmartView from "./smart.js";
import {getPointTypeMoneyMap, getTransportUsageMap, getTimeSpentMap} from "../utils/stats.js";
import {generateHumanDuration} from "../utils/date-time.js";

import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const BAR_HEIGHT = 55;

const createStatsTemplate = () =>
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;

export default class Stats extends SmartView {
  constructor(points) {
    super();

    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._setCharts();
  }

  _getTemplate() {
    return createStatsTemplate();
  }

  _renderMoneyChart(moneyCtx) {
    const pointTypeMoneyMap = getPointTypeMoneyMap(this._points);

    moneyCtx.height = BAR_HEIGHT * pointTypeMoneyMap.size;

    const moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Array.from(pointTypeMoneyMap.keys()).map((name) => name.toUpperCase()),
        datasets: [{
          data: Array.from(pointTypeMoneyMap.values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    return moneyChart;
  }

  _renderTransportChart(transportCtx) {
    const transportUsageMap = getTransportUsageMap(this._points);

    transportCtx.height = BAR_HEIGHT * transportUsageMap.size;

    const transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Array.from(transportUsageMap.keys()).map((name) => name.toUpperCase()),
        // labels: [`✈️ FLY`, `???? STAY`, `???? DRIVE`, `????️ LOOK`, `???? EAT`, `???? RIDE`],
        datasets: [{
          data: Array.from(transportUsageMap.values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    return transportChart;
  }

  _renderTimeSpentChart(timeSpentCtx) {
    const timeSpentMap = getTimeSpentMap(this._points);
    timeSpentCtx.height = BAR_HEIGHT * timeSpentMap.size;
    const tmpLabels = Array.from(timeSpentMap.keys()).map((name) => name.toUpperCase());

    const timeSpentChart = new Chart(timeSpentCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: tmpLabels,
        datasets: [{
          data: Array.from(timeSpentMap.values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => {
              const tempTime = moment.duration(val);
              return (
                `${generateHumanDuration(tempTime.days(), tempTime.hours(), tempTime.minutes())}`
              );
            }
          }
        },
        title: {
          display: true,
          text: `TIME SPENT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 100
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    return timeSpentChart;
  }

  _setCharts() {
    if (this._moneyChart !== null || this._transportChart !== null || this._timeSpentChart !== null) {
      this._moneyChart = null;
      this._transportChart = null;
      this._timeSpentChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = this._renderMoneyChart(moneyCtx, this._points);
    this._transportChart = this._renderTransportChart(transportCtx, this._points);
    this._timeSpentChart = this._renderTimeSpentChart(timeSpentCtx, this._points);
  }
}
