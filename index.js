const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./server/db");
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json()); // * => req.body;

//*  get all users ;

app.get("/getusers", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM Users ");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

//* Create user;
app.post("/create", async (req, res) => {
  try {
    //await
    const { Firstname, Lastname } = req.body;
    const newUser = await pool.query(
      "INSERT INTO Users (First_Name,Last_Name,email,Favorite_Food,Age) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [Firstname, Lastname, Email, favoriteFood, age]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//  * get  user  By Name ;
app.get("/getuser", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await pool.query("SELECT * FROM Users WHERE First_Name=$1", [
      username,
    ]);
    console.log(user.rows);
    res.json(user.rows);
  } catch (error) {
    console.log(error);
  }
});

// * Update User ;
app.put("/update-user", async (req, res) => {
  try {
    const { Firstname, Lastname, Email, age, favoriteFood, id } = req.body;
    const UpdatedUser = await pool.query(
      "UPDATE Users SET First_Name=$1, Last_Name=$2, Age=$4,Favorite_Food=$3,Email=$5 WHERE userId=$6 RETURNING *",
      [Firstname, Lastname, favoriteFood, age, Email, id]
    );
    res.json("User Updated!");
  } catch (error) {
    console.log(error);
  }
});
//* Delte user ;
app.delete("/delete-user", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const Users = await pool.query("DELETE FROM Users WHERE userId=$1", [id]);
    res.json("User Deleted!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is runing successfuly on port ${port}`);
});
