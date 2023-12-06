
// evvent listener to run get
button.addEventListener('click', getPlanetInfo);

// Returns all info about planets
function getPlanetInfo() {

    // Searches for planets with the specific names
    axios.get('https://swapi.dev/api/planets', {
        params: {
            search: 'Alderaan',
            search: 'Tatooine',
        },

    // response to the data, saves object index of 0 (people) to data
    }).then(response => {
        const data = response.data.results[0];

        // loops over the data
        data.residents.forEach(residentURL => {

            // gets the people from each planet
            axios.get(residentURL)
                .then(residentResponse => {

                    // makes a header
                    const h2 = document.createElement('h2');

                    // sets content to the data in residents
                    h2.textContent = residentResponse.data.name;

                    // adds the h2
                    document.body.appendChild(h2);
                })
                .catch(error => {
                    console.error('Error fetching resident details:', error);
                });
            });
        
    })
    .catch(error => {
        console.error('Error fetching planet information:', error);
    });
}

getPlanetInfo();