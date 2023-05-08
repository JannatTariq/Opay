import "./Header.css";
import { Link } from "react-router-dom";
import { User, Loader, Search } from "../../allComponents";
import { useDispatch, useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    });
  }, []);

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <header className="header">
          <div className="scontainer flex">
            <div className="logo">
              <Link to="/shop">
                <h1>Opay</h1>
              </Link>
            </div>
            <Search />
            <div className="account flexCenter">
            <Link to="/shop" style={{marginRight: '30px', color: 'black'}}>
                <div className="card">
                  <BsShop className="cardIcon" />
                </div>
              </Link>
              <Link to="/cart" style={{ color: 'black'}}>
                <div className="card">
                  <BiShoppingBag className="cardIcon" />
                  {cartItems.length === 0 ? '' : <span className="flexCenter">{cartItems.length}</span>}
                  
                </div>
              </Link>
              <User />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
