import { useState, useEffect } from "react";

import SelectCollection from "../components/createNewJourney/SelectCollection";
import JourneyForm from "../components/createNewJourney/JourneyForm";
import LocationForm from "../components/createNewJourney/LocationForm";
import LoadingAnimation from "../components/LoadingAnimation";

const CreateNewJourney = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationNames, setLocationNames] = useState([]);
  const [createInCollection, setCreateInCollection] = useState("journeys");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:5000/locations/getAll?fields=Nimi,ID`
        );

        const json = await res.json();

        setLocationNames(json.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="CreateNewJourney">
      <div className="container">
        {isLoading && <LoadingAnimation />}
        {!isLoading && (
          <>
            <SelectCollection setCreateInCollection={setCreateInCollection} />
            {createInCollection === "journeys" && (
              <JourneyForm locationNames={locationNames} />
            )}
            {createInCollection === "locations" && <LocationForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNewJourney;
