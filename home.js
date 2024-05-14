function calculateAndDisplay() {
    var currentURL = window.location.href;
    var targetURL = "https://www.alfafrens.com/";
    if (currentURL === targetURL) {
    var totalExpenseSpan = document.querySelector('span[data-testid="total-expense"]');
    var totalDifferenceSpan = document.querySelector('span[data-testid="total-difference"]');
    var dailyEarningSpan = document.querySelector('span[data-testid="daily-earning"]');
    if (totalExpenseSpan && totalDifferenceSpan && dailyEarningSpan) {
        console.log("Span elements already exist. Skipping calculation.");
        return;
    }
    var seeMoreButton = document.querySelector('button.whitespace-nowrap.font-semibold');
    if (seeMoreButton) {
        seeMoreButton.click();
        setTimeout(function() {
            var subscriptionList = document.getElementById('subs-list');
            if (subscriptionList) {
                var subscriptionItems = subscriptionList.querySelectorAll('a.flex.flex-col');
                var totalDEGEN = 0;
                subscriptionItems.forEach(function(item) {
                    var text = item.textContent;
                    var subscriptionPriceElement = item.querySelector('span[data-testid="channel-subscription-price"]');
                    if (subscriptionPriceElement) {
                        var subscriptionPriceText = subscriptionPriceElement.textContent;
                        var regex = /(\d+) DEGEN/;
                        var match = subscriptionPriceText.match(regex);
                        if (match) {
                            var subscriptionPrice = parseInt(match[1]);
                            totalDEGEN += subscriptionPrice;
                        }
                    }
                });
                var closeButton = document.querySelector('button[data-testid="close-subscribers-modal-button"]');
                if (closeButton) {
                    closeButton.click();
                    var totalExpenseSpan = document.createElement('span');
                    totalExpenseSpan.textContent = "Total Subscription Fee: " + totalDEGEN + " DEGEN";
                    totalExpenseSpan.setAttribute("data-testid", "total-expense");
                    totalExpenseSpan.classList.add('text-xs', 'text-gray-light', 'font-medium', 'font-mono', 'min-h-[20px]');
                    var superTokenBalanceContainer = document.querySelector('div[data-testid="super-token-balance-container"]');
                    if (superTokenBalanceContainer) {
                        superTokenBalanceContainer.appendChild(totalExpenseSpan);
                        var lineBreak = document.createElement('br');
                        superTokenBalanceContainer.appendChild(lineBreak);
                        var currentBalance = parseFloat(document.querySelector('span[data-testid="super-token-balance"]').textContent);
                        var totalDifference = currentBalance - totalDEGEN;
                        var totalDifferenceSpan = document.createElement('span');
                        totalDifferenceSpan.textContent = "Total Difference: " + totalDifference + " DEGEN";
                        totalDifferenceSpan.setAttribute("data-testid", "total-difference");
                        totalDifferenceSpan.classList.add('text-xs', 'text-gray-light', 'font-medium', 'font-mono', 'min-h-[20px]');
                        superTokenBalanceContainer.appendChild(totalDifferenceSpan);
                        var lineBreak2 = document.createElement('br');
                        superTokenBalanceContainer.appendChild(lineBreak2);
                        var dollarAmountElement = document.querySelector('span[data-testid="fiat-amount"]');
                        var dollarAmount = parseFloat(dollarAmountElement.textContent.replace('$', ''));
                        var superTokenBalance = parseFloat(document.querySelector('span[data-testid="super-token-balance"]').textContent);
                        var degenValueInDollars = dollarAmount / superTokenBalance;
                        var dailyEarning = totalDifference / 30;
                        var dailyEarningInDollars = (dailyEarning * degenValueInDollars).toFixed(2);
                        var dailyEarningSpan = document.createElement('span');
                        dailyEarningSpan.textContent = "Daily Earnings: " + dailyEarning.toFixed(2) + " DEGEN (" + dailyEarningInDollars + " $)";
                        dailyEarningSpan.setAttribute("data-testid", "daily-earning");
                        dailyEarningSpan.classList.add('text-xs', 'text-gray-light', 'font-medium', 'font-mono', 'min-h-[20px]');
                        superTokenBalanceContainer.appendChild(dailyEarningSpan);
                    } else {
                        console.log("Super token balance container not found!");
                    }
                } else {
                    console.log("Close button not found!");
                }
            } else {
                console.log("Subscription list not found!");
            }
        }, 100);
    } else {
        console.log("SEE MORE button not found!");
    }
         } else {
        console.log("Script can run only Home");
    }
}
setInterval(calculateAndDisplay, 1000);
