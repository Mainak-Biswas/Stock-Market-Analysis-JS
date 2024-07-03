import { stocks_data, Stocks, colorPrimary, initialStock } from "./script.js";
import { displaySummary } from "./summary.js";
import { displayChartForTime } from "./chart.js";

//Function to display the list of all the stocks with their data
export function displayStocksList() {
    // Unordered List of stocks to list all the stocks ... all the stocks are clickable
    const stock_list_el = document.getElementById("stock_list");
    Stocks.forEach(stock => {
        // Getting the data of a each stock particularly
        const data = stocks_data.stocksStatsData[0][stock];

        // Booking value and profit
        const bookValue = data.bookValue;
        const profit = data.profit;

        // Creating a clickable list
        const liItem = document.createElement("li");

        const listBtn = document.createElement("button");
        listBtn.classList.add("stock_list_btn");
        listBtn.textContent = stock;
        listBtn.onclick = () => {
            displaySummary(stock);
            displayChartForTime(stock);

            // Updating active btn
            const btns = document.getElementsByClassName("stock_list_btn");

            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove("activeBtn");
            }
            listBtn.classList.add("activeBtn");
        };
        liItem.appendChild(listBtn);

        const bookValueEl = document.createElement("span");
        bookValueEl.className = "bookValue";
        bookValueEl.textContent = "$" + bookValue;
        liItem.appendChild(bookValueEl);

        const profitEl = document.createElement("span");
        profitEl.className = "profit";
        profitEl.textContent = profit + "%";
        profitEl.style.color = profit > 0 ? colorPrimary : "red";
        liItem.appendChild(profitEl);

        stock_list_el.appendChild(liItem);

        // Only for the 1st time rendering to mark the initial stock
        if (stock == initialStock) listBtn.classList.add("activeBtn");
    });
}
