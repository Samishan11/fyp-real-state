import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../../components/Navbar";
import { NotificationContext } from "../../../context/Notificationcontext";
const Bookingmy = () => {
  const { value, value1 } = useContext(NotificationContext);
  const [book, setBook] = value;
  const [bookings, setBookings] = useState();
  const [appointment, setappointment] = useState();
  const [load, setLoad] = useState(false);
  console.log(book);
  const updateBooking = (id) => {
    axios
      .put("/update/booking/" + id, {
        accept: true,
        appointment: new Date(appointment).toDateString(),
      })
      .then((data) => {
        load ? setLoad(false) : setLoad(true);
        toast.success("Meeting has been sheduled.");
      })
      .catch((e) => {
        toast.warn("Someting went wrong!!!");
      });
  };
  const rejectOffer = (email, username, owner) => {
    axios
      .post("/reject", {
        email: email,
        username: username,
        owner: owner,
      })
      .then((data) => {
        toast.success("Rejected Sucessfully");
      })
      .catch((e) => {
        toast.warn("Someting went wrong!!!");
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container col-md-10 my-4">
        <div className="row mx-auto px-4">
          <p className="m-0">View your booking history here.</p>
          <Link
            to={"/bookings/vendor"}
            className="link-btn text-xs text-primary"
          >
            View bookings on my listings
          </Link>
          {book ? (
            <>
              {book?.length > 0 ? (
                <>
                  {book?.map((val, ind) => {
                    return (
                      <>
                        {val?.property?.category === "hotel" ? (
                          <>
                            <div
                              key={ind}
                              className="d-flex flex-wrap my-2 py-3"
                            >
                              <div>
                                <img
                                  className="rounded"
                                  style={{
                                    height: "30ch",
                                    width: "40ch",
                                    objectFit: "cover",
                                  }}
                                  src={`http://localhost:5000/${val.property.images[0]}`}
                                  alt=""
                                />
                                <div className="about-hostel-owner mb-4 mt-4">
                                  <p className="text-sm text-secondary mb-1 fw-bold">
                                    Offered By
                                  </p>
                                  <div className="d-flex my-2">
                                    <div className="mx-2 my-auto">
                                      <p className="m-0 text-sm">
                                        {val.user.username}
                                      </p>
                                      <p className="m-0 text-sm">
                                        {val.user.firstName} {val.user.lastName}
                                      </p>
                                      <div className="">
                                        <span
                                          className="text-xs text-center px-1 text-light m-0 rounded d-block w-50"
                                          style={{ background: "#42EA5A" }}
                                        >
                                          {val.user.verified ? "Verified" : ""}
                                        </span>
                                      </div>
                                      <span className="text-xs">
                                        <i className="fa-solid fa-star me-1 text-warning"></i>
                                        {val.user.rating.toFixed(1)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mx-3 col-md-4">
                                <div>
                                  <p className="m-0 fw-bold fs-5">
                                    {val.property.title}
                                  </p>
                                  <small className="text-xs rounded bg-primary text-light fw-bold py-1 px-1">
                                    {val.property.rating.toFixed(1)}
                                  </small>
                                  <small className="text-xs mx-2">
                                    <i className="fa-solid fa-location-dot me-1"></i>
                                    {val.property.address.address} -{" "}
                                    {val.property.address.city}
                                  </small>
                                </div>

                                {val.room ? (
                                  <div
                                    className="py-2 px-2 my-3 text-xs"
                                    style={{
                                      background: "#f1f1f1",
                                      borderLeft: "3px solid #707070",
                                    }}
                                  >
                                    <td>
                                      <p className="m-0 my-1">
                                        {val.room.title}
                                      </p>
                                      <p className="m-0">
                                        {val.room.kings_bed > 0 ? (
                                          <>
                                            <i className="mt-2">
                                              <ion-icon name="bed-outline"></ion-icon>
                                            </i>{" "}
                                            {val.room.kings_bed} Kings Bed
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                      <p className="m-0">
                                        {val.room.single_bed > 0 ? (
                                          <>
                                            <i className="mt-2">
                                              <ion-icon name="bed-outline"></ion-icon>
                                            </i>{" "}
                                            {val.room.single_bed} Single Bed
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                      <p className="m-0">
                                        {val.room.double_bed > 0 ? (
                                          <>
                                            <i className="mt-2">
                                              <ion-icon name="bed-outline"></ion-icon>
                                            </i>{" "}
                                            {val.room.double_bed} Double Bed
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                      <div className="d-flex flex-wrap my-2">
                                        <span className="me-3 d-flex">
                                          <i
                                            className="me-1"
                                            style={{ marginTop: "1.5px" }}
                                          >
                                            <ion-icon name="resize-outline"></ion-icon>
                                          </i>{" "}
                                          {val.room_size} sq.feet
                                        </span>
                                        {val.room.features.map((f, ind) => {
                                          if (f === "TV") {
                                            return (
                                              <span className="me-3 d-flex">
                                                <i
                                                  className="me-1"
                                                  style={{ marginTop: "1.5px" }}
                                                >
                                                  <ion-icon name="tv"></ion-icon>
                                                </i>{" "}
                                                {f}
                                              </span>
                                            );
                                          }
                                          if (f === "AC") {
                                            return (
                                              <span className="me-3 d-flex">
                                                <i
                                                  className="me-1"
                                                  style={{ marginTop: "1.5px" }}
                                                >
                                                  <ion-icon name="thermometer-outline"></ion-icon>
                                                </i>{" "}
                                                {f}
                                              </span>
                                            );
                                          }
                                          if (f === "Wifi") {
                                            return (
                                              <span className="me-3 d-flex">
                                                <i
                                                  className="me-1"
                                                  style={{ marginTop: "1.5px" }}
                                                >
                                                  <ion-icon name="wifi-outline"></ion-icon>
                                                </i>{" "}
                                                {f}
                                              </span>
                                            );
                                          }
                                        })}
                                      </div>
                                      <span className="my-2">
                                        <i class="fa-solid fa-toilet me-1"></i>
                                        {val.room.bathroom.shared} Bathroom
                                      </span>

                                      <div className="d-flex flex-wrap my-2">
                                        {val.room.bathroom.features.map(
                                          (bf, ind) => {
                                            return (
                                              <span className="me-3 d-flex">
                                                <i
                                                  className="me-1"
                                                  style={{ marginTop: "1.5px" }}
                                                >
                                                  <ion-icon name="checkmark-outline"></ion-icon>
                                                </i>{" "}
                                                {bf}
                                              </span>
                                            );
                                          }
                                        )}
                                      </div>
                                    </td>
                                  </div>
                                ) : (
                                  <></>
                                )}

                                <hr />
                                <div className="d-flex flex-wrap">
                                  <div>
                                    <small className="text-xs">
                                      <i className="fa-regular fa-calendar me-1"></i>
                                      Check In
                                    </small>
                                    <p className="text-sm fw-bold">
                                      {new Date(val.booking_at).toDateString()}
                                    </p>
                                  </div>
                                  <div className="ms-0 ms-lg-auto">
                                    <small className="text-xs">
                                      <i className="fa-regular fa-calendar me-1"></i>
                                      Check Out
                                    </small>
                                    <p className="text-sm fw-bold">
                                      {new Date(
                                        val.booking_till
                                      ).toDateString()}
                                    </p>
                                  </div>
                                </div>
                                <p className="p-0 text-sm">
                                  <i className="fa-solid fa-moon me-1"></i>
                                  {new Date(val.booking_till).getDate() -
                                    new Date(val.booking_at).getDate()}{" "}
                                  Nights
                                </p>
                                <div>
                                  <p className="text-sm m-0">Guests</p>
                                  <small className="me-3">
                                    <i className="fa-solid fa-user me-1"></i>
                                    {val.people.adult} Adult
                                  </small>
                                  <small className="mx-3">
                                    <i className="fa-solid fa-child me-1"></i>
                                    {val.people.child} Child
                                  </small>
                                </div>
                                <hr />
                                <div className="d-flex flex-wrap">
                                  <p className="m-0 text-sm fw-bold">
                                    Total Price
                                  </p>
                                  {/* <p className='m-0 text-sm ms-auto rounded'>NPR { parseInt(val.price) * (new Date(val.booking_till).getDate() - new Date(val.booking_at).getDate())} per Night</p> */}
                                  <p className="m-0 text-sm ms-auto rounded">
                                    NPR{" "}
                                    {val.room?.price
                                      ? val.room?.price
                                      : val.property.price *
                                        (new Date(val.booking_till).getDate() -
                                          new Date(
                                            val.booking_at
                                          ).getDate())}{" "}
                                    for{" "}
                                    {new Date(val.booking_till).getDate() -
                                      new Date(val.booking_at).getDate()}{" "}
                                    Night(s)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        ) : (
                          <>
                            <div
                              key={ind}
                              className="d-flex flex-wrap my-2 py-3"
                            >
                              <div>
                                <img
                                  className="rounded"
                                  style={{
                                    height: "30ch",
                                    width: "40ch",
                                    objectFit: "cover",
                                  }}
                                  src={`http://localhost:5000/${val?.property?.images[0]}`}
                                  alt=""
                                />

                                <div className="about-hostel-owner mb-4 mt-4">
                                  <p className="text-sm text-secondary mb-1 fw-bold">
                                    Offered By
                                  </p>
                                  <div className="d-flex my-2">
                                    <div className="mx-2 my-auto">
                                      <p className="m-0 text-sm">
                                        <span className="fw-bold">
                                          Username:
                                        </span>{" "}
                                        {val?.username}
                                      </p>
                                      <p className="m-0 text-sm">
                                        <span className="fw-bold">Email:</span>{" "}
                                        {val?.email}
                                      </p>
                                      <p className="m-0 text-sm">
                                        <span className="fw-bold">Date:</span>{" "}
                                        {new Date(
                                          val?.booked_on
                                        )?.toDateString()}
                                      </p>

                                      {val?.accept ? (
                                        <>
                                          <button className="btn btn-success btn-sm my-2 px-2">
                                            Sell
                                          </button>
                                          <>{/* Button trigger modal */}</>
                                        </>
                                      ) : (
                                        <>
                                          {/* <button onClick={() => updateBooking(val?.property?._id)} className='btn btn-primary btn-sm my-2'>Accept</button> */}
                                          <button
                                            type="button"
                                            className="btn btn-primary btn btn-primary btn-sm my-2 rounded"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                          >
                                            Accept Offer
                                          </button>
                                          <button
                                            onClick={() =>
                                              rejectOffer(
                                                val?.email,
                                                val?.username,
                                                val?.property?.owner
                                              )
                                            }
                                            type="button"
                                            className="btn ms-3 px-2 btn-danger btn-sm my-2 rounded"
                                          >
                                            Reject
                                          </button>
                                          {/* Modal */}
                                          <div
                                            className="modal fade"
                                            id="exampleModalCenter"
                                            tabIndex={-1}
                                            role="dialog"
                                            aria-labelledby="exampleModalCenterTitle"
                                            aria-hidden="true"
                                          >
                                            <div
                                              className="modal-dialog"
                                              role="document"
                                            >
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h5
                                                    className="modal-title"
                                                    id="exampleModalLongTitle"
                                                  >
                                                    Accept The Offer Here
                                                  </h5>
                                                  <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                  >
                                                    <span aria-hidden="true">
                                                      ×
                                                    </span>
                                                  </button>
                                                </div>
                                                <div className="modal-body">
                                                  <div className="form-group">
                                                    <div className="col">
                                                      <label htmlFor="">
                                                        Meeting Date
                                                      </label>
                                                      <input
                                                        onChange={(e) =>
                                                          setappointment(
                                                            e.target.value
                                                          )
                                                        }
                                                        type="date"
                                                        className="form-control"
                                                      ></input>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="modal-footer">
                                                  <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-dismiss="modal"
                                                  >
                                                    Close
                                                  </button>
                                                  <button
                                                    onClick={() =>
                                                      updateBooking(
                                                        val?.property?._id
                                                      )
                                                    }
                                                    type="button"
                                                    className="btn btn-primary"
                                                  >
                                                    Save
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mx-3 col-md-4">
                                <div>
                                  <p className="m-0 fw-bold fs-5">
                                    {val?.property?.title}
                                  </p>
                                  <small className="text-xs rounded bg-primary text-light fw-bold py-1 px-1">
                                    {val?.property?.rating.toFixed(1)}
                                  </small>
                                  <small className="text-xs mx-2">
                                    <i className="fa-solid fa-location-dot me-1"></i>
                                    {val?.property?.address?.address} -{" "}
                                    {val?.property?.address?.city}
                                  </small>
                                </div>

                                <hr />
                                <div>
                                  <small className="text-sm">
                                    <i className="fa-solid fa-square-check me-1"></i>
                                    Offered
                                  </small>
                                  <small className="d-block text-sm">
                                    {new Date(val.booked_on).toDateString()}
                                  </small>
                                </div>

                                <hr />
                                <div className="d-flex flex-wrap my-2">
                                  <p className="m-0 text-sm fw-bold">
                                    Property Price
                                  </p>
                                  <p className="m-0 text-sm ms-auto rounded">
                                    NPR {val?.property?.price}
                                  </p>
                                </div>
                                <div className="d-flex flex-wrap">
                                  <p className="m-0 text-sm fw-bold">
                                    Offer Price
                                  </p>
                                  <p className="m-0 text-sm ms-auto rounded">
                                    NPR {val?.offer_price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <p>No results found</p>
                </>
              )}
            </>
          ) : (
            <>
              <p>Loading...</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookingmy;
