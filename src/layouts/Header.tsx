import { Link } from "react-router-dom"
import SearchIcon from "../components/svg/SearchIcon"
import Logo from "../components/svg/LogoIcon"
import User from "../components/svg/UserIcon"
import HeartIcon from "../components/svg/HeartIcon"
import CartIcon from "../components/svg/CartIcon"
function Header() {
  return (
    <>
      <div className="text-text-secondary">

        <div className="flex justify-between items-center py-1 px-[3rem] bg-primary text-text">
          <div></div>
          <div><p>🔥 Only 11 days left until VALENTINE'S DAY! 🔥</p></div>
          <div className="flex gap-[2rem]">
            <Link to="/">Help & Information</Link>
            <Link to="/">Connect with us</Link>
          </div>
        </div>

        <div className="flex justify-between items-center py-[1.725rem] px-[3rem]">
          {/* search */}
          <div>
            <form action="" className="flex justify-between w-[25rem] border-[1px] px-[2rem] py-[0.55rem] rounded-[1.8125rem] ">
              <input type="text" className="w-[80%] focus:outline-none" placeholder="Hey, what are you looking for?" />
              <button>
                <SearchIcon />
              </button>
            </form>
          </div>
          {/* logo */}
          <div>
            <Logo />
          </div>
          <div className="flex gap-[2rem]">
            <Link to="/MyAccount" className="flex justify-between items-center gap-2">
              <User />
              My Account
            </Link>
            <Link to="/MyAccount" className="flex justify-between items-center gap-2">
              <HeartIcon />
              Wishlist
            </Link>
            <Link to="/MyAccount" className="flex justify-between items-center gap-2">
              <CartIcon />
              My Items
            </Link>
          </div>
        </div>

        <div>
          <nav className="main-menu flex justify-center items-center py-3 px-[17rem] gap-[3rem] ">
            <Link to="/Perfumes">Perfumes</Link>
            <Link to="/Brands">Brands</Link>
            <Link to="/Skincare">Skincare</Link>
            <Link to="/Makeup">Makeup</Link>
            <Link to="/Haircare">Haircare</Link>
            <Link to="/Aromatherapy">Aromatherapy</Link>
            <Link to="/Candles">Candles</Link>
            <Link to="/Gifts">Gifts</Link>
          </nav>
        </div>

      </div>
    </>
  )
}

export default Header
