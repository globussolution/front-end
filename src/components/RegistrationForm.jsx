"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Schema for form validation
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  cnic: Yup.string()
    .matches(/^\d{13}$/, "CNIC must be 13 digits")
    .required("CNIC is required"),
}).required();

const RegistrationForm = () => {
  // Using react-hook-form with Yup validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Send POST request to register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Success message
      } else {
        alert(result.error); // Error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Enter your name"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* CNIC Field */}
        <div>
          <label htmlFor="cnic">CNIC</label>
          <input
            id="cnic"
            type="text"
            {...register("cnic")}
            placeholder="Enter your CNIC (13 digits)"
          />
          {errors.cnic && <p>{errors.cnic.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
