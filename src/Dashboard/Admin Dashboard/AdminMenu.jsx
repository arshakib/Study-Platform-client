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
  InboxIcon,
  BriefcaseIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu visibility on mobile/tablet
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button: visible on mobile/tablet */}
      <div className="p-4 lg:hidden">
        <IconButton onClick={toggleMenu} variant="text">
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
          {/* Menu Header */}
          <div className="mb-4 p-4">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-lg sm:text-xl lg:text-2xl"
            >
              Admin Sidebar
            </Typography>
          </div>

          {/* Navigation List */}
          <List className="space-y-2">
            {/* Analytics */}
            <ListItem className="p-2 hover:bg-blue-gray-50 rounded-lg">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `block text-sm sm:text-base ${
                    isActive
                      ? "text-blue-900 font-semibold underline"
                      : "text-gray-700"
                  }`
                }
              >
                Analytics
              </NavLink>
            </ListItem>

            {/* Profile */}
            <ListItem className="p-2 hover:bg-blue-gray-50 rounded-lg">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `block text-sm sm:text-base ${
                    isActive
                      ? "text-blue-900 font-semibold underline"
                      : "text-gray-700"
                  }`
                }
              >
                Profile
              </NavLink>
            </ListItem>

            {/* View all users */}
            <ListItem className="p-2 hover:bg-blue-gray-50 rounded-lg">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink
                to="/dashboard/allusers"
                className={({ isActive }) =>
                  `block text-sm sm:text-base ${
                    isActive
                      ? "text-blue-900 font-semibold underline"
                      : "text-gray-700"
                  }`
                }
              >
                View all users
              </NavLink>
            </ListItem>

            {/* View all study sessions */}
            <ListItem className="p-2 hover:bg-blue-gray-50 rounded-lg">
              <ListItemPrefix>
                <BriefcaseIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink
                to="/dashboard/viewallsession"
                className={({ isActive }) =>
                  `block text-sm sm:text-base ${
                    isActive
                      ? "text-blue-900 font-semibold underline"
                      : "text-gray-700"
                  }`
                }
              >
                View all study sessions
              </NavLink>
            </ListItem>

            {/* View all materials */}
            <ListItem className="p-2 hover:bg-blue-gray-50 rounded-lg">
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink
                to="/dashboard/viewallmaterials"
                className={({ isActive }) =>
                  `block text-sm sm:text-base ${
                    isActive
                      ? "text-blue-900 font-semibold underline"
                      : "text-gray-700"
                  }`
                }
              >
                View all materials
              </NavLink>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}
