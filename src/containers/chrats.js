import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Today");
  const [selectedStation, setselectedStation] = useState("1");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      
      {
        label: "Atmospheric pressure (pa)",
        data: [],
        borderColor: "rgb(200, 198, 43,0.5)",
        backgroundColor: "rgb(200, 198, 43, 0.8)",
      },

      {
        label: "Gas (K0hms)",
        data: [],
        borderColor: "rgb(0, 170, 13,0.5)",
        backgroundColor: "rgb(0, 170, 13, 0.8)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature and Humidity in Germany",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (hour)",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://albrecht.pythonanywhere.com/get_data"
        );
        const data = await response.json();
          const devicedata =    data.data.filter(item => item.device === selectedStation);


        const filteredData = devicedata.filter((entry) => {
          const entryDate = new Date(entry.date);
          const currentDate = new Date();

          if (selectedTimeRange === "Today") {
            return entryDate.toDateString() === currentDate.toDateString();
          } else if (selectedTimeRange === "Last week") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return entryDate >= oneWeekAgo;
          } else if (selectedTimeRange === "Last Month") {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            return entryDate >= lastMonth;
          } else if (selectedTimeRange === "Last Year") {
            const lastYear = new Date();
            lastYear.setFullYear(lastYear.getFullYear() - 1);
            return entryDate >= lastYear;
          }

          return false;
        });

         // Sorting the filtered data by time
         filteredData.sort((a, b) => {
          const timeA = new Date(a.date);
          const timeB = new Date(b.date);
          return timeA - timeB;
        });

        const dailyAverages = {};
        const monthlyAverages = {};

        for (const item of filteredData) {
          const date = item.date.split(" ")[0];
          const humdeg = parseFloat(item.humdeg);
          const tempdeg = parseFloat(item.tempdeg);
          const predeg = parseFloat(item.preasure);
          const gasdeg = parseFloat(item.gas);
          if (!dailyAverages[date]) {
            dailyAverages[date] = {
              totalHumdeg: humdeg,
              totalTempdeg: tempdeg,
              totalPredeg: predeg ,
              totalGasdeg:  gasdeg ,
              count: 1,
            };
          } else {
            dailyAverages[date].totalHumdeg += humdeg;
            dailyAverages[date].totalTempdeg += tempdeg;
            dailyAverages[date].totalPredeg += predeg;
            dailyAverages[date].totalGasdeg += gasdeg;
            dailyAverages[date].count++;
          }

          if (!monthlyAverages[date]) {
            const yearMonth = date.split("-").slice(0, 2).join("-");
            monthlyAverages[yearMonth] = {
              totalHumdeg: humdeg,
              totalTempdeg: tempdeg,
              totalPredeg: predeg ,
              totalGasdeg:  gasdeg ,
              count: 1,
            };
          } else {
            const yearMonth = date.split("-").slice(0, 2).join("-");
            monthlyAverages[yearMonth].totalHumdeg += humdeg;
            monthlyAverages[yearMonth].totalTempdeg += tempdeg;
            monthlyAverages[yearMonth].totalPredeg += predeg;
            monthlyAverages[yearMonth].totalGasdeg += gasdeg;

            monthlyAverages[yearMonth].count++;
          }
        }

        const dailyAverageArray = Object.entries(dailyAverages).map(
          ([date, { totalHumdeg, totalTempdeg , totalPredeg , totalGasdeg, count }]) => ({
            date: date.split("-")[2],
            averageHumdeg: totalHumdeg / count,
            averageTempdeg: totalTempdeg / count,
            averagePredeg: totalPredeg / count,
            averageGasdeg: totalGasdeg / count,

          })
        );

        const monthlyAverageArray = Object.entries(monthlyAverages).map(
          ([yearMonth, { totalHumdeg, totalTempdeg , totalPredeg , totalGasdeg, count }]) => {
            const [year, month] = yearMonth.split("-");
            return {
              year: parseInt(year, 10),
              month: parseInt(month, 10),
              averageHumdeg: totalHumdeg / count,
              averageTempdeg: totalTempdeg / count,
              averagePredeg: totalPredeg / count,
              averageGasdeg: totalGasdeg / count,
            };
          }
        );

        const tempData = filteredData.map((entry) => parseFloat(entry.tempdeg));
        const humData = filteredData.map((entry) => parseFloat(entry.humdeg));
        const presData = filteredData.map((entry) => parseFloat(entry.preasure));
        const gasData = filteredData.map((entry) => parseFloat(entry.gas));

        if (selectedTimeRange === "Last week") {
          const dailyAveragesLastWeek = {};
          for (const item of filteredData) {
            const date = item.date.split(" ")[0];
            const humdeg = parseFloat(item.humdeg);
            const tempdeg = parseFloat(item.tempdeg);
            const predeg = parseFloat(item.preasure);
            const gasdeg = parseFloat(item.gas);

            if (!dailyAveragesLastWeek[date]) {
              dailyAveragesLastWeek[date] = {
                totalHumdeg: humdeg,
                totalTempdeg: tempdeg,
                totalPredeg: predeg,
                totalGasdeg: gasdeg,
                count: 1,
              };
            } else {
              dailyAveragesLastWeek[date].totalHumdeg += humdeg;
              dailyAveragesLastWeek[date].totalTempdeg += tempdeg;
              dailyAveragesLastWeek[date].totalPredeg += predeg;
              dailyAveragesLastWeek[date].totalGasdeg += gasdeg;
              dailyAveragesLastWeek[date].count++;
            }
          }

          const dailyAverageArrayLastWeek = Object.entries(
            dailyAveragesLastWeek
          ).map(([date, { totalHumdeg, totalTempdeg,totalPredeg, totalGasdeg , count }]) => ({
            date,
            averageHumdeg: totalHumdeg / count,
            averageTempdeg: totalTempdeg / count,
            averagePredeg: totalPredeg / count,
            averageGasdeg: totalGasdeg / count,
          }));

          const labelsLastWeek = dailyAverageArrayLastWeek.map((entry) => {
            const entryDate = new Date(entry.date);

            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return days[entryDate.getDay()];
          });

          setChartData((prevData) => ({
            ...prevData,
            labels: labelsLastWeek,
            datasets: [
              {
                ...prevData.datasets[0],
                data: dailyAverageArrayLastWeek.map(
                  (entry) => entry.averageTempdeg
                ),
              },
              {
                ...prevData.datasets[1],
                data: dailyAverageArrayLastWeek.map(
                  (entry) => entry.averageHumdeg
                ),
                
              },
              {
                ...prevData.datasets[2],
                data: dailyAverageArrayLastWeek.map(
                  (entry) => entry.averagePredeg
                ),
                
              },
              {
                ...prevData.datasets[3],
                data: dailyAverageArrayLastWeek.map(
                  (entry) => entry.averageGasdeg
                ),
                
              },
            ],
          }));
        } else if (selectedTimeRange === "Last Month") {
          const labelsLastMonth = dailyAverageArray.map((entry) => entry.date);

          setChartData((prevData) => ({
            ...prevData,
            labels: labelsLastMonth,
            datasets: [
              {
                ...prevData.datasets[0],
                data: dailyAverageArray.map((entry) => entry.averageTempdeg),
              },
              {
                ...prevData.datasets[1],
                data: dailyAverageArray.map((entry) => entry.averageHumdeg),
              },
              {
                ...prevData.datasets[2],
                data: dailyAverageArray.map((entry) => entry.averagePredeg),
              },
              {
                ...prevData.datasets[3],
                data: dailyAverageArray.map((entry) => entry.averageGasdeg),
              },
            ],
          }));
        } else if (selectedTimeRange === "Last Year") {
          const labelsLastYear = monthlyAverageArray.map((entry) => {
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return `${monthNames[entry.month - 1]} ${entry.year}`;
          });

          setChartData((prevData) => ({
            ...prevData,
            labels: labelsLastYear,
            datasets: [
              {
                ...prevData.datasets[0],
                data: monthlyAverageArray.map((entry) => entry.averageTempdeg),
              },
              {
                ...prevData.datasets[1],
                data: monthlyAverageArray.map((entry) => entry.averageHumdeg),
              },
              {
                ...prevData.datasets[2],
                data: monthlyAverageArray.map((entry) => entry.averagePredeg),
              },
              {
                ...prevData.datasets[3],
                data: monthlyAverageArray.map((entry) => entry.averageGasdeg),
              },
            ],
          }));
        } else {
          const labels = filteredData.map((entry) => {
            const entryDate = new Date(entry.date);
         
            const hours = entryDate.getHours();
            const minutes = entryDate.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
          });

          setChartData((prevData) => ({
            ...prevData,
            labels: labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: tempData,
              },
              {
                ...prevData.datasets[1],
                data: humData,
              },
              {
                ...prevData.datasets[2],
                data: presData,
              },
              {
                ...prevData.datasets[3],
                data: gasData,
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedTimeRange,selectedStation]);

  return (
    <main className="charts">
      <div className="filters">
        <label>Time</label>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="Last week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Last Year">Last Year</option>
        </select>
        <label>Station</label>
        <select
          value={selectedStation}
          onChange={(e) => setselectedStation(e.target.value)}
        >
          <option value="1">Main Station</option>
          <option value="2">Second Station</option>

        
        </select>
      </div>
      <div>
        <Line options={options} data={chartData} />
      </div>
    </main>
  );
};

export default Charts;
