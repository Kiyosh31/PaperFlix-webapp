import React from "react";

import ReactStars from "react-rating-stars-component";

const StarRating = (props) => {
  return (
    <div>
      <ReactStars
        count={5}
        onChange={props.changed}
        size={40}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#e50914"
      />
    </div>
  );
};

export default StarRating;
