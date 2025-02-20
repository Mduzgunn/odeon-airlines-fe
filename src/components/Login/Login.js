import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../base/Input";
import Button from "../base/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        null,
        {
          params: formData,
        }
      );

      if (response.data.result === "SUCCESS") {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/flights");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Kullanıcı adı veya şifre hatalı!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2> Giriş Yap </h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          inputType={'text'}
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
        <Button type="submit">
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
      <p className="signup-link">
        Hesabınız yok mu ? <Link to="/signup"> Kayıt Ol </Link>
      </p>
    </div>
  );
};

export default Login;
