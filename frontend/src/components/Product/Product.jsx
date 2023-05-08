import { Link } from "react-router-dom";
import "./Featureproduct.css";

const Product = ({ product }) => {
  const imageUrl = product.images && product.images[0] ? product.images[0].url : null;

  return (
    <>
      <Link to={`/product/${product._id}`} className="pro" >
        {imageUrl && <img src={imageUrl} alt="" />}
        <div className="des">
          <span>{product.seller}</span>
          <h5>{product.name}</h5>
          <div className="star ratings">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} review)</span>
          </div>
          <h4>${product.price}</h4>
        </div>
      </Link>
    </>
  );
};

export default Product;
