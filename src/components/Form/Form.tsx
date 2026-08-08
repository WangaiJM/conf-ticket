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

  type FieldName = "fullName" | "email" | "userName" | "avatar";
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
    userName: {
      required: true,
      minLength: 3,
    },
    avatar: {
      required: true,
    },
  };

  const validate = (
    field: FieldName,
    value: string | File | null,
  ): string | undefined => {
    if (field === "avatar") {
      if (!value) return "Avatar is required";

      const file = value as File;

      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        return "Only JPG or PNG allowed";
      }

      const maxSize = 500 * 1024;
      if (file.size > maxSize) {
        return "File must be less than 500KB";
      }

      return undefined;
    }

    const fieldToCheck = rules[field as Exclude<FieldName, "avatar">];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const stringValue = value as string;

    if (fieldToCheck.required && !stringValue.trim()) {
      return "This field is required";
    }

    if (fieldToCheck.minLength && stringValue.length < fieldToCheck.minLength) {
      return "Please enter a valid name";
    }

    if (fieldToCheck.isEmail && !emailRegex.test(stringValue)) {
      return "Please enter a valid email";
    }

    return undefined;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, type, files } = e.target;
    const value =
      type === "file"
        ? (files?.[0] ?? formData.avatar ?? null)
        : e.target.value;

    const errorMsg = validate(name as FieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
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
    const file = e.target.files?.[0] ?? null;

    const errorMsg = validate("avatar", file);

    setErrors((prev) => ({
      ...prev,
      avatar: errorMsg,
    }));

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Errors = {};

    const fullNameErr = validate("fullName", formData.fullName);
    if (fullNameErr) newErrors.fullName = fullNameErr;

    const emailErr = validate("email", formData.email);
    if (emailErr) newErrors.email = emailErr;

    const userNameErr = validate("userName", formData.userName);
    if (userNameErr) newErrors.userName = userNameErr;

    const avatarErr = validate("avatar", formData.avatar);
    if (avatarErr) newErrors.avatar = avatarErr;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            onBlur={handleBlur}
          />
          <img src={Drag} alt="" />
          {formData.avatar ? (
            <p>{formData.avatar.name}</p>
          ) : (
            <p>Drag and drop or click to upload</p>
          )}
        </div>
        {!formData.avatar && (
          <span className="file-span">
            <img src={Info} alt="" />
            Upload your photo (JPG or PNG, max size: 500KB).
          </span>
        )}
        <span
          className={`errorMsg ${errors.avatar ? "show" : ""}`}
          id="avatar-error"
        >
          {errors.avatar}
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
          onBlur={handleBlur}
        />
        <span
          className={`errorMsg ${errors.fullName ? "show" : ""}`}
          id="fullName-error"
        >
          {errors.fullName}
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
          onBlur={handleBlur}
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
          name="userName"
          id="username"
          placeholder="@yourusername"
          value={formData.userName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`errorMsg ${errors.userName ? "show" : ""}`}
          id="userName-error"
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
