import { useState } from "react";

const LocationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = {
        Nimi: name,
        Osoite: address,
        Kaupunki: city,
        Kapasiteet: capacity,
        x: x,
        y: y,
      };

      fetch("http://localhost:5000/locations/createNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      document.getElementById("location--form").reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="LocationForm">
      <h2>Location Form</h2>
      <form id="location--form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form--flex">
          <div className="form--item">
            <span>Name</span>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form--item">
            <span>Address</span>
            <input type="text" onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="form--flex">
          <div className="form--item">
            <span>City</span>
            <input type="text" onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="form--item">
            <span>Bicycle Capacity</span>
            <input
              type="number"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>
        <div className="form--flex">
          <div className="form--item">
            <span>X</span>
            <input type="text" onChange={(e) => setX(e.target.value)} />
          </div>
          <div className="form--item">
            <span>Y</span>
            <input type="text" onChange={(e) => setY(e.target.value)} />
          </div>
        </div>
        <div className="submit--container form--flex">
          <div></div>
          <div className="submit--btn__container form--item">
            <button type="reset" className="clear">
              Clear
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationForm;
