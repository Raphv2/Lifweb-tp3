async function getData(lat, lon){
    try{
        let response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`);
        let data = await response.json();
        let firstForecast = data?.properties?.timeseries?.[0];
        if(firstForecast){
            let temperature = firstForecast.data.instant.details.air_temperature;
            let symbol = firstForecast.data.next_1_hours.summary.symbol_code;

            return {temperature, symbol};
        }
    }catch (error){
        console.error("erreur avec api:" , error);
    }

}

async function getCoord(name){
    try{
        let response = await fetch(`https://data.geopf.fr/geocodage/search?q=${name}`);
        let data = await response.json();
        let firstForecast = data.features[0];
        if(firstForecast){
            const coord = firstForecast.geometry.coordinates;
            return coord;
        }
    }catch (error){
        console.error("erreur avec api:" , error);
    }

}

