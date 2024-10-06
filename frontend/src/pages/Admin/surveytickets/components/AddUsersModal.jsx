import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../../redux/slices/adminQuoteSlices";
import CustomSelect from "../../../../components/Custom/CustomSelect";

const genderOptionsDisplayValue = ["Male", "Female", "Other"];
const genderOptions = [0, 1, 2];
const roleOptions = [0, 1, 2];
const roleOptionsDisplayValue = ["User", "Donator", "Admin"];

const AddUsersModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [avatarURL, setAvatarURL] = useState("");
  const [role, setRole] = useState(roleOptions[0]);
  const [gender, setGender] = useState(genderOptions[2]);
  const [birthDate, setBirthDate] = useState("");

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!username) newErrors.username = "Username is required";
    if (!birthDate) newErrors.birthDate = "birthDate is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const inputData = {
          email,
          username,
          password,
          phone,
          firstName,
          lastName,
          country,
          timezone,
          avatarURL,
          role,
          gender,
          birthDate,
        };

        const getUser = Object.keys(inputData).reduce((acc, key) => {
          const value = inputData[key];
          if (value !== "") {
            // Only add non-empty values
            acc[key] = typeof value === "string" ? value.trim() : value;
          }
          return acc;
        }, {});

        await dispatch(addUser(getUser)).unwrap(); // Dispatch the addQuote action
        onClose(); // Close modal after successful submission
      } catch (err) {
        console.error("Failed to add user:", err);
      }
    }
  };

  const handleFocus = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null, // Clear the error for the focused field
    }));
  };

  const handleClose = () => {
    // Avoid the bug where when you turn off the modal when it's daily, when you come back the input is readOnly
    onClose();
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 scroll">
      <div className="bg-pageBg-light dark:bg-pageBg-dark w-[400px] px-[20px] pt-[20px] pb-[40px]  rounded-lg shadow-lg relative overflow-y-auto max-h-[80vh]">
        <h2 className="text-[2rem] font-medium text-center mb-4 dark:text-textColor-dark ">
          Add a User
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Username
            </label>

            <input
              type="text"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.username
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              onFocus={() => handleFocus("username")}
            />

            {errors.username && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.username}
              </span>
            )}
          </div>
          {/* Email Input */}
          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Email
            </label>

            <input
              type="email"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.email
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
            />

            {errors.email && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Password
            </label>

            <input
              type="text"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.password
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
            />

            {errors.password && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.password}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Phone
            </label>

            <input
              type="number"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.phone
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={phone}
              onInput={(e) => setPhone(e.target.value)}
              onFocus={() => handleFocus("phone")}
            />

            {errors.phone && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div>
              <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
                First name
              </label>

              <input
                type="text"
                className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                  dark:text-textColor-dark text-[1.3rem] ${
                    errors.firstName
                      ? "border-red-900 dark:border-primary-dark"
                      : "border-gray-300"
                  }`}
                value={firstName}
                onInput={(e) => setFirstname(e.target.value)}
                onFocus={() => handleFocus("firstName")}
              />

              {errors.firstName && (
                <span className="text-red-900 text-sm dark:text-primary-dark">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="block text-[1.3rem] font-medium dark:text-textColor-dark mr-[8px] ml-[8px]">
                Gender
              </label>

              <CustomSelect
                value={gender}
                options={genderOptions}
                onSelect={setGender}
                displayValues={genderOptionsDisplayValue}
              />
              {errors.gender && (
                <span className="text-red-900 text-sm dark:text-primary-dark ml-[8px]">
                  {errors.gender}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
                Last name
              </label>

              <input
                type="text"
                className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.lastName
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
                value={lastName}
                onInput={(e) => setLastname(e.target.value)}
                onFocus={() => handleFocus("lastName")}
              />

              {errors.lastName && (
                <span className="text-red-900 text-sm dark:text-primary-dark">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="block text-[1.3rem] font-medium dark:text-textColor-dark mr-[8px] ml-[8px]">
                Role
              </label>

              <CustomSelect
                value={roleOptions[0]}
                options={roleOptions}
                onSelect={setRole}
                displayValues={roleOptionsDisplayValue}
              />
              {errors.role && (
                <span className="text-red-900 text-sm dark:text-primary-dark ml-[8px]">
                  {errors.role}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Country
            </label>

            <input
              type="text"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.country
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={country}
              onInput={(e) => setCountry(e.target.value)}
              onFocus={() => handleFocus("country")}
            />

            {errors.country && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.country}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Timezone
            </label>

            <input
              type="text"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.timezone
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={timezone}
              onInput={(e) => setTimezone(e.target.value)}
              onFocus={() => handleFocus("timezone")}
            />

            {errors.timezone && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.timezone}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark">
              Avatar URL
            </label>

            <input
              type="text"
              className={`input focus:outline-none border-[#d5d7da] focus-within:outline-none dark:bg-[#333] dark:outline-none dark:border-[transparent]
                 dark:text-textColor-dark text-[1.3rem] w-full ${
                   errors.avatarURL
                     ? "border-red-900 dark:border-primary-dark"
                     : "border-gray-300"
                 }`}
              value={avatarURL}
              onInput={(e) => setAvatarURL(e.target.value)}
              onFocus={() => handleFocus("avatarURL")}
            />

            {errors.avatarURL && (
              <span className="text-red-900 text-sm dark:text-primary-dark">
                {errors.avatarURL}
              </span>
            )}
          </div>

          {/* Last sending day Input */}
          <div className="flex items-center">
            <label className="block text-[1.3rem] font-medium dark:text-textColor-dark mr-[8px]">
              Date of birth
            </label>

            <input
              type="date"
              className={`input focus:outline-none text-[1.3rem] dark:bg-[#333] dark:text-textColor-dark `}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onFocus={() => handleFocus("birthDate")}
            />

            {errors.birthDate && (
              <span className="text-red-900 text-sm dark:text-primary-dark ml-[8px]">
                {errors.birthDate}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#4bc55e] text-white px-[16px] py-[6px] rounded-[8px] font-medium dark:bg-primary-dark"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Adding..." : "Add a user"}
          </button>

          {/* Error Handling */}
          {error && (
            <p className="text-red-900 text-[13px] mt-2 break-words dark:text-primary-dark">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}
        </form>

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-[20px]"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddUsersModal;
