import React from "react";
import Select from "../base/Select";
import Button from "../base/Button";
import DatePicker from "../base/DatePicker";
import "./FlightSearch.css";

const FlightSearch = ({
  searchParams,
  handleChange,
  handleSearch,
  isLoading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validasyonunu kontrol et
    const form = e.target;
    if (!form.checkValidity()) {
      return;
    }

    handleSearch(e);
  };

  const cities = [
    { value: "ISTANBUL", label: "İstanbul" },
    { value: "ANKARA", label: "Ankara" },
    { value: "IZMIR", label: "İzmir" },
    { value: "ANTALYA", label: "Antalya" },
    { value: "BURSA", label: "Bursa" },
  ];

  return (
    <form onSubmit={handleSubmit} className="search-form" noValidate={false}>
      <div className="search-inputs">
        <Select
          id="departureCity"
          label="Kalkış Şehri"
          value={searchParams.departureCity}
          onChange={handleChange}
          required
          options={cities}
        />
        <Select
          id="arrivalCity"
          label="Varış Şehri"
          value={searchParams.arrivalCity}
          onChange={handleChange}
          required
          options={cities}
        />
        <DatePicker
          id="flightDate"
          label="Uçuş Tarihi"
          value={searchParams.flightDate}
          onChange={handleChange}
          required
        />
        <Button type="submit">{isLoading ? "Aranıyor..." : "Uçuş Ara"}</Button>
      </div>
    </form>
  );
};

export default FlightSearch;
