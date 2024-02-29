import { useState } from "react";
import "./Form.css";
import Head from "../components/Head";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [accept, setAccept] = useState(false);
  // stop submit
  function stopSubmit(e) {
    e.preventDefault();
    setAccept(true);
  }
  // pattern  for validating an email address
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  //delte function
  function deleteInput(e) {
    e.target.parentNode.remove();
  }
  // add function
  function addInput(e) {
    const newInput = document.createElement("div");
    newInput.classList.add("input-field");
    newInput.innerHTML = `
      <input type="text" placeholder="...New Input" />
      <i class="fa-solid fa-trash"></i>
      <i class="fa-solid fa-square-plus"></i>
    `;
    newInput.querySelector(".fa-trash").addEventListener("click", deleteInput);
    newInput
      .querySelector(".fa-square-plus")
      .addEventListener("click", addInput);
    e.target.parentNode.parentNode.insertBefore(
      newInput,
      e.target.parentNode.nextSibling
    );
  }

  /*  
   ------in case we have Api from backend example for using send data 

   async function StopSubmit(e) {
    let Flag = true;
    e.preventDefault();
    SetAccsept(true);
    if (name === "" || password.length < 8 || repassword !== password) {
      Flag = false;
    } else Flag = true;
    try {
      if (Flag) {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/${props.endPoint}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: repassword,
          }
        );
        if (res.status === 200) {
          props.hasLocalStorage && window.localStorage.setItem("email", email);
          window.location.pathname = `${props.navigate}`;
        }
      }
    } catch (err) {
      SetEmailError(err.response.status);
    }
  }
  
  */

  return (
    <>
      <Head title="Form Validation in First Way" />
      <div className="container">
        <form onSubmit={stopSubmit}>
          <label htmlFor="name">Name</label>
          <div className="input-field">
            <input
              id="name"
              type="text"
              placeholder="...Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <i className="fa-solid fa-trash" onClick={deleteInput}></i>
            <i className="fa-solid fa-square-plus" onClick={addInput}></i>
          </div>
          {(name === "" && accept && (
            <p className="error">Name is required </p>
          )) ||
            (name?.length < 3 && accept && (
              <p className="error">Name is too short</p>
            ))}
          <label htmlFor="email">Email</label>
          <div className="input-field">
            <input
              id="email"
              type="email"
              placeholder="...email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-trash" onClick={deleteInput}></i>
            <i className="fa-solid fa-square-plus" onClick={addInput}></i>
          </div>
          {email !== "" && !isValidEmail(email) && (
            <p className="error">Email is not valid</p>
          )}
          <label htmlFor="pass">Password</label>
          <div className="input-field">
            <input
              id="pass"
              type="password"
              placeholder="..Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa-solid fa-trash" onClick={deleteInput}></i>
            <i className="fa-solid fa-square-plus" onClick={addInput}></i>
          </div>
          {password.length < 8 && accept && (
            <p className="error">password must be more than 8 characters</p>
          )}
          <label htmlFor="rePass">Confirm Password</label>
          <div className="input-field">
            <input
              id="rePass"
              type="password"
              placeholder="...Confirm"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <i className="fa-solid fa-trash" onClick={deleteInput}></i>
            <i className="fa-solid fa-square-plus" onClick={addInput}></i>
          </div>
          {repassword !== password && accept && (
            <p className="error">passwords do not match</p>
          )}
          <div className="submit-btn">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
