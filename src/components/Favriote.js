import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Favriote = ({
  handleClose,
  show,
  data = [],
  handleDelete = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Favorite</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data?.length > 0 &&
            data?.map((data) => (
              <div className="position-relative hoverEffect mb-3">
                <img
                  onClick={() =>
                    navigate(`/view-details/${data?.property?._id}`)
                  }
                  className="rounded "
                  style={{
                    height: "25ch",
                    width: "40ch",
                    objectFit: "cover",
                  }}
                  src={`http://localhost:5000/${data.property.images[0]}`}
                  alt=""
                />
                <i
                  className="fas fa-heart position-absolute text-danger"
                  onClick={() => handleDelete(data?._id)}
                  style={{ right: "20px", top: "5px", fontSize: "25px" }}
                ></i>
              </div>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Favriote;
