import React, { useEffect, useState } from "react";
import "./AdminFacility.css";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import {
  HiPlus,
  HiOutlineSortDescending,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import AddFacilityForm from "../AdminComponents/AddFacilityForm";
import Toast from "../Components/Toast";
import useAuth from "../Hooks/useAuth";
import FacilityTableBody from "../AdminComponents/FacilityTableBody";
import AdminHospitalModal from "../AdminComponents/AdminHospitalModal";

const AdminFacility = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const { facilities } = useAuth();
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [hospital, setHospital] = useState([]);

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <AddFacilityForm
            setShowModal={setShowModal}
            setToast={setToast}
            setMessage={setMessage}
            setIsError={setIsError}
          />
        )}

        {showHospitalModal && (
          <AdminHospitalModal
            hospital={hospital}
            setShowHospitalModal={setShowHospitalModal}
          />
        )}
      </AnimatePresence>
      <div className="container">
        <AnimatePresence>
          {toast && (
            <Toast setToast={setToast} message={message} isError={isError} />
          )}
        </AnimatePresence>

        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <h2>Hospitals & Specializations</h2>
              <motion.button
                className="green-cta"
                onClick={() => setShowModal(true)}
                whileTap={{ scale: 0.9 }}
              >
                <p>
                  <HiPlus />
                </p>
                Add Hospital
              </motion.button>
            </div>
            <div className="above-table">
              <div className="patient-input-container">
                <input type="search" placeholder="Search facilities" />
                <div className="patient-input-icon">
                  <HiOutlineSearch />
                </div>
              </div>
              {/* <div className="above-table-right">
                <button className="fac-btns">
                  <p>
                    <HiOutlineFilter />
                  </p>
                  Filter
                </button>
                <button className="fac-btns">
                  <p>
                    <HiOutlineSortDescending />
                  </p>
                  Sort by
                </button>
              </div> */}
            </div>

            <div className="table-container">
              <div className="table">
                <div className="table-header">
                  <div className="fac-name">Hospital Name</div>
                  <div className="fac-doctors">Doctors</div>
                  <div className="fac-spec">Specializations</div>
                  <div className="fac-add">Address</div>
                </div>
                {facilities
                  .sort((a, b) => a.facility.localeCompare(b.facility))
                  .map((item, key) => {
                    return (
                      <FacilityTableBody
                        key={key + 1}
                        id={item._id}
                        number={key}
                        facility={item.facility}
                        address={item.address}
                        specialization={item.specialization}
                        users={item.user}
                        setHospital={setHospital}
                        setShowHospitalModal={setShowHospitalModal}
                        item={item}
                      />
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

export default AdminFacility;
