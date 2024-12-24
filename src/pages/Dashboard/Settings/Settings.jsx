import ChangeBackground from "@/components/ChangeBackground/ChangeBackground";
import ChangePassword from "@/components/ChnagePassword/ChangePassword";
import Profile from "@/components/Profile/Profile";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, LockIcon, ImageIcon, InfoIcon } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "password":
        return <ChangePassword />;
      case "background":
        return <ChangeBackground />;
      default:
        return <Profile />;
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
    },
    {
      id: "password",
      label: "Password",
      icon: LockIcon,
    },
    {
      id: "background",
      label: "Background",
      icon: ImageIcon,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        {/* Main Content Card */}
        <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border dark:border-gray-700 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b dark:border-gray-700">
            <div className="flex p-4 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                    ${activeTab === tab.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <tab.icon className={`w-4 h-4 ${
                    activeTab === tab.id ? "text-white" : "text-gray-500 dark:text-gray-400"
                  }`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-sm text-blue-600 dark:text-blue-300">
          <div className="flex items-center gap-2">
            <InfoIcon className="w-4 h-4" />
            <p>Changes are automatically saved when you modify any setting.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;