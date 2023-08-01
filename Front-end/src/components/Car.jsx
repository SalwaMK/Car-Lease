import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Car = (props) =>
{
  const { marque, image, id, modele, annee, tarifs, immatriculation, agency } = props.car;

  return (
    <div className="card">
      <img src={image} />
      <div className="infos">
        <h1>{"Mark: "} {marque}   </h1>
        <h1>{"Model: "} {modele}</h1>
        {/*<h1>{"Year: "} {annee}</h1>*/}
        <h1>{"Immatriculation "} {immatriculation}</h1>
        <h1>{"Agency: "}{agency}</h1>
        {/*<h1>{"Cost: "} {tarifs}</h1>*/}
        <div className="button">
          <Link to={`/reservation/${id}`} className="link">
            Book Car
          </Link>
          <FaAngleRight />{" "}
        </div>
      </div>
    </div>
  );
};

export default Car;
