import { useAuth } from "@/context/FormDataContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { handleLogin, setEmail, setPassword, email, password } = useAuth();

  return (
    <div className="container">
      <div className="row  ">
        <Link href="/" className="navbar-brand m-auto">
          <img
            className="navbar-brand"
            src="/images/Group 1.svg"
            alt="igraliste"
          />
        </Link>{" "}
        <div className="col-8 offset-2">
          <div className="card bg-transparent p-3 border-0">
            <div className="form-group">
              <label htmlFor="email">Email адреса</label>
              <input
                type="email"
                className="form-control bg-transparent rounded"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Лозинка</label>
              <input
                type="password"
                className="form-control bg-transparent rounded"
                id="password"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small className="form-text log-color ">
                Ја заборави лозинката?
              </small>
            </div>
            <button
              onClick={handleLogin}
              type="button"
              className="btn btn-dark text-white btn-rounded m-2"
            >
              Најави се
            </button>
            <p className="m-auto">или</p>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-custom-login btn-block m-2"
              >
                <i className="fab fa-facebook"></i> Најави се преку Facebook
              </button>
              <button
                type="button"
                className="btn btn-custom-login btn-block m-2 "
              >
                <i className="fab fa-google"></i> Најави се преку Google
              </button>
            </div>
            <p className="mt-3 text-center">
              Немаш профил?{" "}
              <span>
                <Link href="/register" >
                  <span className="log-color ">Регистрирај се</span>
                </Link>
              </span>
            </p>
            <p className="mt-3 text-muted text-center">
              Сите права задржани @ Игралиште Скопје
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
