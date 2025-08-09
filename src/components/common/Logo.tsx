import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 flex items-center">
        <NavLink
          to={"/"}
          className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">P</span>
        </NavLink>
        <div className="ml-3 hidden sm:block">
          <h1 className="text-xl font-bold text-gray-900">Poland Uni Finder</h1>
          <p className="text-xs text-gray-500 -mt-1">Find Your Future</p>
        </div>
      </div>
    </div>
  );
};
export default Logo;
