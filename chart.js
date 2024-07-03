import { chart_data, colorPrimary } from "./script.js";

//Working with current time frame
let currentTimeframe = "5y";
//Function to display the chart of stock for a timeframe
export function displayChartForTime(stock, timeFrame = currentTimeframe) {
    currentTimeframe = timeFrame;
    const stock_chart_data = chart_data.stocksData[0][stock];

    //Getting time & stock value data for chart
    const timeStamps = stock_chart_data[timeFrame].timeStamp.map(timestamp => new Date(timestamp * 1000).toLocaleDateString());
    const values = stock_chart_data[timeFrame].value;

    // Adding functions to Buttons to switch between month and year
    const btn1m = document.getElementById("btn1m");
    const btn3m = document.getElementById("btn3m");
    const btn1y = document.getElementById("btn1y");
    const btn5y = document.getElementById("btn5y");

    switch (timeFrame) {
        case "1mo":
            btn1m.classList.add("activeBtn");
            btn3m.classList.remove("activeBtn");
            btn1y.classList.remove("activeBtn");
            btn5y.classList.remove("activeBtn");
            break;
        case "3mo":
            btn1m.classList.remove("activeBtn");
            btn3m.classList.add("activeBtn");
            btn1y.classList.remove("activeBtn");
            btn5y.classList.remove("activeBtn");
            break;
        case "1y":
            btn1m.classList.remove("activeBtn");
            btn3m.classList.remove("activeBtn");
            btn1y.classList.add("activeBtn");
            btn5y.classList.remove("activeBtn");
            break;
        case "5y":
            btn1m.classList.remove("activeBtn");
            btn3m.classList.remove("activeBtn");
            btn1y.classList.remove("activeBtn");
            btn5y.classList.add("activeBtn");
            break;
    }

    btn1m.onclick = () => {
        displayChartForTime(stock, "1mo");
    };

    btn3m.onclick = () => {
        displayChartForTime(stock, "3mo");
    };
    btn1y.onclick = () => {
        displayChartForTime(stock, "1y");
    };
    btn5y.onclick = () => {
        displayChartForTime(stock, "5y");
    };

    //Plot the data on chart
    plotChart(stock, timeStamps, values);
}

function plotChart(stock, timeStamps, values) {
    const canvas = document.getElementById("chartCanvas");

    const ctx = canvas.getContext("2d");
    const chartHeight = canvas.height - 50;
    const chartWidth = canvas.width;

    const dataMax = Math.max(...values) + 10;
    const dataMin = Math.min(...values) - 10;
    const dataRange = dataMax - dataMin;
    const dataStep = dataRange > 0 ? chartHeight / dataRange : 0;

    const stepX = chartWidth / (values.length - 1);

    // Clear the canvas at the beginning
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the chart
    ctx.beginPath();
    ctx.moveTo(0, chartHeight - (values[0] - dataMin) * dataStep);
    for (let i = 1; i <= values.length; i++) {
        ctx.lineTo(i * stepX, chartHeight - (values[i] - dataMin) * dataStep);
    }
    ctx.strokeStyle = colorPrimary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Show stock_value_label and x-axis value on hover
    const stock_value_label = document.getElementById("stock_value_label");
    const timeLine = document.getElementById("timeLine");

    canvas.onmousemove = event => {
        const x = event.offsetX;
        const y = event.offsetY;
        const dataIndex = Math.min(Math.floor(x / stepX), values.length - 1); // Ensure not to go out of bounds
        const stockValue = values[dataIndex].toFixed(2);
        const xAxisValue = timeStamps[dataIndex];

        stock_value_label.style.display = "block";
        stock_value_label.style.left = `${x + canvas.offsetLeft - 110}px`;
        stock_value_label.style.top = `${canvas.offsetTop - 15 + chartHeight - (values[dataIndex] - dataMin) * dataStep}px`;
        stock_value_label.textContent = `${stock}: $${stockValue}`;

        //Border case
        if (stock_value_label.offsetLeft <= canvas.offsetLeft - 40) {
            stock_value_label.style.left = `${x + canvas.offsetLeft + 10}px`;
        }

        timeLine.style.display = "block";
        timeLine.style.fontSize = "14px";
        timeLine.style.fontWeight = "bolder";
        timeLine.style.left = `${x + canvas.offsetLeft - 35}px`;
        timeLine.textContent = xAxisValue;

        // Clear the canvas except for the vertical line and data point
        ctx.clearRect(0, 0, canvas.width, chartHeight);
        ctx.clearRect(0, chartHeight + 20, canvas.width, canvas.height - chartHeight - 20);

        // Draw the chart
        ctx.beginPath();
        ctx.moveTo(0, chartHeight - (values[0] - dataMin) * dataStep);
        for (let i = 1; i < values.length; i++) {
            ctx.lineTo(i * stepX, chartHeight - (values[i] - dataMin) * dataStep);
        }
        ctx.strokeStyle = colorPrimary;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw a vertical line at the current x position when hovering over the chart
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, chartHeight);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();

        // Draw the data point as a bolder ball
        ctx.beginPath();
        ctx.arc(x, chartHeight - (values[dataIndex] - dataMin) * dataStep, 5, 0, 2 * Math.PI);
        ctx.fillStyle = colorPrimary;
        ctx.fill();
    };

    canvas.onmouseout = () => {
        stock_value_label.style.display = "none";
        timeLine.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        plotChart(stock, timeStamps, values);
    };
}
