![image](https://github.com/user-attachments/assets/3cde5876-e94f-4a6f-8bda-432fdd295fb1)

# Real Cost Calculator

A React application that helps users understand the true cost of a purchase by breaking it down into daily and monthly payments, calculating investment returns, and estimating the hours needed to afford the product.

## Features

- Calculate the monthly and daily costs of a purchase
- Estimate how many hours you need to work to afford the purchase based on your wage
- Calculate potential investment returns using the S&P 500 average annual return rate (10%)
- Support for both hourly and yearly wage inputs

## Technology Stack

- React
- Material-UI (MUI) components
- JavaScript


## Getting Started

To run this application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/StoyPenny/real-cost-calculator/
   cd real-cost-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` in your browser.

## Key Functionality

### Input Fields
- **Product Price**: Enter the price of the item you want to calculate.
- **Wage**: Enter your hourly or yearly wage depending on the selected wage type.
- **Wage Type**: Choose between "Hourly" or "Yearly" using a dropdown menu.

### Calculations Performed

1. **Cost Breakdown**:
   - Monthly Cost: Calculates how much you would pay monthly if you spread out the cost over different periods (from 1 month to 10 years).
   - Daily Cost: Shows how much you would pay each day based on the monthly cost.

2. **Hours Needed**:
   - Estimates how many hours you need to work at your current wage to afford the product. This calculation considers both hourly and yearly wages.

3. **Investment Return**:
   - Calculates potential returns if you invested the purchase price in the S&P 500, using an average annual return rate of 10%.

### Results Display

The results are displayed in a table format showing:
- Time Period
- Monthly Cost
- Daily Cost
- Hours Needed (if applicable)
- Investment Return

## Example Usage

1. Enter the product price (e.g., `$2499` for a new laptop).
2. Enter your wage (e.g., `50` for an hourly wage or `60,000` for a yearly wage).
3. Select "Hourly" or "Yearly" from the dropdown menu.
4. Click anywhere on the page to trigger the calculations.
5. Review the table showing different payment plans and their associated costs, hours needed, and investment
returns.

## Notes

- The investment return calculation is based on a fixed 10% annual growth rate (historical average for the S&P 500).
- All values are displayed in USD.
- The calculations are estimates for informational purposes only.

## Future Improvements

- Add more time periods beyond 10 years.
- Implement error handling for invalid inputs.
- Add data visualization charts to better understand the cost breakdown and investment returns.
- Allow users to save their calculations or export results.
- Customize what the value is based on for things other than just US Dollar (fries, Ferrari, cup of coffee, etc.)

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.
