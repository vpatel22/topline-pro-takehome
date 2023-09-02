import { useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <span>
        <h1>Welcome to Pixabay Image Search. Search for images below!</h1>

        <label>
          Search for images:{" "}
          <input
            type="text"
            maxLength={100}
            placeholder="cool+picture"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </label>
        <p>Search Text: {searchQuery}</p>
        <p>Search Text Length: {searchQuery.length}</p>
      </span>
    </div>
  );
};

export default HomePage;
