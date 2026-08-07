import React, { useContext, useState } from "react";
import Info from "../../assets/images/icon-info.svg";
import Drag from "../../assets/images/icon-upload.svg";

import "./form.scss";
import { UserContext, type User } from "../../context/UserContext/UserContext";

const Form = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("context must be used in the provider");
  const { addUser } = context;
  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    userName: "",
    avatar: null,
  });
  type Errors = {
    fullName?: string;
    email?: string;
    userName?: string;
    avatar?: string;
  };
  const [errors, setErrors] = useState<Errors>({});

  type Rule = {
    required?: boolean;
    minLength?: number;
    noNumber?: boolean;
    isEmail?: boolean;
  };

  const rules: Record<FieldName, Rule> = {
    fullName: {
      required: true,
      minLength: 3,
      noNumber: true,
    },
    email: {
      required: true,
      minLength: 3,
      isEmail: true,
    },
    username: {
      required: true,
      minLength: 3,
    },
  };

  type FieldName = "fullName" | "email" | "username";

  const validate = (field: FieldName, value: string): string | undefined => {
    const fieldToCheck = rules[field];
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fieldToCheck.required && !value.trim()) {
      return "This field is required";
    }
    if (fieldToCheck.minLength && value.length < fieldToCheck.minLength) {
      return `Please Enter a valid name`;
    }
    if (fieldToCheck.isEmail && !emailRegex.test(value)) {
      return `Please Enter a valid email`;
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = validate(name as FieldName, value);
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: errorMsg,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addUser(formData);

    setFormData({
      fullName: "",
      email: "",
      userName: "",
      avatar: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control ">
        <label htmlFor="avatar">Upload Avatar</label>
        <div className="file-control">
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/jpg, image/png"
            onChange={handleFileChange}
          />
          <img src={Drag} alt="" />
          <p>Drag and drop or click to upload</p>
        </div>
        <span className="file-span">
          <img src={Info} alt="" />
          Upload your photo (JPG or PNG, max size: 500KB).
        </span>
      </div>
      <div className="form-control">
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="full-name"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={() => handleBlur}
        />
        <span
          className={`errorMsg ${errors.fullName ? "show" : ""}`}
          id="email-error"
        >
          {errors.email}
        </span>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur}
        />
        <span
          className={`errorMsg ${errors.email ? "show" : ""}`}
          id="email-error"
        >
          {errors.email}
        </span>
      </div>
      <div className="form-control">
        <label htmlFor="username">GitHub Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="@yourusername"
          value={formData.userName}
          onChange={handleChange}
          onBlur={() => handleBlur}
        />
        <span
          className={`errorMsg ${errors.userName ? "show" : ""}`}
          id="email-error"
        >
          {errors.userName}
        </span>

        <span></span>
      </div>
      <div className="form-control">
        <button className="btn" type="submit">
          Generate My Ticket
        </button>
      </div>
    </form>
  );
};
export default Form;
