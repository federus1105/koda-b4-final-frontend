import { useState } from "react";

// --- email ---
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  if (!email.trim()) return "Email tidak boleh kosong";
  if (!emailRegex.test(email)) return "Format email tidak valid";
  return "";
};

// --- password ---
export const validatePassword = (password) => {
  const smallRegex = /[a-z]/;
  const bigRegex = /[A-Z]/;
  const specialRegex = /[!@#$%^&*/><]/;

  if (!password.trim()) return "Password tidak boleh kosong";
  if (password.length < 8) return "Password minimal 8 karakter";
  if (!smallRegex.test(password)) return "Password harus mengandung huruf kecil";
  if (!bigRegex.test(password)) return "Password harus mengandung huruf besar";
  if (!specialRegex.test(password))
    return "Password harus mengandung karakter spesial (!@#$%^&*)";
  return "";
};

// --- confirmpassword ---
export const validateConfirmPassword = (password, confirm_password) => {
  if (!confirm_password.trim()) return "Konfirmasi password tidak boleh kosong";
  if (password !== confirm_password)
    return "Konfirmasi password tidak sama dengan password";
  return "";
};


// --- fullname ----
export const validateFullname = (fullname) => {
  if (!fullname.trim()) return "Fullname tidak boleh kosong";
  if (fullname.length < 3) return "Fullname minimal 3 karakter";
  if (fullname.length > 20) return "Fullname maksimal 20 karakter";
  return "";
};


// --- HOOK REGISTER --
export function useRegister() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {
      fullname: validateFullname(formData.fullname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirm_password
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };
  return { formData, errors, handleChange, validate, setFormData };
}