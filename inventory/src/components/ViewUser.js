import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ViewUser() {
  const { currentUser } = useSelector((state) => state.persisted.user);
  // Sample user data (replace with actual data)
  console.log(currentUser);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user/view", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        const response = await res.json();
        console.log(response, "uom");
        setuserData(response);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);
  console.log(userData, "userss");

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                id
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Phone Number
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Role
              </TableCell>
              <TableCell
                style={{
                  background: "#454545",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name.toUpperCase()}</TableCell>
                <TableCell>{user.username.toUpperCase()}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contactNumber}</TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {user.roles[0].name.split("_")[1]}
                </TableCell>
                <TableCell>
                  {/* Action button (e.g., Edit, Delete) */}
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Pagination
        count={Math.ceil(userData.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default ViewUser;
