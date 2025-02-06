import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function App() {
  const [price, setPrice] = useState('');
  const [wage, setWage] = useState('');
  const [wageType, setWageType] = useState('hourly');

  const timePeriods = [
    { label: '1 Month', months: 1 },
    { label: '3 Months', months: 3 },
    { label: '6 Months', months: 6 },
    { label: '1 Year', months: 12 },
    { label: '2 Years', months: 24 },
    { label: '3 Years', months: 36 },
    { label: '5 Years', months: 60 },
    { label: '10 Years', months: 120 },
  ];

  const calculateCosts = () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      return null;
    }

    const parsedPrice = parseFloat(price);
    const parsedWage = parseFloat(wage);
    let hourlyWage = parsedWage;

    if (wageType === 'yearly') {
      hourlyWage = parsedWage / 2080;
    }

    const results = timePeriods.map(period => {
      const monthlyCost = parsedPrice / period.months;
      const dailyCost = monthlyCost / 30;
      let hoursNeeded = null;
      if (wage && !isNaN(wage) && parseFloat(wage) > 0) {
        hoursNeeded = (monthlyCost / hourlyWage).toFixed(2);
      }
      const investmentReturn = calculateInvestmentReturn(parsedPrice, period.months / 12);
      return {
        ...period,
        monthlyCost: monthlyCost.toFixed(2),
        dailyCost: dailyCost.toFixed(2),
        hoursNeeded: hoursNeeded,
        investmentReturn: investmentReturn.toFixed(2),
      };
    });
    return results;
  };

  const calculateInvestmentReturn = (principal, years) => {
    const annualReturnRate = 0.10;
    return principal * Math.pow(1 + annualReturnRate, years) - principal;
  };

  const calculateTotalHours = () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0 || !wage || isNaN(wage) || parseFloat(wage) <= 0) {
      return null;
    }

    const parsedPrice = parseFloat(price);
    const parsedWage = parseFloat(wage);
    let hourlyWage = parsedWage;

    if (wageType === 'yearly') {
      hourlyWage = parsedWage / 2080;
    }

    const hoursNeeded = parsedPrice / hourlyWage;
    return hoursNeeded.toFixed(2);
  };

  const costs = calculateCosts();
  const totalHoursNeeded = calculateTotalHours();

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Cost Calculator
      </Typography>
      <Typography variant="body1" paragraph>
        This tool helps you understand the true cost of a purchase by breaking it down into daily and monthly payments. It also shows how much you could have made by investing that money instead, and how many hours you need to work to afford it. Enter the product price and your wage to get started.
      </Typography>
      <div className="input-container">
        <div className="input-group">
          <TextField
            label="Product Price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="input-group">
          <FormControl fullWidth margin="normal">
            <InputLabel>Your Wage</InputLabel>
            <TextField
              label="Wage"
              type="number"
              value={wage}
              onChange={e => setWage(e.target.value)}
              margin="normal"
            />
            <Select
              value={wageType}
              onChange={e => setWageType(e.target.value)}
              label="Wage Type"
            >
              <MenuItem value="hourly">Hourly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {costs && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time Period</TableCell>
                <TableCell>Monthly Cost</TableCell>
                <TableCell>Daily Cost</TableCell>
                <TableCell>Hours of Work</TableCell>
                <TableCell>S&P 500 Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costs.map((period, index) => (
                <TableRow key={index}>
                  <TableCell>{period.label}</TableCell>
                  <TableCell>${period.monthlyCost}</TableCell>
                  <TableCell>${period.dailyCost}</TableCell>
                  <TableCell>{period.hoursNeeded ? period.hoursNeeded : 'N/A'}</TableCell>
                  <TableCell>${period.investmentReturn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {totalHoursNeeded && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          This item costs {totalHoursNeeded} hours of work.
        </Typography>
      )}
    </div>
  );
}

export default App;
