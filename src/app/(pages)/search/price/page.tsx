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
import { FlightCard } from "@/components/FlightCard";
import Swal from "sweetalert2";

const PriceFinder = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  //this function will handle the search of flights by price
  const handleSearchFlightsByPrice = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Avoid page refresh
    
    const minPrice = Number(event.currentTarget.minPrice.value);
    const maxPrice = Number(event.currentTarget.maxPrice.value);

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
          <div className="flex justify-between">
            <NavButton title="Volver" path="/" back={true} />
            <ThemeSwitch />
          </div>

          <div className="m-5">
            <form onSubmit={handleSearchFlightsByPrice}>
              <div className="flex flex-col space-y-4">
              <input
                className="block p-1 text-sm text-gray-900 bg-sky-50 rounded border border-sky-200 focus:ring-sky-500 focus:border-sky-200 "
                type="number"
                name="minPrice"
                defaultValue={0}
                required
                min={0}
                placeholder="Precio mínimo"
              />
              <input
                className="block p-1 text-sm text-gray-900 bg-sky-50 rounded border border-sky-200 focus:ring-sky-500 focus:border-sky-200 "
                type="number"
                name="maxPrice"
                required
                min={0}
                placeholder="Precio máximo"
              />
              </div>
              <div className="flex mx-auto justify-center mt-8">
                <RequestButton
                  title="Buscar vuelos"
                  isForm={true}
                />
              </div>
            </form>
          </div>
        </SideBar>
        <MainContainer>
          {flights.length === 0 && (
            <div className="flex items-center justify-center h-screen w-full ml-4">
              <h1 className="text-2xl font-bold dark:text-gray-200">
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

export default PriceFinder;
