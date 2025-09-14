{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // script.js\
// 1. Set your Mapbox token\
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VtbW90dGRhdGFzdHVkaW8iLCJhIjoiY21majBoZ2ltMHFtZTJtb2x4bWl5Y3UwaSJ9.BkcVKJX44lTrjb83ADnn9A'; // REPLACE WITH YOUR ACTUAL TOKEN\
\
// 2. Initialize the map\
const map = new mapboxgl.Map(\{\
    container: 'map',\
    style: 'mapbox://styles/mapbox/streets-v11',\
    center: [-75.6972, 45.4215], // Ottawa coordinates\
    zoom: 11\
\});\
\
// 3. Add navigation controls to the map (the +/- buttons)\
map.addControl(new mapboxgl.NavigationControl());\
\
// 4. This function loads the vendor data from OUR Netlify function\
async function loadVendorData() \{\
    try \{\
        // This is the URL to our serverless function\
        const response = await fetch('/.netlify/functions/fetchVendors');\
        const data = await response.json();\
\
        if (data.error) throw new Error(data.error);\
\
        // 5. Display the last updated time\
        document.getElementById('updateDate').textContent = new Date(data.lastUpdated).toLocaleString();\
\
        // 6. Display the vendors on the map and in the list\
        displayVendors(data.vendors);\
\
    \} catch (error) \{\
        console.error("Could not load vendors:", error);\
        document.getElementById('updateDate').textContent = "Update failed. Please refresh.";\
    \}\
\}\
\
// 7. Function to display vendors\
function displayVendors(vendors) \{\
    const listContainer = document.getElementById('list-container');\
    listContainer.innerHTML = ''; // Clear loading text\
\
    vendors.forEach(vendor => \{\
        // Create a Mapbox Marker for each vendor\
        new mapboxgl.Marker()\
            .setLngLat([vendor.longitude, vendor.latitude])\
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>$\{vendor.name\}</h3><p>$\{vendor.type\}</p>`))\
            .addTo(map);\
\
        // Create a list item for each vendor\
        const vendorElement = document.createElement('div');\
        vendorElement.className = 'vendor-item';\
        vendorElement.innerHTML = `\
            <h3>$\{vendor.name\}</h3>\
            <p><strong>Serves:</strong> $\{vendor.type\}</p>\
            <p><strong>Usually at:</strong> $\{vendor.location_description\}</p>\
        `;\
        listContainer.appendChild(vendorElement);\
    \});\
\
    // 8. Simple Search Filter\
    document.getElementById('searchInput').addEventListener('keyup', function(e) \{\
        const searchTerm = e.target.value.toLowerCase();\
        const allVendorItems = document.querySelectorAll('.vendor-item');\
\
        allVendorItems.forEach(item => \{\
            const text = item.textContent.toLowerCase();\
            if (text.includes(searchTerm)) \{\
                item.style.display = 'block';\
            \} else \{\
                item.style.display = 'none';\
            \}\
        \});\
    \});\
\}\
\
// 9. Start everything when the map is fully loaded\
map.on('load', loadVendorData);}