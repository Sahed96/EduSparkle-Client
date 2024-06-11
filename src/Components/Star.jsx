/* eslint-disable react/prop-types */
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const Star = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elm, index) => {
    let number = index + 0.5;
    return (
      <a key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon " />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <FaRegStar className="icon" />
        )}
      </a>
    );
  });
  //   console.log(stars);
  return (
    <div>
      <div className="icon-style text-orange-500 flex items-center">
        {ratingStar} <span className="ml-2 text-black">{stars}</span>
      </div>
    </div>
  );
};

export default Star;
