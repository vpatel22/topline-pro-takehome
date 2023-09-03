import { useState } from "react";
import { PIXABAY_API_URL } from "../constants";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setShowNoResults(false);
    setIsLoading(true);

    const url = PIXABAY_API_URL + "&q=" + encodeURIComponent(searchQuery);
    const res = await fetch(url, {
      method: "GET",
    });

    if (res.status >= 400) {
      setError(res.statusText);
      setIsLoading(false);
      return;
    }

    const results = await res.json();
    if (results.totalHits === 0) {
      setQueryResults([]);
      setShowNoResults(true);
    } else {
      const images = results.hits.map(({ id, previewURL, tags }) => ({
        id: id,
        url: previewURL,
        tags: tags,
      }));
      setQueryResults(images);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <h1 className="App-header">
          <p>Welcome to Pixabay Image Search. Search for images below!</p>
        </h1>

        <label>
          Search for images:{" "}
          <input
            type="text"
            maxLength={100}
            placeholder="cool picture"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />{" "}
          <button onClick={handleSearch}>Search</button>
        </label>
        {error && <h3>{error}</h3>}
      </div>
      {isLoading && <h3>Loading...</h3>}
      {showNoResults && <h2>No Results Found</h2>}
      {queryResults.map((image) => (
        <Link to={`/images/${image.id}`}>
          <img className="search-results" src={image.url} alt={image.tags} />
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
