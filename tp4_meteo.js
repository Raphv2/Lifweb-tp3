
const villesFavorites = ["Paris", "Lyon", "LAon", "Orange", "Jonquieres"];
const template = document.querySelector("#meteo-card-template");
const dashboard = document.querySelector("#meteo-dashboard");


async function main() {
    
    const meteos = document.querySelectorAll(".meteo");
    

    for(const meteo of meteos) {
        const coordonnee = document.querySelector(`#${meteo.id} .coord`).textContent.split(',');
        const lat = coordonnee[0].replace('lat:', '').trim();
        const lon = coordonnee[1].replace('lon:', '').trim();
        const temperature = document.querySelector(`#${meteo.id} .temperature`);
        const icon = document.querySelector(`#${meteo.id} .meteo-icon`);

        try{
            const result = await getData(lat, lon);
            temperature.textContent = `${result.temperature}`
            icon.data = `weathericons/svg/${result.symbol}.svg`
        }
        catch{
        }
        
    };
    for(const ville of villesFavorites){
        const meteoVilleRoot = template.content.cloneNode(true);
        const villename = meteoVilleRoot.querySelector('.ville');
        const coordonnee = meteoVilleRoot.querySelector(`.coord`);
        const temperature = meteoVilleRoot.querySelector(`.temperature`);
        const icon = meteoVilleRoot.querySelector(`.meteo-icon`);
        villename.textContent = ville;

        try{
            const truc = await getCoord(ville);
            const result = await getData(truc[1], truc[0]);
            temperature.textContent = `${result.temperature}`
            icon.data = `weathericons/svg/${result.symbol}.svg`
            coordonnee.textContent = `lat: ${truc[0]}, lon: ${truc[1]}`;
        }
        catch{

        }


        dashboard.append(meteoVilleRoot);
    }

}

main();