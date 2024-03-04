export interface Flight {
    id:            number;
    airline:       string;
    origin:        string;
    destination:   string;
    departureDate: Date;
    arrivalDate:   Date;
    price:         number;
}