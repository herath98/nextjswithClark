import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      series: [
        {
          name: 'Income',
          color: '#6D28D9',
          data: [1420, 1620, 1820, 1420, 1650, 2120],
        },
        {
          name: 'Expense',
          data: [788, 810, 866, 788, 1100, 1200],
          color: '#84CC16',
        },
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: 'bar',
        width: '100%',
        height: 400,
        toolbar: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '100%',
          borderRadiusApplication: 'end',
          borderRadius: 6,
          dataLabels: {
            position: 'top',
          },
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: (value: number) => {
          return '$' + value;
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
          formatter: (value: number) => {
            return '$' + value;
          },
        },
        categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
      fill: {
        opacity: 1,
      },
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
    }

    // Cleanup function to destroy the chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        ApexCharts.exec(chartRef.current.id, 'destroy');
      }
    };
  }, []);

  return <div className="dark:hover:text-black"  id="bar-chart" ref={chartRef}></div>;
};

export default BarChart;
