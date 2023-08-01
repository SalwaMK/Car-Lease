import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useGlobalState } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsChevronLeft } from "react-icons/bs";
import SignIn from "./SignIn";

const Reservation = () =>
{
  const { profile } = useGlobalState();
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [car, setCar] = useState({});
  const [formData, setFormData] = useState({
    email: profile.email ?? "",
    start: "",
    duration: "",
  });

  useEffect(() =>
  {
    const fetchReservation = async () =>
    {
      setLoading(true);
      try
      {
        const { data } = await axios.get(
          `http://localhost/back-end/get_car.php?id=${id}`
        );
        setCar(data);
        console.log("reservation data : ", data);
      } catch (error)
      {
        console.error("Error fetching data:", error);
      } finally
      {
        setLoading(false);
      }
    };
    fetchReservation();
  }, []);

  const handleFormChange = (e) =>
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      setFormLoading(true);
      const { email, start: start_date, duration } = formData;
      const { id: car_id } = car;
      const { data } = await axios.post(
        "http://localhost/back-end/reserve_car.php",
        { email, start_date, duration, car_id }
      );
      console.log("reservation response : ", data);
      toast.success("Reservation successful");

      setTimeout(() =>
      {
        navigate("/profile");
      }, 1500);
    } catch (error)
    {
      console.error("Error fetching data:", error);
    } finally
    {
      setFormLoading(false);
    }
  };

  return (
    <div className="reservation">
      <ToastContainer />
      <h3>New Reservation</h3>
      <div onClick={() => navigate(-1)} div className="back-btn">
        <BsChevronLeft />
        <span>Back</span>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <main>
          <div className="car-infos">
            <img src={car.image} alt="" />
            <div className="infos">
              <div className="title">Marque:</div>
              <div>{car.marque}</div>
              <div className="title">Modele:</div>
              <div>{car.modele}</div>
              <div className="title">Immatriculation:</div>
              <div>{car.immatriculation}</div>
              <div className="title">Agency:</div>
              <div>{car.agency}</div>
            </div>
          </div>
          <div className="reservation-input">
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="e.g. ex@exemple.com"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="input">
                <label htmlFor="start">Start Date</label>
                <input
                  type="date"
                  name="start"
                  id="start"
                  onChange={handleFormChange}
                  value={formData.start}
                />
              </div>
              <div className="input">
                <label htmlFor="duration">Duration</label>
                <input
                  name="duration"
                  id="duration"
                  onChange={handleFormChange}
                  value={formData.duration}
                />
              </div>
              <div className="footer">
                {formLoading && <div className="form-loading-spinner"></div>}
                <button disabled={formLoading}>Reserve</button>
                <div className="cancel-btn" onClick={() => navigate(-1)}>
                  Cancel
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
    </div>
  );
};

export default Reservation;
