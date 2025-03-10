document.getElementById('submit-country').addEventListener('click', function () {
    const countryName = document.getElementById('country-name').value.trim();

    if (countryName === '') {
        alert('Please enter a country name.');
        return;
    }

    document.getElementById('country-details').innerHTML = '';
    document.getElementById('border-list').innerHTML = 'No bordering countries yet.';

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0]; 
            const capital = country.capital ? country.capital[0] : 'N/A';
            const population = country.population;
            const region = country.region;
            const flag = country.flags.svg;
            const borders = country.borders || [];

    
            document.getElementById('country-details').innerHTML = `
                <strong>Country Name:</strong> ${country.name.common}<br>
                <strong>Capital:</strong> ${capital}<br>
                <strong>Region:</strong> ${region}<br>
                <strong>Population:</strong> ${population}<br>
                <strong>Flag:</strong><br>
                <img src="${flag}" alt="${country.name.common} flag" width="200px">
            `;

            
            const borderList = document.getElementById('border-list');
            if (borders.length > 0) {
                borders.forEach(borderCode => {
                    fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                        .then(response => response.json())
                        .then(borderData => {
                            const borderCountry = borderData[0];
                            const borderFlag = borderCountry.flags.svg;
                            const borderName = borderCountry.name.common;

                            borderList.innerHTML += `
                                <p>
                                    <img src="${borderFlag}" alt="${borderName} flag" width="30px">
                                    ${borderName}
                                </p>
                            `;
                        });
                });
            } else {
                borderList.innerHTML = '<p>No bordering countries.</p>';
            }
        })
        .catch(error => {
            document.getElementById('country-details').innerHTML = `<p>Error retrieving country data,Please try again.</p>`;
        });
});
