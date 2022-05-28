import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FcDocument } from "react-icons/fc";

const OutgoingCaseActive2 = ({ item, name, patientId }) => {
  const createdAt = new Date(item.createdAt);
  const navigate = useNavigate();

  const { facilities } = useAuth();

  const getDate = (date) => {
    let today =
      date.toLocaleString("en-us", { month: "short" }) +
      " " +
      createdAt.getDate() +
      "," +
      " " +
      createdAt.getFullYear();

    return today;
  };

  const getTime = (date) => {
    var options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    let today = new Date(date).toLocaleString("en-US", options);

    return today;
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(`/consultation/patients/case/${item._id}`, {
            state: { item: item, name: name, patientId: patientId },
          })
        }
        className="case-content"
      >
        <div className="case-content-avatar">
          <FcDocument />
        </div>
        <div className="case-content-data">
          <h1>{item.patient.firstname + " " + item.patient.lastname}</h1>

          <p>
            {
              facilities
                .filter((e) => e._id === item.designation._id)
                .map((f) => {
                  return f.specialization.filter(
                    (g) => g._id === item.specialization
                  )[0];
                })[0].name
            }
          </p>

          <p>{item.designation.facility}</p>

          <div className="case-content-date">
            <p>{getDate(createdAt)} </p>
            <p>{getTime(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OutgoingCaseActive2;
