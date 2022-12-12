import "../styles/components/Letters.scss";
import PropTypes from "prop-types";

function ErrorLetters(props) {
  return (
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">{props.renderErrorLetters()}</ul>
    </div>
  );
}
ErrorLetters.propTypes = {
  renderErrorLetters: PropTypes.func.isRequired,
};

export default ErrorLetters;
