import React from "react";
import "./FlightList.css";

const FlightList = ({ flights }) => {
  return (
    <div className="flights-list">
      <h3> Bulunan Uçuşlar </h3>
      {flights.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th> Güzergah </th> <th> Kalkış Zamanı </th>
              <th> Varış Zamanı </th> <th> Uçuş No </th> <th> Fiyat </th>
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p> Uçuş bulunamadı </p>
      )}
    </div>
  );
};

export default FlightList;
