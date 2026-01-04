import Parse from "parse";
import { useNavigate } from "react-router";
import "./AuthFlow.css";
import { useEffect, useState } from "react";
import { countrySelectOptions } from "../utils/countryCodes";

export default function Signup() {
  const currentDate = new Date().toLocaleString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFilled, setIsFilled] = useState({
    firstName: false,
    lastName: false,
    homeCountry: false,
    occupation: false,
    dateMovedToCph: false,
    username: false,
    password: false,
  });

  const [isValidated, setIsValidated] = useState({
    firstName: true,
    lastName: true,
    homeCountry: true,
    occupation: true,
    dateMovedToCph: true,
    username: true,
    password: true,
  });

  function handleFilled(e) {
    const newValue = e.target.value;
    const fieldName = e.target.name;

    setIsFilled((prev) => ({
      ...prev,
      [fieldName]: newValue.length > 0,
    }));

    setIsValidated((prev) => ({
      ...prev,
      [fieldName]: newValue.length > 0,
    }));
  }

  useEffect(() => {
    const allFilled =
      isFilled.firstName &&
      isFilled.lastName &&
      isFilled.homeCountry &&
      isFilled.occupation &&
      isFilled.dateMovedToCph &&
      isFilled.username &&
      isFilled.password &&
      !usernameExists;

    setIsButtonDisabled(!allFilled);
  }, [isFilled, usernameExists]);

  async function usernameCheck(e) {
    const username = e.target.value;

    const Users = Parse.Object.extend("UserPublic");
    const query = new Parse.Query(Users);
    query.equalTo("username", username);
    const count = await query.count();

    if (count > 0) {
      setUsernameExists(true);
    } else {
      setUsernameExists(false);
    }
  }

  async function signup(formData) {
    setIsLoading(true);

    const username = formData.get("username");
    const password = formData.get("password");
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    await user.signUp();
    await createUser(formData);
  }

  async function createUser(formData) {
    const UserPublic = Parse.Object.extend("UserPublic");
    const newUser = new UserPublic();
    const rawDate = formData.get("dateMovedToCph");
    const dateObj = new Date(rawDate);
    newUser.set("firstName", formData.get("firstName"));
    newUser.set("lastName", formData.get("lastName"));
    newUser.set("homeCountry", formData.get("homeCountry"));
    newUser.set("occupation", formData.get("occupation"));
    newUser.set("dateMovedToCph", dateObj);
    newUser.set("username", formData.get("username"));
    newUser.set("userIdPrivate", Parse.User.current());
    await newUser.save().then(
      () => {
        window.location.reload();
      },
      (error) => {
        alert(error.message);
        setIsLoading(false);
      }
    );
  }

  return (
    <div>
      <form className="form-box" action={signup}>
        <div className="input-row">
          <div className="input-column">
            <label htmlFor="firstName"> First name </label>
            <input
              type="text"
              placeholder={isValidated.firstName ? "Johann Friedrich" : ""}
              name="firstName"
              className={`inputfield ${isValidated.firstName ? "" : "failed"}`}
              onInput={handleFilled}
              onBlur={handleFilled}
              autoFocus
            />
            <p className="validation-message">
              {isValidated.firstName ? "" : "Please enter your first name"}
            </p>
          </div>
          <div className="input-column">
            <label htmlFor="lastName"> Last name </label>
            <input
              type="text"
              placeholder={isValidated.lastName ? "Struensee" : ""}
              name="lastName"
              className={`inputfield ${isValidated.lastName ? "" : "failed"}`}
              onInput={handleFilled}
              onBlur={handleFilled}
            />
            <p className="validation-message">
              {isValidated.lastName ? "" : "Please enter your last name"}
            </p>
          </div>
        </div>
        <div className="input-column">
          <label htmlFor="homeCountry"> What is your home country? </label>
          <select
            name="homeCountry"
            className={`inputfield ${isValidated.homeCountry ? "" : "failed"} ${
              !isFilled.homeCountry ? "placeholder" : ""
            } `}
            onInput={handleFilled}
            onBlur={handleFilled}
            defaultValue=""
          >
            <option value="" disabled label="Home country" />
            {countrySelectOptions.map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
          <p className="validation-message">
            {isValidated.homeCountry ? "" : "Please choose your home country"}
          </p>
        </div>
        <div className="input-column">
          <label htmlFor="occupation"> What do you do? </label>
          <input
            type="text"
            placeholder={isValidated.occupation ? "Student at ITU" : ""}
            name="occupation"
            className={`inputfield ${isValidated.occupation ? "" : "failed"}`}
            onInput={handleFilled}
            onBlur={handleFilled}
          />
          <p className="validation-message">
            {isValidated.occupation ? "" : "Please enter your occupation"}
          </p>
        </div>
        <div className="input-column">
          <label htmlFor="dateMovedToCph">
            {" "}
            When did you move to Copenhagen?{" "}
          </label>
          <input
            type="date"
            placeholder="When did you move to Copenhagen?"
            name="dateMovedToCph"
            className={`inputfield ${
              isValidated.dateMovedToCph ? "" : "failed"
            }`}
            onInput={handleFilled}
            onBlur={handleFilled}
            max={currentDate}
          />
          <p className="validation-message">
            {isValidated.dateMovedToCph
              ? ""
              : "Please enter the date you moved to Copenhagen"}
          </p>
        </div>
        <div className="input-column">
          <label htmlFor="username"> Username </label>
          <input
            type="username"
            placeholder={isValidated.username ? "johann.struensee" : ""}
            name="username"
            className={`inputfield ${isValidated.username ? "" : "failed"}`}
            onInput={(e) => {
              handleFilled(e);
              usernameCheck(e);
            }}
            onBlur={handleFilled}
          />
          <p className="validation-message">
            {isValidated.username
              ? usernameExists
                ? "Username already exists"
                : ""
              : "Please enter a username"}
          </p>
        </div>
        <div className="input-column">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            placeholder={isValidated.password ? "password" : ""}
            name="password"
            className={`inputfield ${isValidated.password ? "" : "failed"}`}
            autoComplete="new-password"
            onInput={handleFilled}
            onBlur={handleFilled}
          />
          <p className="validation-message">
            {isValidated.password ? "" : "Please enter a password"}
          </p>
        </div>
        <button
          title={isButtonDisabled ? "Enter info first" : "Click me to sign up!"}
          type="submit"
          value="submit"
          className={isButtonDisabled ? "disabledButton" : "enabledButton"}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
