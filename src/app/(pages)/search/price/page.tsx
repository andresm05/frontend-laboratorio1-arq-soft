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

const PriceFinder = () => {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<number>(0); // Valor predeterminado de minPrice
  const [maxPrice, setMaxPrice] = useState<number>(10000); // Valor predeterminado de maxPrice
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByPrice = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Evitar que la página se refresque al enviar el formulario
    try {
      const response = await FlightApi.get<Flight[]>("/search/price", {
        params: {
          minimum: minPrice,
          limit: maxPrice,
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
            <form onSubmit={handleSearchFlightsByPrice}>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Precio mínimo"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Precio máximo"
              />
              <div className="flex mx-auto justify-center mt-8">
                <RequestButton
                  title="Buscar vuelos por precio"
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

export default PriceFinder;
