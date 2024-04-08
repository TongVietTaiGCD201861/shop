import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Shirt } from "../apiServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../store/actions/counter";
import "../generalStyle/style.css"

export default function Index() {
  // const [data, setData] = useState([]);
  // const navigation = useNavigate();

  // const dispatch = useDispatch();
  // const counter = useSelector((state) => state.counter);
  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   onLoad();
  // }, []);

  // const onLoad = () => {
  //   Shirt.get()
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const deleteShirt = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "No, cancel!",
  //     reverseButtons: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Shirt._delete(id, user.token)
  //         .then((res) => {
  //           onLoad();
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your file has been deleted.",
  //             icon: "success",
  //           });
  //         })
  //         .catch((err) => console.log(err));
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       Swal.fire({
  //         title: "Cancelled",
  //         text: "Your imaginary file is safe :)",
  //         icon: "error",
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <div className="full-width">
        <img className="logo" src="https://img.freepik.com/premium-vector/tshirt-logo-clothing-logo-apparel-store-icon-fashion-logo-design-tshirt-icon-template_657888-112.jpg" alt="Shirt Store Logo" />
        <span className="store-name">Shirt Store</span>
      </div>

      {/* <h1>{counter}</h1>
      <div>
        <button onClick={() => dispatch(increment(5))}>increment</button>
        <button onClick={() => dispatch(decrement(5))}>decrement</button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>

      <Button
        onClick={() => navigation("/create")}
        variant="contained"
        color="success"
      >
        Create
      </Button> */}
    </>
  );
}
