swapiData('http://swapi.co/api/planets/', 'p')


function planetData(planet) {
    this.name = planet.name;
    this.diameter = planet.diameter;
    this.climate = planet.climate;
    this.gravity = planet.gravity;
    this.terrain = planet.terrain;
    this.surface_water = planet.surface_water;
    this.population = planet.population;
    this.residents = planet.residents;

