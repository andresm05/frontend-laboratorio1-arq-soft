"use client";

import { FlightApi } from "@/api/FlightApi";
import { FlightCard } from "@/components/FlightCard";

import MainContainer from "@/components/MainContainer";
import { NavButton } from "@/components/NavButton";
import { RequestButton } from "@/components/RequestButton";
import SideBar from "@/components/SideBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Flight } from "@/types/Flight.types";
import { Alert } from "@mui/material";
import React, {FormEvent, useState } from "react";
import Swal from "sweetalert2";

const AirlineFinder = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByAirline = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //get airline from input form
    const airline = event.currentTarget.airline.value;
    try {
      const {data} = await FlightApi.get<Flight[]>("/search/airline", {
        params: {
          airline: airline,
        },
      });

      if (data) {
        // Comprobación de si 'data' está definido en la respuesta
        setFlights(data);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los vuelos",
        icon: "error",
      });
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          <div className=" w-full ">
            <div className="flex justify-between">
              <NavButton title="Volver" path="/" back={true} />
              <ThemeSwitch />
            </div>

            <div className="m-5">
              <form onSubmit={handleSearchFlightsByAirline}>
                <input
                  className="block p-1 text-sm text-gray-900 bg-sky-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-200 "
                  type="text"
                  required
                  name="airline"
                  placeholder="Aerolínea"
                />
                <div className="flex mx-auto justify-center mt-8 ">
                  <RequestButton
                    title="Buscar vuelos"
                    isForm={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </SideBar>
        <MainContainer>
          {flights.length == 0 && (
            <div className="flex items-center justify-center h-screen w-full">
              <h1 className="text-2xl font-bold dark:text-gray-200 ml-4">
                <Alert severity="info">No hay elementos en la lista</Alert>
              </h1>
            </div>
          )}
          <div className="flex flex-wrap w-full justify-center my-8 ">
            {flights.map((flight) => (
              <FlightCard flight={flight} key={flight.id} />
            ))}
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default AirlineFinder;
