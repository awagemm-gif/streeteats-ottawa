# streeteats-ottawa
streeteats-ottawa
# StreetEats Ottawa

A live, filterable map of licensed street food vendors in Ottawa, using open data from the City of Ottawa.

## Features
- Interactive map showing all street food vendors.
- Search by vendor name or food type.
- Daily automated data updates from Open Ottawa.
- Responsive design for mobile and desktop.

## Data Source
- Vendor data from [Open Ottawa - Street Food Vendors 2025](https://open.ottawa.ca/dataset/street-food-vendors-2025).
- Cultural spaces data from [Cultural Spaces Inventory - Food](https://open.ottawa.ca/dataset/cultural-spaces-inventory-food).

## Setup and Deployment
This project is built with HTML, CSS, and JavaScript, using Mapbox for mapping and Netlify for hosting and serverless functions.

### Prerequisites
- A Mapbox account (for the map token).
- A Netlify account.

### Installation
1. Clone this repository.
2. Replace `your-mapbox-token-here` in `script.js` with your Mapbox public token.
3. Deploy to Netlify by connecting your GitHub repository.

### Automated Data Updates
The `netlify/functions/fetchVendors.js` function polls the Open Ottawa API nightly via Netlify's build hooks or scheduled functions.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
