import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminPanel from "../Admin/AdminPanel";
import AllFlights from "./AllFlights";
import FlightList from "./FlightList";
import FlightSearch from "./FlightSearch";
import Button from "../base/Button";
import Loading from "../base/Loading";
import Swal from "sweetalert2";
import "./Flights.css";
import { searchFlights, getFlightsByCity } from "../../services/flightService";

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchParams, setSearchParams] = useState({
    departureCity: "",
    arrivalCity: "",
    flightDate: "",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "ADMIN");

      if (user.city) {
        fetchFlightsByCity(user.city);
      }
    }
  }, [navigate]);

  const fetchFlightsByCity = async (city) => {
    try {
      setIsLoading(true);
      const data = await getFlightsByCity(city);
      setFlights(data);
    } catch (error) {
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Hata!",
          text: "Uçuşlar getirilirken bir hata oluştu.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      setIsLoading(true);
      const date = new Date(searchParams.flightDate);
      const formattedDate = formatDate(date);

      const data = await searchFlights(
        searchParams.departureCity.trim(),
        searchParams.arrivalCity.trim(),
        formattedDate
      );
      setFlights(data);
    } catch (error) {
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Hata!",
          text: "Uçuşlar aranırken bir hata oluştu.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isLoading) {
      fetchFlights();
    }
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleFlightAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flights-container">
      {isLoading && <Loading />}
      <div className="header-section">
        <h2> Uçuş Arama </h2>
        <div className="header-right">
          <Button className="logout-button" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        </div>
      </div>
      <FlightSearch
        searchParams={searchParams}
        handleChange={handleChange}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
      <FlightList flights={flights} />
      {isAdmin && <AdminPanel onFlightAdded={handleFlightAdded} />}
      {isAdmin && (
        <div className="all-flights-section">
          <AllFlights refreshTrigger={refreshTrigger} />
        </div>
      )}
    </div>
  );
};

export default Flights;
