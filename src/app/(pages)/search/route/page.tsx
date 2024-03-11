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
import Swal from "sweetalert2";
import { FlightCard } from "@/components/FlightCard";

const RouteFinder = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  //this function will handle the search of flights by route
  const handleSearchFlightsByRoute = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Avoid page refresh

    const origin = event.currentTarget.origin.value;
    const destination = event.currentTarget.destination.value;

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
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: error.response.data,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          <div className="flex justify-between">
            <NavButton title="Volver" path="/" back={true} />
            <ThemeSwitch />
          </div>

          <div className="m-5">
            <form onSubmit={handleSearchFlightsByRoute}>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  className="block p-1 text-sm text-gray-900 bg-sky-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-200 "
                  placeholder="Origen"
                  name="origin"
                />
                <input
                  type="text"
                  className="block p-1 text-sm text-gray-900 bg-sky-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-200 "
                  placeholder="Destino"
                  name="destination"
                />
              </div>
              <div className="flex mx-auto justify-center mt-8">
                <RequestButton title="Buscar vuelos" isForm={true} />
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
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </MainContainer>
      </div>
    </div>
  );
};

export default RouteFinder;
