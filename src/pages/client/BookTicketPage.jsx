import { useParams } from "react-router-dom";

const BookTicketPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>BookTicketPage</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default BookTicketPage;
