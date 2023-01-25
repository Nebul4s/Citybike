const OneWaySlider = ({
  title,
  bicycleCapacity,
  setBicycleCapacity,
  maxValue,
}) => {
  const handleCapacitySlider = (e) => {
    const progress = document.querySelector(".progress");
    setBicycleCapacity(e.target.value);

    progress.style.left = (0 / maxValue) * 100 + "%";
    progress.style.right = 100 - (bicycleCapacity / maxValue) * 100 + "%";
  };

  return (
    <div className="capacity--slider">
      <h2>{title}</h2>
      <div className="inputs--container">
        <input
          className="field--input"
          type="number"
          onInput={(e) => handleCapacitySlider(e)}
          value={bicycleCapacity}
        />
        <div className="slider--container">
          <div className="slider">
            <div className="progress"></div>
          </div>

          <input
            type="range"
            min={0}
            max={maxValue}
            value={bicycleCapacity}
            step={1}
            onInput={handleCapacitySlider}
          />
        </div>
      </div>
    </div>
  );
};

export default OneWaySlider;
