import LoadingAnimation from "../LoadingAnimation";
import ErrorMessage from "../ErrorMessage";
import JourneyList from "./JourneyList";
import LocationList from "./LocationList";

const List = ({ isLoading, data, error, selectedItem, collection }) => {
  return (
    <div className="List">
      {error && (
        <div className="error--container ">
          <ErrorMessage msg={error.message} />
        </div>
      )}
      {isLoading && !error && (
        <div className="loading--container ">
          <LoadingAnimation />
        </div>
      )}
      {!isLoading && !error && data && collection === "journeys" && (
        <JourneyList data={data} selectedItem={selectedItem} />
      )}
      {!isLoading && !error && data && collection === "locations" && (
        <LocationList data={data} selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default List;
