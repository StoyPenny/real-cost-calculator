import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const futuristicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f0ff',
    },
    secondary: {
      main: '#4c3e98',
    },
    background: {
      default: '#0F2027',
      paper: 'rgba(20, 20, 30, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d0d0d0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    body1: {
      fontSize: '1.1rem',
    },
  },
});

const ContainerBox = styled(Box)(({ theme }) => ({
  background: 'radial-gradient(circle at top, #2f265f , #0b1314)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const InputContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
}));

const FieldWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: { // Switch to row on medium and larger screens
    flexDirection: 'row',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(11, 19, 20, 0.36)',
  backdropFilter: 'blur(4px)',
  marginTop: theme.spacing(4),
}));

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

  const calculateInvestmentReturn = (principal, years) => {
    const annualReturnRate = 0.10;
    return principal * Math.pow(1 + annualReturnRate, years) - principal;
  };

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
    <ThemeProvider theme={futuristicTheme}>
      <ContainerBox>
        <Typography variant="h4" gutterBottom>
          Cost Calculator
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ width: '100%', maxWidth: '720px' }}>
          Discover the true cost of your purchase through futuristic analytics, including daily and monthly costs, required work hours, and even futuristic investment returns!
        </Typography>
        <InputContainer>
          <FieldWrapper>
            <TextField
              label="Product Price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: '#00f0ff' } }}
              sx={{
                input: { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#00f0ff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4c3e98',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4c3e98',
                  },
                },
              }}
            />
          </FieldWrapper>
        </InputContainer>
        <InputContainer>
          <FieldWrapper>
            <FormControl fullWidth variant="outlined">
              <TextField
                label="Your Wage"
                type="number"
                value={wage}
                onChange={e => setWage(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: '#00f0ff' } }}
                sx={{
                  input: { color: '#ffffff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#00f0ff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4c3e98',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4c3e98',
                    },
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel style={{ color: '#00f0ff' }}>Wage Type</InputLabel>
              <Select
                value={wageType}
                onChange={e => setWageType(e.target.value)}
                label="Wage Type"
                variant="outlined"
                sx={{
                  color: '#ffffff',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00f0ff',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4c3e98',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4c3e98',
                  },
                }}
              >
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </FieldWrapper>
        </InputContainer>

        {costs && (
          <StyledPaper elevation={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#00f0ff', fontWeight: 'bold' }}>Time Period</TableCell>
                    <TableCell sx={{ color: '#00f0ff', fontWeight: 'bold' }}>Monthly Cost</TableCell>
                    <TableCell sx={{ color: '#00f0ff', fontWeight: 'bold' }}>Daily Cost</TableCell>
                    <TableCell sx={{ color: '#00f0ff', fontWeight: 'bold' }}>Hours of Work</TableCell>
                    <TableCell sx={{ color: '#00f0ff', fontWeight: 'bold' }}>S&P 500 Return</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {costs.map((period, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ color: '#d0d0d0' }}>{period.label}</TableCell>
                      <TableCell sx={{ color: '#d0d0d0' }}>${period.monthlyCost}</TableCell>
                      <TableCell sx={{ color: '#d0d0d0' }}>${period.dailyCost}</TableCell>
                      <TableCell sx={{ color: '#d0d0d0' }}>
                        {period.hoursNeeded ? period.hoursNeeded : 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: '#d0d0d0' }}>${period.investmentReturn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        )}

        {totalHoursNeeded && (
          <Typography variant="body1" sx={{ mt: 4, color: '#4c3e98', fontWeight: 'bold' }}>
            This item costs {totalHoursNeeded} hours of work.
          </Typography>
        )}
      </ContainerBox>
    </ThemeProvider>
  );
}

export default App;
