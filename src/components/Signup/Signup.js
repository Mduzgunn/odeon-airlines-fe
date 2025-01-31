import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../base/Input";
import Select from "../base/Select";
import Button from "../base/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    username: "",
    password: "",
  });

  const cities = [
    { value: "ISTANBUL", label: "İstanbul" },
    { value: "ANKARA", label: "Ankara" },
    { value: "IZMIR", label: "İzmir" },
    { value: "ANTALYA", label: "Antalya" },
    { value: "BURSA", label: "Bursa" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      if (response.data.result === "SUCCESS") {
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2> Kayıt Ol </h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="firstName"
          label="Ad"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          id="lastName"
          label="Soyad"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          id="username"
          label="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          id="password"
          label="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Select
          id="city"
          label="Şehir"
          value={formData.city}
          onChange={handleChange}
          options={cities}
          required
        />
        <Button type="submit">
          {isLoading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
        </Button>
      </form>
      <p className="login-link">
        Zaten hesabınız var mı ? <Link to="/login"> Giriş Yap </Link>
      </p>
    </div>
  );
};

export default Signup;
