import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../api/useAPI";

export default function Header() {
  const api = useAPI();
  const navigate = useNavigate();
  const { success, isAdmin } = useAuth();
  const [isSearchClosed, setIsSearchClosed] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const searchOnGoogle = () => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(` "bientot on pourras chercher sur notre site : ${textSearch}`);
  };

  const checkboxRef = useRef();

  function handleSearch() {
    if (textSearch) {
      searchOnGoogle(textSearch);
    }
  }

  function expand() {
    setIsSearchClosed(!isSearchClosed);
    setTextSearch("");
  }

  function handleLinkClick() {
    checkboxRef.current.checked = false;
  }

  const handleLogOut = () => {
    delete api.defaults.headers.authorization;
    setSuccess(!success);
    handleLinkClick();
    setIsAdmin(false);
    navigate("/connexion");
  };

  return (
    <div id="nav-body">
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input
              className="checkbox"
              type="checkbox"
              name=""
              id=""
              ref={checkboxRef}
            />
            <div className="hamburger-lines">
              <span className="line line1" />
              <span className="line line2" />
              <span className="line line3" />
            </div>
            <form id="content">
              <input
                type="text"
                name="input"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setTextSearch("");
                    expand();
                  }
                }}
                className={`input ${isSearchClosed ? "square" : ""}`}
              />
              <button
                type="button"
                className={`search ${isSearchClosed ? "close" : ""}`}
                onClick={expand}
                aria-label="search"
              />
            </form>
            <div className="menu-items">
              <li>
                <Link to="/" onClick={() => handleLinkClick()}>
<<<<<<< HEAD
                  Accueil
=======
                  Acceuil
>>>>>>> a1e58afa1166dcd1d3284a336414625cd0066004
                </Link>
              </li>
              {success ? (
                <li>
                  <Link to="/connexion" onClick={() => handleLinkClick()}>
                    Connexion
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={() => handleLinkClick()}>
<<<<<<< HEAD
                    Mon Profil
=======
                    Profil
>>>>>>> a1e58afa1166dcd1d3284a336414625cd0066004
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li>
                  <Link to="/adminPanel/" onClick={() => handleLinkClick()}>
                    Administrateur
                  </Link>
                </li>
              )}
              {!success && (
                <button
                  className="user-button"
                  type="button"
                  onClick={handleLogOut}
                >
<<<<<<< HEAD
                  Deconnexion
=======
                  Déconnexion
>>>>>>> a1e58afa1166dcd1d3284a336414625cd0066004
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
