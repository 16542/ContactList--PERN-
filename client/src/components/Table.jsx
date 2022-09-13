import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { rows } from "../Data";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Form = styled.form`
  display: flex;
  width: 50vh;
  height: 100px;
`;
// const ButtonSearch = styled.button`
//   border: none;
//   border-radius: 10px;
//   width: 70px;
//   height: 40px;
//   margin: 30px 10px ;
//   color: white;
//   background-color: teal;
// `;
const InputSearch = styled.input`
  margin: 30px;
  padding: 2px;
  font-size: 20px;
  font-weight: 300;
  border: 0.5px solid teal;
  border-radius: 10px;
`;

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [searchInput, setSeacrInput] = useState("");
  const [filtredUser, setFilteredUser] = useState([]);
  const url = "http://localhost:5000/";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = () => {
      axios
        .get(`${url}getusers`)
        .then((response) => {
          setRows(response.data);
        })
        .catch((err) => console.log("Error", err));
    };
    fetchUsers();
  }, []);

  const RemoveItem = async (index, id) => {
    console.log(id);
    const { data } = await axios.delete(`${url}delete-user`, {
      id: id,
    });
    if (data) {
      console.log("user deleted successfuly");
      setRows((items) => items.filter((_, i) => i !== index));
    } else {
      console.log("Can't delete this user");
    }
  };
  const handleUserInfo = (e, index) => {
    e.preventDefault();
    const user = rows.filter((_, i) => i === index);
    console.log(user.userid);
    localStorage.setItem("User", JSON.stringify(user));
    navigate(`/edit/`, { replace: true });
  };
  const SearchItems = (SearchValue) => {
    setSeacrInput(SearchValue);
    if (searchInput !== "") {
      const filteredData = rows.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUser(filteredData);
    } else {
      setFilteredUser(rows);
    }
  };

  return (
    <>
      <Form>
        <InputSearch
          placeholder="Search for user ..."
          onChange={(e) => SearchItems(e.target.value)}
        />
        {/* <ButtonSearch>Search</ButtonSearch> */}
      </Form>
      <TableContainer component={Paper} color="dark">
        <Table
          sx={{ minWidth: "100%", maxWidth: "100%" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "blue", fontSize: "20px" }}>
                ID
              </TableCell>
              <TableCell style={{ color: "blue", fontSize: "20px" }}>
                FirstName
              </TableCell>
              <TableCell style={{ color: "blue", fontSize: "20px" }}>
                LastName
              </TableCell>
              <TableCell style={{ color: "blue", fontSize: "20px" }}>
                Age
              </TableCell>
              <TableCell style={{ color: "blue", fontSize: "20px" }}>
                Food
              </TableCell>
              <TableCell
                color="blue"
                style={{ color: "blue", fontSize: "20px" }}
              >
                Delete
              </TableCell>
              <TableCell
                color="blue"
                style={{ color: "blue", fontSize: "20px" }}
              >
                Edit{" "}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {searchInput.length > 1
              ? filtredUser.map((row, i) => {
                  return (
                    <TableRow
                      key={i}
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.userid}
                      </TableCell>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.favorite_food}</TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          style={{ color: "red " }}
                          onClick={() => RemoveItem(i, row.userid)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        {/* <Link to={`/edit/${row.userid}`}> */}
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={(e) => handleUserInfo(e, i)}
                        >
                          Edit
                        </Button>
                        {/* </Link> */}
                      </TableCell>
                    </TableRow>
                  );
                })
              : rows.map((row, i) => (
                  <TableRow
                    key={i}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.userid}
                    </TableCell>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.favorite_food}</TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        style={{ color: "red " }}
                        onClick={() => RemoveItem(i, row.userid)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      {/* <Link to={`/edit/${row.userid}`}> */}
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={(e) => handleUserInfo(e, i)}
                      >
                        Edit
                      </Button>
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
