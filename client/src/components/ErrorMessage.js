import { ReactComponent as WarningSVG } from "../assets/warning.svg";

const ErrorMessage = ({ msg }) => {
  return (
    <div className="ErrorMessage">
      <WarningSVG />
      <span>{msg}</span>
    </div>
  );
};

export default ErrorMessage;
