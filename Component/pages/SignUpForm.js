import React, { useState } from "react";
import "../stylez/SignUp.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    province: "",
    city: "",
    phone_number: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.firstName) validationErrors.firstName = "First name is required";
    if (!formData.lastName) validationErrors.lastName = "Last name is required";
    if (!formData.country) validationErrors.country = "Country is required";
    if (!formData.province) validationErrors.province = "Province is required";
    if (!formData.city) validationErrors.city = "City is required";
    if (!formData.phone_number) validationErrors.phone_number = "Phone number is required";
    if (!formData.birthdate) validationErrors.birthdate = "Birthdate is required";
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.password.length < 8) validationErrors.password = "Password must be at least 8 characters long";
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match";
    
    // Agree to terms validation
    if (!formData.agree) validationErrors.agree = "You must agree to the terms";

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country,
          province: formData.province,
          city: formData.city,
          phone_number: formData.phone_number,
          birthdate: formData.birthdate,
          email: formData.email,
          password: formData.password,
          agree: formData.agree,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div className="input-group">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      <div className="row">
        <div className="input-group">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleChange}
          />
          {errors.province && <p className="error">{errors.province}</p>}
        </div>
      </div>
      <div className="row">
        <div className="input-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
      </div>

      <div className="input-group">
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        {errors.phone_number && <p className="error">{errors.phone_number}</p>}
      </div>
      <div className="input-group">
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
        {errors.birthdate && <p className="error">{errors.birthdate}</p>}
      </div>
      <div className="input-group">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="input-group">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <div className="input-group checkbox">
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the{" "}
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            terms and conditions
          </a>
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
