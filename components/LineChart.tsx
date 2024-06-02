import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import ApexCharts from 'apexcharts';

// Dynamically import the chart component to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart: React.FC = () => {
  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        height: "100%",
        width: "100%",
        type: "line",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        curve: 'smooth',
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26,
        },
      },
      series: [
        {
          name: "Clicks",
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: "#84CC16",
        },
        {
          name: "CPC",
          data: [6456, 6356, 6526, 6332, 6418, 6500],
          color: "#7E3AF2",
        },
      ],
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    if (document.getElementById("line-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("line-chart"), options);
      chart.render();
    }
  }, []);

  return <div className="dark:hover:text-black"  id="line-chart" />;
};

export default LineChart;
