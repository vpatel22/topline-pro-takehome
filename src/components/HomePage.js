import { useState } from "react";
import { PIXABAY_API_URL } from "../constants";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const url = PIXABAY_API_URL + "&q=" + encodeURIComponent(searchQuery);
    const res = await fetch(url, {
      method: "GET",
    });

    if (res.status >= 400) {
      setError(res.statusText);
      return;
    }

    const results = await res.json();
    if (results.totalHits === 0) {
      setQueryResults([]);
    }

    const images = results.hits.map(({ id, previewURL, tags }) => ({
      id: id,
      url: previewURL,
      tags: tags,
    }));
    setQueryResults(images);
  };
  return (
    <div>
      <span>
        <h1>Welcome to Pixabay Image Search. Search for images below!</h1>

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
        <p>Search Text: {searchQuery}</p>
        <p>Search Text Length: {searchQuery.length}</p>
      </span>
      {searchQuery && !queryResults && <h2>No Results Found</h2>}
      {queryResults.map((image) => (
        <img src={image.url} alt={image.tags} width={150} />
      ))}
    </div>
  );
};

export default HomePage;
