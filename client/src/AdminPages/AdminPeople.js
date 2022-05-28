import React, { useEffect, useState } from "react";
import "./AdminPeople.css";
import "./AdminDashboard.css";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminHeader from "../AdminComponents/AdminHeader";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiOutlineSortDescending,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import useAuth from "../Hooks/useAuth";
import { buttonVariant } from "../Animations/Animations";
import NoUser from "../Assets/nouser.png";
import { useClickOutside } from "../Hooks/useClickOutside";
import { AnimatePresence } from "framer-motion";
import { dropdownVariants } from "../Animations/Animations";

const AdminPeople = () => {
  const [showModal, setShowModal] = useState(false);

  const { listUsers, patients, facilities, user } = useAuth();
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    setFacility(facilities);
  }, [facilities]);

  const [term, setTerm] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState("Oldest");
  const [searchDropdown, setSearchDropdown] = useState(false);

  let domNodeSearch = useClickOutside(() => {
    setSearchDropdown(false);
  });

  let domNodeSort = useClickOutside(() => {
    setIsSort(false);
  });

  return (
    <>
      <div className="container">
        <AdminSidebar />

        <div className="content">
          <AdminHeader />
          <div className="content-body">
            <div className="container-heading">
              <h2>List of Doctors</h2>
              {/* <motion.button
                className="green-cta"
                onClick={() => setShowModal(true)}
                variants={buttonVariant}
                whileTap="tap"
              >
                <p>
                  {" "}
                  <HiPlus />
                </p>
                Add User
              </motion.button> */}
            </div>
            <div className="above-patient-table">
              <div className="patient-input-container">
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="search"
                  onFocus={() => setSearchDropdown(true)}
                  placeholder="Search patient (last name, first name)"
                />
                <div className="patient-input-icon">
                  <HiOutlineSearch />
                </div>

                {searchDropdown && (
                  <div ref={domNodeSearch} className="advance-search">
                    {!term ? (
                      <p>Type in the search bar</p>
                    ) : (
                      <p>You searched for "{term}"</p>
                    )}
                  </div>
                )}
              </div>

              <div className="above-patient-table-btns">
                {/* <button
                  className={isSort ? "btn-active" : "btn-inactive"}
                  onClick={() => {
                    setIsSort(!isSort);
                  }}
                >
                  <p>
                    <HiOutlineSortDescending />
                  </p>
                  Sort by: {sort}
                  <AnimatePresence>
                    {isSort && (
                      <motion.div
                        ref={domNodeSort}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="sort-dropdown"
                      >
                        <ul>
                          <li
                            onClick={() => {
                              setSort("Oldest");
                            }}
                          >
                            Oldest
                          </li>
                          <li
                            onClick={() => {
                              setSort("Newest");
                            }}
                          >
                            Newest
                          </li>

                          <li
                            onClick={() => {
                              setSort("Name (A-Z)");
                            }}
                          >
                            Name (A-Z)
                          </li>
                          <li
                            onClick={() => {
                              setSort("Name (Z-A)");
                            }}
                          >
                            Name (Z-A)
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button> */}
              </div>
            </div>

            <div className="table-container">
              <div className="table">
                <div className="table-header">
                  <div className="admin-user-name">Full Name</div>
                  <div className="admin-user-patients">Total Patients</div>
                  <div className="admin-user-spec">Specialization</div>
                  <div className="admin-user-hospital">Hospital</div>
                  <div className="us-status">Active Status</div>
                </div>
                {listUsers
                  .filter((e) => e.userType !== "admin" && e.verified === true)
                  .filter((val) => {
                    if (term === "") {
                      return val;
                    } else if (
                      val.fullname
                        .toLowerCase()
                        .includes(term.toLocaleLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((item, key) => {
                    return (
                      <div key={key} className="table-body">
                        <div className="admin-user-name">
                          <p>
                            <img
                              src={!item.picture ? NoUser : item.picture}
                              alt="Profile Picture"
                            />{" "}
                            Dr. {item.firstname + " " + item.lastname}
                          </p>
                        </div>
                        <div className="admin-user-patients">
                          {
                            patients.filter((e) => e.physician._id === item._id)
                              .length
                          }
                        </div>
                        <div className="admin-user-spec">
                          {facility.length === 0
                            ? null
                            : facility
                                .filter((e) => e._id === item.designation)
                                .map((items) => {
                                  return items.specialization.filter(
                                    (spec) => spec._id === item.specialization
                                  )[0];
                                })[0].name}
                        </div>
                        <div className="admin-user-hospital">
                          {facility.length === 0
                            ? null
                            : facility
                                .filter((e) => e._id === item.designation)
                                .map((item) => {
                                  return item.facility;
                                })}
                        </div>

                        <div
                          className={
                            item.activeStatus === "Online"
                              ? "us-status online"
                              : "us-status"
                          }
                        >
                          <p
                            className={
                              item.activeStatus === "Offline"
                                ? "offline"
                                : "online"
                            }
                          ></p>{" "}
                          {item.activeStatus}
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

export default AdminPeople;
