import React, { useEffect, useRef, useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGlobalState } from "../Context";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = (props) => {
  const { isLoggedIn, logout } = useGlobalState();

  const [showlinks, setShowlinks] = useState(false);
  const navRef = useRef();
  const linksRef = useRef();

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height;
    navRef.current.style.height = showlinks ? `${linksHeight + 25}px` : "0";
  }, [showlinks]);

  return (
    <nav className="nav">
      <div className="logo">
        <AiFillCar className="car-logo" />{" "}
        <h1>
          <span>C</span>ar <span>L</span>ease
        </h1>
      </div>

      <div className="menu">
        <ul className="links">
          <li>
            <AnchorLink href="#home">
              <Link to="/">Home</Link>
            </AnchorLink>
          </li>
          <li>
            <AnchorLink offset="60" href="#catalog">
              Catalog
            </AnchorLink>
          </li>
          <li>
            <AnchorLink offset="60" href="#about">
              About
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href="#testimonials">Testimonials</AnchorLink>
          </li>
          <li>
            <AnchorLink href="#contact">Contact</AnchorLink>
          </li>
          {isLoggedIn.state ? (
            <>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <div className="logout-btn" onClick={() => logout()}>
                <a>Logout</a>
              </div>
            </>
          ) : (
            <li>
              <Link to="/signIn">Log In</Link>
            </li>
          )}
        </ul>
      </div>
      <div
        className="burger"
        onClick={() => {
          setShowlinks((prev) => !prev);
        }}
      >
        <RxHamburgerMenu />
      </div>
      <div
        ref={navRef}
        className={`dropdown-menu ${showlinks && "show-container"}`}
      >
        <ul ref={linksRef} className="links">
          <li>
            <AnchorLink onClick={() => setShowlinks(false)} href="#home">
              <Link to="/">Home</Link>
            </AnchorLink>
          </li>
          <li>
            <AnchorLink
              onClick={() => setShowlinks(false)}
              offset="60"
              href="#catalog"
            >
              Catalog
            </AnchorLink>
          </li>
          <li>
            <AnchorLink
              onClick={() => setShowlinks(false)}
              offset="60"
              href="#about"
            >
              About
            </AnchorLink>
          </li>
          <li>
            <AnchorLink
              onClick={() => setShowlinks(false)}
              href="#testimonials"
            >
              Testimonials
            </AnchorLink>
          </li>
          <li>
            <AnchorLink onClick={() => setShowlinks(false)} href="#contact">
              Contact
            </AnchorLink>
          </li>
          {isLoggedIn.state ? (
            <>
              <li>
                <Link to="/Profile">Profile</Link>
              </li>
              <div className="logout-btn" onClick={() => logout()}>
                <a>Logout</a>
              </div>
            </>
          ) : (
            <li>
              <Link to="/signIn">Log In</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
