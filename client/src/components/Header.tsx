import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
function Header() {
  const {currentUser} = useSelector((state: RootState) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">MERN</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex items-center gap-6">
          <Link to="/">
            <li className="hidden sm:inline cursor-pointer text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline cursor-pointer text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {currentUser.email !== "" ? (
            <Link to="/profile">
              <img src={currentUser?.avatar} alt="Profile Photo" className="rounded-full w-7 h-7 object-cover"/>
            </Link>
          ):(
            <Link to="/sign-in">
            <li className="cursor-pointer text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>
          )}
          {/* <Link to="/sign-in">
            <li className="cursor-pointer text-slate-700 hover:underline">
              Sign In
            </li>
          </Link> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;
