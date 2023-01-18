import LoadingAnimation from "../LoadingAnimation";
import ErrorMessage from "../ErrorMessage";
import JourneyList from "./JourneyList";
import LocationList from "./LocationList";

const List = ({ isLoading, data, error, selectedItem, collection }) => {
  return (
    <div className="List">
      {isLoading && !error && (
        <div className="loading--container ">
          <LoadingAnimation />
        </div>
      )}
      {error && (
        <div className="error--container ">
          <ErrorMessage msg={error} />
        </div>
      )}
      {!isLoading && data && collection === "journeys" && (
        <JourneyList data={data} selectedItem={selectedItem} />
      )}
      {!isLoading && data && collection === "locations" && (
        <LocationList data={data} selectedItem={selectedItem} />
      )}
    </div>
  );
};

export default List;
