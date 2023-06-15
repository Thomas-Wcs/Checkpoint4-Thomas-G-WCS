import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import "../scss/index.css";

export default function AdminWall({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? (
    children
  ) : (
    <div id="img-admin-wall">
      <img
        style={{ width: "75%" }}
        src="https://media.istockphoto.com/id/478063817/fr/vectoriel/acc%C3%A8s-refus%C3%A9-timbre.jpg?s=2048x2048&w=is&k=20&c=o0Oivgq2t-XPkfI8qqHU1a0tIkRzlzyD_CIqUcz_vNM="
        alt="accesRefusé"
        className="image-acces-denied"
      />
    </div>
  );
}

AdminWall.propTypes = {
  children: PropTypes.element.isRequired,
};
