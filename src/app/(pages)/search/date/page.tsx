"use client";
import { FlightApi } from "@/api/FlightApi";
import { NavButton } from "@/components/NavButton";
import { RequestButton } from "@/components/RequestButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Flight } from "@/types/Flight.types";
import { Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import MainContainer from "@/components/MainContainer";

const DateFilterPage = () => {
  const router = useRouter();
  const [departureDate, setDepartureDate] = useState<Dayjs>(dayjs());
  const [arrivalDate, setArrivalDate] = useState<Dayjs>(dayjs());
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByDate = async () => {
    try {
      const { data } = await FlightApi.get<Flight[]>("/search/date", {
        params: {
          startDate: departureDate.format("YYYY-MM-DD"),
          endDate: arrivalDate.format("YYYY-MM-DD"),
        },
      });
      if (data) {
        setFlights(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          <div className="flex flex-col space-y-4 items-center justify-center  h-full">
            <div className="flex justify-between w-full">
              <NavButton title="Volver" path="/" back={true} />
              <div className="flex items-center">
                <ThemeSwitch />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Fecha de salida</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="dark: bg-gray-200 rounded"
                  value={departureDate}
                  onChange={(date) => setDepartureDate(date as Dayjs)}
                />
              </LocalizationProvider>
            </div>
            <div className="flex items-center space-x-4">
              <span>Fecha de llegada</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="dark: bg-gray-200 rounded"
                  value={arrivalDate}
                  onChange={(date) => setArrivalDate(date as Dayjs)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex mx-auto justify-center mt-8 ">
            <RequestButton
              title="Buscar vuelos"
              method={handleSearchFlightsByDate}
            />
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
    </section>
  );
};

export default DateFilterPage;
