import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>MovieDetailPage</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
};

export default MovieDetailPage;
