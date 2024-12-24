import {
  Calendar,
  Home,
  Settings,
  UsersIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaAppStore } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarTrigger } from "../ui/sidebar";
import { IoMdArrowDropright } from "react-icons/io";

// Menu items
const topItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
];

const bottomItems = [
  { title: "Apps", url: "/dashboard/apps", icon: FaAppStore },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({ isCollapsed, toggleSidebar, ownedChannels, enrolledChannels }) {
  const [ownedOpen, setOwnedOpen] = useState(false);
  const [enrolledOpen, setEnrolledOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isCollapsed) {
      toggleSidebar();
    } else {
      toggleSidebar();
      if (ownedOpen) setOwnedOpen(false);
      if (enrolledOpen) setEnrolledOpen(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 dark:text-white shadow-xl backdrop-blur-sm dark:shadow-gray-800/20 flex flex-col border-r border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Toggle Button */}
      <span className={`p-3 focus:outline-none ${isCollapsed ? "text-center" : "text-start"}`}>
        <SidebarTrigger 
          onClick={handleToggleSidebar}
          className="hover:bg-white/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-200 hover:shadow-md" 
        />
      </span>

      {/* Sidebar Items */}
      <nav className="flex-1 flex flex-col items-start space-y-5 p-4">
        {/* Top Items */}
        {topItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"} py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white shadow-lg shadow-blue-500/20" 
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
              </>
            )}
          </NavLink>
        ))}

        {/* Owned Channels */}
        <SidebarMenu 
          title="Owned" 
          icon={UsersIcon} 
          open={ownedOpen} 
          onOpenChange={setOwnedOpen} 
          isCollapsed={isCollapsed}
          className="w-full"
        >
          <Collapsible open={ownedOpen} onOpenChange={setOwnedOpen} className="group/collapsible w-full">
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className={`flex items-center w-full relative ${
                  isCollapsed ? "justify-center" : "px-4"
                } py-2.5 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md`}
              >
                <SidebarMenuButton
                  onClick={() => {
                    if (isCollapsed) toggleSidebar();
                    setOwnedOpen(!ownedOpen);
                  }}
                >
                  <IoMdArrowDropright
                    className={`transition-transform duration-300 absolute left-0 ${ownedOpen ? "rotate-90" : ""} ${
                      isCollapsed ? "hidden" : ""
                    }`}
                  />
                  <UsersIcon />
                  {!isCollapsed && <span className="ml-2">Owned Channels</span>}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="transition-all duration-200">
                <SidebarMenuSub>
                  {ownedChannels.length > 0 ? (
                    <div className={`mt-2 ml-6 space-y-1 ${isCollapsed ? "hidden" : ""}`}>
                      {ownedChannels.map((channel) => (
                        <NavLink
                          key={channel.title}
                          to={channel.url}
                          className={({ isActive }) =>
                            `flex items-center w-full px-4 py-2 rounded-md transition-all duration-200 ${
                              isActive 
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white shadow-lg shadow-purple-500/20" 
                                : "hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-sm text-gray-700 dark:text-gray-200"
                            } text-sm`
                          }
                        >
                          <span>{channel.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm mt-2 ml-6 text-gray-500 dark:text-gray-400 italic">
                      No owned channels.
                    </p>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        <Separator className="dark:bg-gray-700/50 bg-gray-200/50 my-2" />

        {/* Enrolled Channels */}
        <SidebarMenu title="Enrolled" icon={UsersIcon} open={enrolledOpen} onOpenChange={setEnrolledOpen} isCollapsed={isCollapsed}>
          <Collapsible open={enrolledOpen} onOpenChange={setEnrolledOpen} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className={`flex items-center w-full relative ${
                  isCollapsed ? "justify-center" : "px-4"
                } py-2.5 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md`}
              >
                <SidebarMenuButton
                  onClick={() => {
                    if (isCollapsed) toggleSidebar();
                    setEnrolledOpen(!enrolledOpen);
                  }}
                >
                  <IoMdArrowDropright
                    className={`transition-transform duration-300 absolute left-0 ${enrolledOpen ? "rotate-90" : ""} ${
                      isCollapsed ? "hidden" : ""
                    }`}
                  />
                  <UsersIcon />
                  {!isCollapsed && <span className="ml-2">Enrolled Channels</span>}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {enrolledChannels.length > 0 ? (
                    <div className={`mt-2 ml-6 ${isCollapsed ? "hidden" : ""}`}>
                      {enrolledChannels.map((channel) => (
                        <NavLink
                          key={channel.title}
                          to={channel.url}
                          className={({ isActive }) =>
                            `flex items-center w-full px-4 py-2 rounded-md transition-all duration-200 ${
                              isActive 
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white shadow-lg shadow-purple-500/20" 
                                : "hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-sm text-gray-700 dark:text-gray-200"
                            } text-sm`
                          }
                        >
                          <span>{channel.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm mt-2 ml-6 text-gray-500 dark:text-gray-400 italic">
                      No enrolled channels.
                    </p>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </nav>

      {/* Bottom Items */}
      <nav className="flex-none flex flex-col items-start space-y-3 p-4 mt-auto border-t border-gray-200 dark:border-gray-700/50 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800/50">
        {bottomItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"} py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white shadow-lg shadow-blue-500/20" 
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  ownedChannels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  enrolledChannels: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};