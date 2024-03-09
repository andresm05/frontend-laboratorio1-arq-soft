"use client";
import { useState } from "react";
import { FlightApi } from "@/api/FlightApi";
import MainContainer from "@/components/MainContainer";
import { NavButton } from "@/components/NavButton";
import { RequestButton } from "@/components/RequestButton";
import SideBar from "@/components/SideBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Flight } from "@/types/Flight.types";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const RouteFinder = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByRoute = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Evitar que la página se refresque al enviar el formulario
    try {
      const response = await FlightApi.get<Flight[]>("/search/route", {
        params: {
          origin: origin,
          destination: destination,
        },
      });

      if (response.data) {
        setFlights(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          <div className="flex justify-between">
            <NavButton title="Volver" path="/" />
            <ThemeSwitch />
          </div>

          <div className="m-5">
            <form onSubmit={handleSearchFlightsByRoute}>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origen"
              />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destino"
              />
              <div className="flex mx-auto justify-center mt-8">
                <RequestButton
                  title="Buscar vuelos por ruta"
                  type="submit" // Cambiar el tipo de botón a submit
                />
              </div>
            </form>
          </div>
        </SideBar>
        <MainContainer>
          {flights.length === 0 && (
            <div className="flex items-center justify-center h-screen w-full">
              <h1 className="text-2xl font-bold dark:text-gray-200">
                <Alert severity="info">No hay elementos en la lista</Alert>
              </h1>
            </div>
          )}
          <div className="flex flex-wrap w-full justify-center my-8 ">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="flex flex-col m-4 items-center justify-center bg-gray-800 rounded-lg shadow-lg p-4 text-white text-sm">
                <h1>
                  <span className="font-bold">Aerolínea: </span>
                  {flight.airline}
                </h1>
                <h1>
                  <span className="font-bold">Origen: </span> {flight.origin}
                </h1>
                <h1>
                  <span className="font-bold">Destino: </span>
                  {flight.destination}
                </h1>
                <h1>
                  <span className="font-bold">Fecha de salida: </span>
                  {flight.departureDate}
                </h1>
                <h1>
                  <span className="font-bold">Fecha de llegada: </span>
                  {flight.arrivalDate}
                </h1>
                <h1>
                  <span className="font-bold">Precio: </span> {flight.price}
                </h1>
              </div>
            ))}
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default RouteFinder;
