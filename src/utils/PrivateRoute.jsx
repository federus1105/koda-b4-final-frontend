import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function PrivateRoute({ redirectTo, children }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

   useEffect(() => {
    if (!token) {
      toast.error("Anda harus Login dulu")
      navigate(redirectTo, { replace: true });
    }
  }, [token, navigate, redirectTo]);

  return token ? children : null;
}


