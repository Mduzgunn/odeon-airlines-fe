import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllFlights.css";

const AllFlights = ({ refreshTrigger }) => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllFlights();
  }, [refreshTrigger]);

  const fetchAllFlights = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await axios({
        method: "get",
        url: "http://localhost:8080/api/flights/all",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.data) {
        setFlights(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading"> Uçuşlar yükleniyor... </div>;
  }

  return (
    <div className="all-flights-container">
      <h2> Tüm Uçuşlar </h2>
      {flights.length > 0 ? (
        <table className="flights-table">
          <thead>
            <tr>
              <th> Güzergah </th> <th> Kalkış Zamanı </th>
              <th> Varış Zamanı </th> <th> Uçuş No </th> <th> Fiyat </th>
              <th> Kapasite </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>
                  {flight.departureCity} - {flight.arrivalCity}
                </td>
                <td> {new Date(flight.departureTime).toLocaleString()} </td>
                <td> {new Date(flight.arrivalTime).toLocaleString()} </td>
                <td> {flight.flightNumber} </td>
                <td>
                  {flight.price}
                  TL
                </td>
                <td> {flight.capacity} </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p> Hiç uçuş bulunamadı </p>
      )}
    </div>
  );
};

export default AllFlights;
