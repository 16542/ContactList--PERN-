CREATE DATABASE contact_list;


--\c into contact_list;

CREATE TABLE Users (
  userId SERIAL PRIMARY KEY ,
  email VARCHAR(50) NOT NULL ,
  First_Name VARCHAR(30) NOT NULL,
  Last_Name VARCHAR(30) NOT NULL,
  Age int NOT NULL,
  Favorite_Food VARCHAR(20) NOT NULL
);
