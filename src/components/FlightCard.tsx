import { Flight } from "@/types/Flight.types"

export const FlightCard = ({flight}: {flight: Flight}) => {
  return (
    // This is the card that will be rendered for each flight
    <div
    key={flight.id}
    className="flex flex-col m-4 items-center justify-center bg-gray-800 rounded-lg shadow-lg p-4 text-white text-sm">
    <h1>
      <span className="font-bold">Aerolínea: </span>{" "}
      {flight.airline}
    </h1>
    <h1>
      <span className="font-bold">Origen: </span> {flight.origin}
    </h1>
    <h1>
      <span className="font-bold">Destino: </span>{" "}
      {flight.destination}
    </h1>
    <h1>
      <span className="font-bold">Fecha de salida: </span>
      {flight.departureDate.toString()}
    </h1>
    <h1>
      <span className="font-bold">Fecha de llegada: </span>
      {flight.arrivalDate.toString()}
    </h1>
    <h1>
      <span className="font-bold">Precio: </span> {flight.price}
    </h1>
  </div>
  )
}
