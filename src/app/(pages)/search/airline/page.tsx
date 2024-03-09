"use client";

import { FlightApi } from "@/api/FlightApi";

import MainContainer from "@/components/MainContainer";
import { NavButton } from "@/components/NavButton";
import { RequestButton } from "@/components/RequestButton";
import SideBar from "@/components/SideBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Flight } from "@/types/Flight.types";
import { Alert } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AirlineFinder = () => {
  const router = useRouter();
  const [airLine, setAirLine] = useState<String>();
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByAirline = async () => {
    console.log(airLine);

    try {
      const response = await FlightApi.get<Flight[]>("/search/airline", {
        params: {
          airline: airLine,
        },
      });

      if (response.data) {
        // Comprobación de si 'data' está definido en la respuesta
        setFlights(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event: {
    target: { value: React.SetStateAction<String | undefined> };
  }) => {
    setAirLine(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          {" "}
          <div className=" w-full ">
            <div className="flex justify-between">
              <NavButton title="Volver" path="/" back={true} />

              <ThemeSwitch />
            </div>

            <div className="m-5">
              <form action="">
                <input
                  type="text"
                  value={airLine}
                  onChange={handleChange}
                  placeholder="Ingrese una aerolinea"
                />
                <div className="flex mx-auto justify-center mt-8 ">
                  {" "}
                  <RequestButton
                    className="flex mx-auto justify-center mt-8 "
                    title="Buscar vuelos"
                    method={handleSearchFlightsByAirline}
                  />
                </div>
              </form>
            </div>
          </div>
        </SideBar>
        <MainContainer>
          {flights.length == 0 && (
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

export default AirlineFinder;
