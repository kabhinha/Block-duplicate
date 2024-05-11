import { FaShoppingCart } from "react-icons/fa";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);


  return (
    <div>
      <nav className="flex justify-around items-center h-20 mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" alt="site-logo" className="h-14" />
          </div>
        </NavLink>
        <div className="flex flex-row items-center font-medium text-slate-100 mr-5 space-x-6">
          <div
            onClick={() =>
              navigate({
                pathname: '/listItems',
                search: '?category=Machine', // Set the search parameter
              })
            }
          >
            <p className="text-slate-800 hover:text-slate-950 cursor-pointer font-bold">Dashboard</p>
          </div>
          <div
            onClick={() =>
              navigate({
                pathname: '/Dashboard',
                search: '?category=Accessory', // Set the search parameter
              })
            }
          >
            <p className="text-slate-800 hover:text-slate-950 cursor-pointer font-bold">Medicine</p>
          </div>
          <div
            onClick={() =>
              navigate({
                pathname: '/listItems',
                search: '?category=All'
              })
            }
          >
            <p className="text-slate-800 hover:text-slate-950 cursor-pointer font-bold">Consult Doctor</p>
          </div>
          <div>
            <p className="text-slate-800 hover:text-slate-950 cursor-pointer font-bold">History</p>
          </div>
        </div>
        <div className="flex justify-around text-slate-100 w-[10%] cursor-pointer">
          <BiUserCircle
            className="text-slate-800 text-2xl"
            onClick={() => navigate("/profile")}
          />
          <BiSearch className="text-slate-800 text-2xl" />
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-slate-800" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        {
          !document.cookie ?
          <BiLogInCircle
            onClick={() => navigate('/login')}
            className="text-slate-800 text-2xl cursor-pointer"
          /> : ""
        }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
