"use client";

import { FlightApi } from "@/api/FlightApi";

import MainContainer from "@/components/MainContainer";
import { NavButton } from "@/components/NavButton";
import SideBar from "@/components/SideBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Flight } from "@/types/Flight.types";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AirlineFinder = () => {
  const router = useRouter();
  const [departureDate, setDepartureDate] = useState<String>();
  const [arrivalDate, setArrivalDate] = useState<String>();
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleSearchFlightsByAirline = async () => {
    try {
      const { data } = await FlightApi.get<Flight[]>("/search/date", {
        params: {
          //   name: departureDate.format("YYYY-MM-DD"),
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
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="flex w-full justify-between ">
        <SideBar>
          {" "}
          <div className="flex justify-between w-full ">
            <NavButton title="Volver" path="/" back={true} />

            <ThemeSwitch />
          </div>
        </SideBar>
        <MainContainer>sx</MainContainer>
      </div>
    </div>
  );
};

export default AirlineFinder;
