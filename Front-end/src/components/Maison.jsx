import Car from "./Car";
import Filter from "./Filter";

import axios from "axios";
import { useEffect, useState } from "react";
import
{
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillTwitterCircle,
} from "react-icons/ai";
import Header from "./Header";
import Testimonials from "./Testimonial";

const Maison = () =>
{
  const [cars, setCars] = useState([]);

  useEffect(() =>
  {
    const fetchCars = async () =>
    {
      try
      {
        const { data } = await axios.get(
          `http://localhost/back-end/get_cars.php`
        );
        console.log("cars data : ", data);
        setCars(data);
      } catch (error)
      {
        console.error("Error fetching data:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <div className="home">
          <h1>Accelerate your dreams</h1>
          <h1>Top Cars with best prizes</h1>
        </div>
        <section className="section-one" id="catalog">
          <h3>Search for your preferred car</h3>
          {/*<div className="filters">
            <Filter title="Transmission" option1="Automatic" option2="Manual" />
            <Filter title="Category" option1="Compact" option2="Economic" />
            <Filter title="Carburant" option1="Diesel" option2="Essence" />
  </div>*/}
        </section>

        <section className="sectionThree" id="cars-catalog">
          <div className="tout">
            {cars.map((car) => (
              <Car car={car} />
            ))}
          </div>
        </section>
        <section className="sectionFour" id="about">
          <div className="about-section">
            <div className="cover"></div>
            <div className="infos">
              <h4>About us</h4>
              <p>Eveything you need to get top quality car with best prizes</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                gravida congue urna, eu iaculis augue vestibulum et.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quos.
                Expedita temporibus nisi veritatis sed dolore quae, fugiat nam recusandae
                omnis exercitationem corporis nihil eaque quos sit odio, aspernatur fugit!
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quos.
                Expedita temporibus nisi veritatis sed dolore quae, fugiat nam recusandae
                omnis exercitationem corporis nihil eaque quos sit odio, aspernatur fugit!
              </p>
            </div>
          </div>
        </section>
        <Testimonials />
      </main>
      <footer className="contact" id="contact">
        <h4>Follow us on:</h4>
        <div className="social">
          <a>
            <AiFillPhone />
          </a>
          <a href="www.facebook.com">
            <AiFillFacebook />
          </a>
          <a href="www.twitter.com">
            <AiFillTwitterCircle />
          </a>
          <a href="www.instagram.com">
            <AiFillInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Maison;
