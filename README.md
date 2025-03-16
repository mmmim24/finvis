# Finance visualizing using a stock, currency & crypto dashboard

This project is a comprehensive dashboard for visualizing stock prices, cryptocurrency prices, and currency conversion rates. It is built using React and Vite, with Tailwind CSS for styling and Chart.js for data visualization.

## Table of Contents

- [Finance visualizing using a stock, currency \& crypto dashboard](#finance-visualizing-using-a-stock-currency--crypto-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [License](#license)

## Features

- **Stock Price Visualization**: View historical stock prices with interactive charts.
- **Cryptocurrency Price Visualization**: Track cryptocurrency prices over different time periods.
- **Currency Conversion**: Convert between different currencies with real-time exchange rates.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mmmim24/stock-currency-crypto-dashboard.git
    cd stock-currency-crypto-dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables:
    ```env
    VITE_TWELVE_DATA_LOCAL=<your_twelve_data_local_url>
    VITE_TWELVE_DATA_API_KEY=<your_twelve_data_api_key>
    VITE_CRYPTO_LOCAL=<your_crypto_local_url>
    VITE_CURRENCY_LOCAL=<your_currency_local_url>
    VITE_CURRENCY_LOCAL_KEY=<your_currency_local_key>
    ```

## Usage

To start the development server:
```sh
npm run dev
```
To build the project for production:
```sh
npm run build
```
To preview the production build
```sh
npm run preview
```

## Environment Variables

- `VITE_TWELVE_DATA_LOCAL`: Base URL for Twelve Data API.
- `VITE_TWELVE_DATA_API_KEY`: API key for Twelve Data API.
- `VITE_CRYPTO_LOCAL`: Base URL for cryptocurrency data(used coingecko api).
- `VITE_CURRENCY_LOCAL`: Base URL for currency conversion data(used exchangerate api).
- `VITE_CURRENCY_LOCAL_KEY`: API key for currency conversion data.

## Project Structure

```plaintext
.env
.gitignore
eslint.config.js
index.html
package.json
public/
    finvis.png
    vite.svg
README.md
src/
    App.css
    App.jsx
    assets/
        react.svg
    components/
        CryptoComponent.jsx
        CurrencyComponent.jsx
        Footer.jsx
        Header.jsx
        StockPriceComponent.jsx
    index.css
    main.jsx
vite.config.js
```


## License

This project is licensed under the MIT License. See the LICENSE file for details.

