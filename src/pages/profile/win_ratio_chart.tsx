import Chart from "react-apexcharts";

interface WinRatioChartProps {
  numWin: number;
  numLose: number;
}

export default function WinRatioChart(props: WinRatioChartProps) {
  return (
    <Chart
      options={{
        labels: ["Win", "Lose"],
        colors: ["#22d3ee", "#3b0764"],
        plotOptions: {
          pie: {
            expandOnClick: false,
          },
        },
      }}
      series={[props.numWin, props.numLose]}
      type="donut"
      width="350"
    />
  );
}
