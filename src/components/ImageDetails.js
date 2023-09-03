import { Link, useParams } from "react-router-dom";

const ImageDetails = () => {
  const { imageId } = useParams();

  return (
    <>
      <div>
        <Link to="/">
          <button>Go to the Home Page</button>
        </Link>
      </div>
      <h1>{imageId}</h1>
    </>
  );
};

export default ImageDetails;
