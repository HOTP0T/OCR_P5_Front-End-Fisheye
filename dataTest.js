// Fetch the JSON data
fetch('data/photographers_local.json')
    .then(response => response.json())
    .then(data => {
        // Display the JSON data on the HTML page
        const jsonDataContainer = document.getElementById('json-data');
        jsonDataContainer.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error fetching JSON:', error));
