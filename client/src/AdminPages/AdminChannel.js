import React from "react";
import "./AdminPeople.css";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AdminChannel = () => {
  const navigate = useNavigate();
  const { reports } = useAuth();

  const getDate = (date) => {
    let todate = new Date(date);
    let today =
      todate.toLocaleString("en-us", { month: "short" }) +
      " " +
      todate.getDate() +
      "," +
      " " +
      todate.getFullYear();

    return today;
  };
  return (
    <>
      <div className="container">
        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="content-wrapper">
              <div className="reports-header">
                <h2>Reports</h2>
              </div>

              <div className="table">
                <div className="table-header">
                  <div className="rp-id">Report ID</div>
                  <div className="rp-created">Created By</div>
                  <div className="rp-date">Date Created</div>
                  <div className="rp-modified">Last modified</div>
                </div>
                {reports.map((item, index) => {
                  return (
                    <div key={index} className="table-body">
                      <div className="rp-id">
                        <p
                          onClick={() =>
                            navigate(
                              `/admin-reports/${item._id}/${item.reportId}`
                            )
                          }
                        >
                          {item.reportId}
                        </p>
                      </div>
                      <div className="rp-created">
                        Dr.{" "}
                        {item.creator.firstname + " " + item.creator.lastname}
                      </div>
                      <div className="rp-date">{getDate(item.createdAt)}</div>
                      <div className="rp-modified">
                        {
                          <ReactTimeAgo
                            date={item.updatedAt}
                            locale="en-US"
                            timeStyle="round-minute"
                          />
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChannel;
