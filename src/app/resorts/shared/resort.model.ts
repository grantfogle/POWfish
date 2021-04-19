export class Resort {
    public name: string;
    public city: string;
    public province: string;
    public country: string;
    public latitude: string;
    public longitude: string;
    public description: string;
    public rating: number;
    public imagePath: string;
    public snowInInches: number;
    public skiPasses: string;
    public liftPassCost: number;

    constructor(name: string,
        country: string,
        city: string,
        province: string,
        rating: number,
        description: string,
        imagePath: string,
        skiPasses: string,
        snowInInches: number) {

        this.name = name;
        this.city = city;
        this.province = province;
        this.country = country;
        this.rating = rating;
        this.description = description;
        this.imagePath = imagePath;
        this.skiPasses = skiPasses;
        this.snowInInches = snowInInches;
    }
}

export class Resort2 {
    name: string;
    city: string;
    province: string;
    country: string;
    latitude: string;
    longitude: string;
    website: string;
    description: string;
    coverImage: string;
    logo: string;
    cardImage: string;
    stats: ResortStats;
    terrainBreakdown: TerrainBreakdown;
}

export class ResortStats {
    adultFullDayTicketInUSD: ResortStatsObj;
    bestTimeToVisit: ResortStatsObj;
    bikePark: ResortStatsObj;
    lifts: ResortStatsObj;
    nearestAirportInMiles: ResortStatsObj;
    skiableAcres: ResortStatsObj;
    skiPasses: ResortStatsObj;
    sideCountryAccess: ResortStatsObj;
    snowPerYearInInches: ResortStatsObj;
    terrainParks: ResortStatsObj;
    trails: ResortStatsObj;
    verticalFeet: ResortStatsObj;
}

export class TerrainBreakdown {
    advTerrainPercentage: ResortStatsObj;
    begTerrainPercentage: ResortStatsObj
    intTerrainPercentage: ResortStatsObj;
    exTerrainPercentage: ResortStatsObj;
}

export class ResortStatsObj {
    label: string;
    value: any;
}