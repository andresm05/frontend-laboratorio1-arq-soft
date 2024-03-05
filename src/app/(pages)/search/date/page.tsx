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
    <section className="flex items-center justify-center h-screen">
      <div className="flex w-full justify-between mx-auto">
        <div className="flex flex-col dark:bg-gray-900 p-8 bg-gray-100 rounded-lg justify-center">
          <div className="flex flex-col space-y-4 items-center justify-center">
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
          <div className="flex mx-auto justify-center mt-8">
            <RequestButton title="Buscar vuelos" method={handleSearchFlightsByDate} />
          </div>
        </div>
        <div className="flex items-center w-full justify-center mx-auto">
          {flights.length == 0 && (
            <div className="flex items-center justify-center h-screen w-full">
              <h1 className="text-2xl font-bold dark:text-gray-200">
                <Alert severity="info">No hay elementos en la lista</Alert>
              </h1>
            </div>
          )}
          <div className="flex flex-wrap w-full justify-center my-8 h-screen">

          {flights.map((flight) => (
            <div
              key={flight.id}
              className="flex flex-col m-4 items-center justify-center"
            >
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Aerolínea: ${flight.airline}`}</h1>
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Origen: ${flight.origin}`}</h1>
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Destino: ${flight.destination}`}</h1>
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Fecha de salida: ${flight.departureDate}`}</h1>
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Fecha de llegada: ${flight.arrivalDate}`}</h1>
              <h1 className="text-2xl font-bold dark:text-gray-200">{`Precio: ${flight.price}`}</h1>
            </div>
          ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default DateFilterPage;
