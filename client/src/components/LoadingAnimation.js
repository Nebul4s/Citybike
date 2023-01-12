import { ReactComponent as GearSVG } from "../assets/gear.svg";

const LoadingAnimation = () => {
  return (
    <div className="animation--container">
      <GearSVG className="large" />
      <GearSVG className="medium" />
      <GearSVG className="small" />
      <div className="loading--text__container">
        <h2>Loading</h2>
        <div className="loading--dots">
          <span className="dot--one"></span>
          <span className="dot--two"></span>
          <span className="dot--three"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
