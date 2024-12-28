"use client";
import Image from "next/image";
import contactImg from "../../../../public/contact_img.png";
import { useState } from "react";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  message: "",
};

const initialErrors = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  message: "",
};

const ContactUs = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!values.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!values.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!values.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = "Invalid email format.";
    if (!values.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!values.message.trim()) newErrors.message = "Message cannot be empty.";

    return newErrors;
  };

  const handleChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));

    if (touched[target.name]) {
      setErrors((prev) => ({
        ...prev,
        [target.name]: validate()[target.name] || "",
      }));
    }
  };

  const handleBlur = ({ target }) => {
    setTouched((prev) => ({ ...prev, [target.name]: true }));

    setErrors((prev) => ({
      ...prev,
      [target.name]: validate()[target.name] || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      // Simulate API submission
      const response = await fetch('/api/send-email', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      if (response.ok){
        alert("Message sent successfully!");
        setValues(initialValues); // Reset form
        setTouched({});
      } else {
        alert("An error occured. Please try again.");
      }
    } catch (error) {
      alert("An error occured. Please try again.");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="text-center my-6 text-[#070707] px-4 max-w-[1000px]">
        <div className="bg-[#EC1C241A] inline-block rounded p-1 px-2 mt-20">
          <p className="text-[#EC1C24] text-xs font-light">Contact Us</p>
        </div>
        <h1 className="font-lexend font-semibold text-[28px] mb-2">
          Let's Build Something Great Together
        </h1>
        <p className="font-light text-sm max-w-[640px] mx-auto">
          At Devon Technology Limited, we are passionate about using technology
          as a catalyst for change. Together, let's build a future where impactful software drives progress across industries and creates a better world for all.
        </p>

        <div className="mt-10 md:flex gap-10 justify-center">
          <div>
            <Image
              src={contactImg}
              alt="An image of two men shaking hands"
              height={530}
            />
          </div>
          <div className="pt-2">
            <form className="w-full text-left" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-6">
                <label className="block font-medium text-[#070707] mb-2">
                  Full Name
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.firstname ? "border-red-500" : "border-[#E6E7E6]"
                    } text-sm placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 `}
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.lastname ? "border-red-500" : "border-[#E6E7E6]"
                    } text-sm placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 `}
                  />
                </div>
                {errors.firstname && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
                )}
                {errors.lastname && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block font-medium text-[#070707] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-[#E6E7E6]"
                  } text-sm placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 `}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block font-medium text-[#070707] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.phone ? "border-red-500" : "border-[#E6E7E6]"
                  } text-sm placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 `}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block font-medium text-[#070707] mb-2">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your message here"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md ${
                    errors.message ? "border-red-500" : "border-[#E6E7E6]"
                  } text-sm placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-400 `}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  Object.values(errors).some((error) => error) || 
                  Object.values(values).some((value) => !value.trim())
                }
                className={`bg-[#37B34A] mt-8 px-12 py-3 rounded-lg text-white cursor-pointer ${
                  isLoading ||
                  Object.values(errors).some((error) => error) ||
                  Object.values(values).some((value) => !value.trim()) 
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
