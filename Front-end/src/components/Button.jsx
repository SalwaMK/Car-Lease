import { AiOutlineSearch } from "react-icons/ai";
const Button = (props) => {
  return (
    <button className={props.class}>
      {props.btn} <AiOutlineSearch />
    </button>
  );
};

export default Button;
