export interface IWeatherRQ {
    metric: string;
    location: string;
    from: Date;
    to: Date;
}

export interface IWeatherRS {
    month: number;
    year: number;
    value: number;
}
