import { useState } from "react";
import { DEFAULT_IMAGES_PER_PAGE, PIXABAY_API_URL } from "../constants";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async ({ pageNumber, isNewSearch = false }) => {
    console.log(pageNumber);
    setError("");
    setShowNoResults(false);
    setIsLoading(true);

    const url =
      PIXABAY_API_URL +
      "&per_page=" +
      DEFAULT_IMAGES_PER_PAGE +
      "&q=" +
      encodeURIComponent(searchQuery) +
      "&page=" +
      String(pageNumber);
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
      if (isNewSearch) {
        setTotalPages(Math.ceil(results.totalHits / DEFAULT_IMAGES_PER_PAGE));
        setPageNum(1);
      }
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
          <button
            onClick={() => {
              handleSearch({ pageNumber: 1, isNewSearch: true });
            }}
          >
            Search
          </button>
        </label>
        {error && <h3>{error}</h3>}
      </div>
      {isLoading && <h3>Loading...</h3>}
      {showNoResults && <h2>No Results Found</h2>}
      {queryResults.map((image) => (
        <Link key={image.id} to={`/images/${image.id}`}>
          <img className="search-results" src={image.url} alt={image.tags} />
        </Link>
      ))}
      <br />
      {pageNum > 0 && (
        <span>
          {pageNum > 1 && (
            <button
              onClick={() => {
                setPageNum((page) => page - 1);
                handleSearch({ pageNumber: pageNum - 1 });
              }}
            >
              Previous Page
            </button>
          )}{" "}
          {pageNum}{" "}
          {pageNum < totalPages && (
            <button
              onClick={() => {
                setPageNum((page) => page + 1);
                handleSearch({ pageNumber: pageNum + 1 });
              }}
            >
              Next Page
            </button>
          )}
        </span>
      )}
    </div>
  );
};

export default HomePage;
