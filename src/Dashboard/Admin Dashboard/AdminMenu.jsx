import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  InboxIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function DefaultSidebar() {
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Admin Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>

          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold underline" : ""
            }
            to="/dashboard/allusers"
          >
            View all users
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BriefcaseIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold underline" : ""
            }
            to="/dashboard/tutorsession"
          >
            View all study session
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold underline" : ""
            }
            to="/dashboard/materials"
          >
            View all materials
          </NavLink>
        </ListItem>
      </List>
    </Card>
  );
}
