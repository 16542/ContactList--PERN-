import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    favoriteFood: "",
    age: 0,
  });
  const navigate = useNavigate();

  const validInfo = () => {
    const { Firstname, Lastname, Email, age, favoriteFood } = user;
    if (!Firstname || !Lastname || !Email || !age || !favoriteFood)
      return false;
    if (Firstname.length < 3 || Lastname.length < 3) return false;
    if (age < 10) return false;
    return true;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInfo()) {
      try {
        const { Firstname, Lastname, Email, age, favoriteFood } = user;
        const id = JSON.parse(localStorage.getItem("User")).userid;
        console.log(id);
        const { data } = await axios.put("http://localhost:5000/update-user", {
          id,
          Firstname,
          Lastname,
          Email,
          age,
          favoriteFood,
        });
        console.log(data);
        localStorage.clear()
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Bad user Info ...");
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        {console.log(user)}
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">Edit-User</h1>
            <div>
              <input
                type="text"
                className="joinInput"
                placeholder="Firstname"
                name="Firstname"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <input
                type="text"
                className="joinInput "
                placeholder="lastname"
                onChange={(e) => handleChange(e)}
                name="Lastname"
              />
            </div>
            <div>
              <input
                type="text"
                className="joinInput "
                placeholder="email"
                onChange={(e) => handleChange(e)}
                name="Email"
              />
            </div>
            <div>
              <input
                type="text"
                className="joinInput "
                placeholder="age"
                onChange={(e) => handleChange(e)}
                name="age"
              />
            </div>
            <div>
              <input
                type="text"
                className="joinInput "
                placeholder="FavoriteFood"
                onChange={(e) => handleChange(e)}
                name="favoriteFood"
              />
            </div>

            <button className="button" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Edit;
