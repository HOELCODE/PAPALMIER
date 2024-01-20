import { useEffect, useState } from "react";

// Parses the JSON returned by a network request
const parseJSON = (resp) => (resp.json ? resp.json() : resp);

// Checks if a network request came back fine, and throws an error if not
const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  return parseJSON(resp).then((resp) => {
    throw resp;
  });
};

const headers = { "Content-Type": "application/json" };

const App = () => {
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/restaurants", { headers, method: "GET" })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ data }) => setRestaurants(data))
      .catch((error) => setError(error));
  }, []);

  const [catégories, setCatégories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/categories", { headers, method: "GET" })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ data }) => setCatégories(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App">
      <ul>
        {restaurants.map(({ id, attributes }) => (
          <li key={id}>{attributes.Name}</li>
        ))}
        {catégories.map(({ id, attributes }) => (
          <li key={id}>{attributes.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
