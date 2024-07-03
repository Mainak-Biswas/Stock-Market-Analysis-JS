import { displayChartForTime } from "./chart.js";
import { displaySummary } from "./summary.js";
import { displayStocksList } from "./stockList.js";

//Async Await to fetch data from the server based on api url provided
async function getData(api) {
    loading = true;
    try {
        const response = await fetch(api);
        const data = await response.json();
        loading = false;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//Colors
export const colorPrimary = "rgb(0, 207, 138)";

//Loading element displayed before the data is loaded
let loading = true;
const loadingsign = document.createElement("div");
loadingsign.id = "loading";
loadingsign.textContent = "Loading...";
if (loading) {
    document.body.appendChild(loadingsign);
}

//All the stocks
export const Stocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "PYPL", "TSLA", "JPM", "NVDA", "NFLX", "DIS"];

//Basic data of the stocks
export const stocks_data = await getData("https://stocks3.onrender.com/api/stocks/getstockstatsdata");

//We are not fetching summary as it must be on demand not preloaded as preloaded data can slow the page
export const stocks_summary = await getData(`https://stocks3.onrender.com/api/stocks/getstocksprofiledata`);

// Chart data initial load
export const chart_data = await getData("https://stocks3.onrender.com/api/stocks/getstocksdata");

//After data has been loaded removing the loading element
if (!loading) {
    document.body.removeChild(loadingsign);
}

// Setting current stock to display on screen
export const initialStock = Stocks[0];
//Calling function to display the stocks in the list
displayStocksList();
//Calling function to display summary of the current stock
displaySummary(initialStock);
//Calling function to display chart of the current stock without current timeframe input
displayChartForTime(initialStock);
