import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChevronLeft } from "react-icons/bs";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, isLoggedIn } = useGlobalState();

  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [oldBookings, setOldBookings] = useState([]);
  const fetchUserDataAndBookings = async () => {
    try {
      // Fetch user data and bookings from the backend using user authentication
      const { data } = await axios.get(
        `http://localhost/back-end/get_user_and_bookings.php?email=${profile.email}`
      );

      console.log("profile data : ", data);

      setUserData(data.userData);
      setBookings(data.bookings);
      setOldBookings(data.oldBookings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (!isLoggedIn.state) {
      navigate("/");
    }
    fetchUserDataAndBookings();
  }, []);

  const returnCar = async (bookingId, carImmat) => {
    try {
      console.log(
        "submitting return car request with booking id : ",
        bookingId,
        " and car immat : ",
        carImmat
      );
      const { data } = await axios.post(
        `http://localhost/back-end/return_car.php?booking_id=${bookingId}&immat=${carImmat}`
      );
      console.log("return car response : ", data);
      toast.success("Car returned successfully");
      fetchUserDataAndBookings();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return Object.keys(profile).length === 0 ? (
    <h1>No Such Profile</h1>
  ) : (
    <div className="profile">
      <ToastContainer />
      <h2>Profile</h2>
      <div onClick={() => navigate("/")} div className="back-btn">
        <BsChevronLeft />
        <span>Home</span>
      </div>
      <div className="user-infos">
        <h3>User Information</h3>
        <div className="infos">
          <p>Username: </p>
          <p>{userData.username}</p>
          <p>Email: </p>
          <p>{userData.email}</p>
          <p>Phone Number: </p>
          <p>{userData.phone}</p>
          <p>Country: </p>
          <p>{userData.country}</p>
        </div>
      </div>
      <div className="booking-infos">
        <h3>Bookings</h3>
        {bookings.length === 0 ? (
          <h4>No Bookings</h4>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Agency</th>
                  <th>Model</th>
                  <th>Car Registration</th>
                  <th>Date Start</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.agency}</td>
                    <td>{booking.modele}</td>
                    <td>{booking.immatriculation}</td>
                    <td>{booking.date_start}</td>
                    <td>{booking.duration}</td>
                    <td>{booking.cost}</td>
                    <td className="end-btn-container">
                      <div
                        onClick={() =>
                          returnCar(
                            booking.reservation_id,
                            booking.immatriculation
                          )
                        }
                      >
                        End
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="booking-history">
        <details>
          <summary>Bookings History</summary>
          {oldBookings.length === 0 ? (
            <h4>No Bookings</h4>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Agency</th>
                    <th>Car Registration</th>
                    <th>Date Start</th>
                    <th>Duration</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {oldBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.agency}</td>
                      <td>{booking.immatriculation}</td>
                      <td>{booking.date_start}</td>
                      <td>{booking.duration}</td>
                      <td>{booking.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </details>
      </div>
    </div>
  );
};

export default Profile;
