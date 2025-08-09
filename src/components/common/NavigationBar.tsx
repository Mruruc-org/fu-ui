import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router";

const NavigationBar = () => {
  const navigationItems = [
    { name: "Programs", href: "#", hasDropdown: true },
    { name: "Universities", href: "#" },
    { name: "Scholarships", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];
  const programsDropdownItems = [
    { name: "Bachelor's Programs", href: "#" },
    { name: "Master's Programs", href: "#" },
    { name: "PhD Programs", href: "#" },
    { name: "Popular Fields", href: "#" },
  ];

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-1">
        {navigationItems.map((item) => (
          <div key={item.name} className="relative group">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              {item.name}
              {item.hasDropdown && (
                <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
              )}
            </button>
            {item.hasDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {programsDropdownItems.map((program) => (
                    <NavLink
                      key={program.name}
                      to={program.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      {program.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default NavigationBar;
