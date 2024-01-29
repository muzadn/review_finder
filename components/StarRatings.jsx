 const StarRating = ({ rating }) => {
    // Generate star icons based on the rating
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  
    return <span className="flex">{stars}</span>;
  };
  export default StarRating