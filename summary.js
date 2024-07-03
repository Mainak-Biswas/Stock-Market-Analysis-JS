import { stocks_summary, stocks_data, colorPrimary } from "./script.js";
//Function to display the summary of current stock
export function displaySummary(stock) {
    const summary = stocks_summary.stocksProfileData[0][stock].summary;
    const data = stocks_data.stocksStatsData[0][stock];

    const bookValue = data.bookValue;
    const profit = data.profit;

    const nameEl = document.getElementById("stockDetName");
    nameEl.textContent = stock;

    const bookValueEl = document.getElementById("bookDetValue");
    bookValueEl.textContent = "$" + bookValue;

    const profitEl = document.getElementById("profitDet");
    profitEl.textContent = profit + "%";
    profitEl.style.color = profit > 0 ? colorPrimary : "red";

    const summaryEl = document.getElementById("summary");
    summaryEl.textContent = summary;
}
