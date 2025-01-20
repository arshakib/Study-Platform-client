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
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export default function DefaultSidebar() {
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 md:max-w-[16rem] lg:w-[20rem] ">
      <div className="mb-2 p-4 sm:w-10">
        <Typography variant="h5" color="blue-gray">
          Tutor Sidebar
        </Typography>
      </div>
      <List className="flex flex-col md:flex-row lg:flex-col lg:gap-4">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold underline" : ""
            }
            to="/dashboard/createsession"
          >
            Create Session
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
            View Session
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
            Upload Materials
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CircleStackIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-900 font-semibold underline" : ""
            }
            to="/dashboard/viewmaterials"
          >
            View All Materials
          </NavLink>
        </ListItem>
      </List>
    </Card>
  );
}
