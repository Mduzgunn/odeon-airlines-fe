import React, { useState } from "react";
import Button from "../base/Button";
import Input from "../base/Input";
import Select from "../base/Select";
import axios from "axios";
import Swal from "sweetalert2";
import "./AdminPanel.css";

const AdminPanel = ({ onFlightAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newFlight, setNewFlight] = useState({
    departureCity: "",
    arrivalCity: "",
    departureTime: "",
    arrivalTime: "",
    flightNumber: "",
    price: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setNewFlight({
      ...newFlight,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/flights",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: newFlight,
      });

      if (response.data.result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Başarılı!",
          text: "Yeni uçuş başarıyla eklendi.",
        });
        setNewFlight({
          departureCity: "",
          arrivalCity: "",
          departureTime: "",
          arrivalTime: "",
          flightNumber: "",
          price: "",
          capacity: "",
        });
        setIsModalOpen(false);
        onFlightAdded();
      }
    } catch (error) {
      let errorMessage = "Uçuş eklenirken bir hata oluştu.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cities = [
    { value: "ISTANBUL", label: "İstanbul" },
    { value: "ANKARA", label: "Ankara" },
    { value: "IZMIR", label: "İzmir" },
    { value: "ANTALYA", label: "Antalya" },
    { value: "BURSA", label: "Bursa" },
  ];

  return (
    <div className="admin-panel">
      <Button className="admin-button" onClick={() => setIsModalOpen(true)}>
        Yeni Uçuş Ekle
      </Button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3> Yeni Uçuş Ekle </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <Select
                  id="departureCity"
                  label="Kalkış Şehri"
                  value={newFlight.departureCity}
                  onChange={handleChange}
                  options={cities}
                  required
                />
                <Select
                  id="arrivalCity"
                  label="Varış Şehri"
                  value={newFlight.arrivalCity}
                  onChange={handleChange}
                  options={cities}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  type="datetime-local"
                  id="departureTime"
                  label="Kalkış Zamanı"
                  value={newFlight.departureTime}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="datetime-local"
                  id="arrivalTime"
                  label="Varış Zamanı"
                  value={newFlight.arrivalTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  id="flightNumber"
                  label="Uçuş Numarası"
                  value={newFlight.flightNumber}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="number"
                  id="price"
                  label="Fiyat"
                  value={newFlight.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <Input
                  type="number"
                  id="capacity"
                  label="Kapasite"
                  value={newFlight.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="button-group">
                <Button type="submit">
                  {isLoading ? "Ekleniyor..." : "Uçuş Ekle"}
                </Button>
                <Button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
