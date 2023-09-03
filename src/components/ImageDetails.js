import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PIXABAY_API_URL } from "../constants";

const ImageDetails = () => {
  const { imageId } = useParams();

  const [imageData, setImageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getImageData = async () => {
      setError("");
      setIsLoading(true);
      const url = PIXABAY_API_URL + "&id=" + imageId;
      const res = await fetch(url, {
        method: "GET",
      });

      if (res.status >= 400) {
        setError(`An image with id ${imageId} does not exist.`);
        setIsLoading(false);
        return;
      }

      const imageData = await res.json();
      if (imageData.totalHits > 1) {
        setError("Something is wrong, try again later...");
      } else {
        const { id, webformatURL, tags, user, userImageURL, user_id } =
          imageData.hits[0];
        setImageData({
          id: id,
          url: webformatURL,
          tags: tags,
          user,
          userImageURL,
          userId: user_id,
        });
      }
      setIsLoading(false);
    };

    getImageData();
  }, [imageId]);

  return (
    <>
      <h1 className="App-header">
        <Link to="/">
          <button>Go to the Home Page</button>
        </Link>
      </h1>
      {error && <h3>{error}</h3>}
      {isLoading && <h3>Loading...</h3>}
      <div>
        <img src={imageData.url} alt={imageData.tags} />
        <br />
        Tags: {imageData.tags}
      </div>

      <br />
      <span>
        <img
          src={imageData.userImageURL}
          alt={`User ${imageData.user}'s profile pic`}
          width={50}
        />{" "}
        User:{" "}
        <a
          href={`https://pixabay.com/users/${imageData.user}-${imageData.userId}/`}
          target="_blank"
          rel="noreferrer"
        >
          {imageData.user}
        </a>
      </span>
    </>
  );
};

export default ImageDetails;
