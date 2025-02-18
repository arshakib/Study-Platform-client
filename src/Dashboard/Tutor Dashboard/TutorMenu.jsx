import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  BriefcaseIcon,
  InboxIcon,
  CircleStackIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    icon: PresentationChartBarIcon,
    label: "Profile",
    path: "/dashboard/profile",
  },
  {
    icon: PresentationChartBarIcon,
    label: "Create Session",
    path: "/dashboard/createsession",
  },
  {
    icon: BriefcaseIcon,
    label: "View Session",
    path: "/dashboard/tutorsession",
  },
  { icon: InboxIcon, label: "Upload Materials", path: "/dashboard/materials" },
  {
    icon: CircleStackIcon,
    label: "View All Materials",
    path: "/dashboard/viewmaterials",
  },
];

const TutorSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="p-4 lg:hidden">
        <IconButton
          onClick={toggleMenu}
          variant="text"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          )}
        </IconButton>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } inset-0 z-50 flex lg:static lg:block`}
      >
        <Card
          className="h-full w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-full max-w-[20rem]"
          onClick={() => setIsOpen(false)}
        >
          {/* Sidebar Header */}
          <div className="mb-4 p-4">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-lg sm:text-xl lg:text-2xl"
            >
              Tutor Sidebar
            </Typography>
          </div>

          {/* Menu Items */}
          <List className="space-y-2">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <ListItem
                key={label}
                className="p-2 hover:bg-blue-gray-50 rounded-lg"
              >
                <ListItemPrefix>
                  <Icon className="h-5 w-5" />
                </ListItemPrefix>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block text-sm sm:text-base ${
                      isActive
                        ? "text-blue-900 font-semibold underline"
                        : "text-gray-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
    </>
  );
};

export default TutorSidebar;
