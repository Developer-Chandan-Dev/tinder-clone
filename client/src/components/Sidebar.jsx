import { Heart, Loader, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";
import { useUserStore } from "../store/useUserStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { getMyMatches, matches, loading } = useMatchStore();
  const { onlineUsers } = useUserStore();
  console.log(onlineUsers, matches);

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-1/4`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 pb-[27px] border-b border-pink-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-pink-600">Matches</h2>
            <button
              className="lg:hidden p-1 text-gray-500 hover:gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>
          {/* content area */}
          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {loading ? (
              <LoadingState />
            ) : !matches || matches === "undefined" || matches.length === 0 ? (
              <NoMatchesFound />
            ) : (
              Array.isArray(matches) &&
              matches.map((match) => (
                <Link key={match._id} to={`/chat/${match._id}`}>
                  <div className="flex items-center mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors duration-300 relative">
                    <img
                      src={match.image || "/avatar.png"}
                      alt="User image"
                      className="size-12 object-cover rounded-full mr-3 border-2 border-pink-300"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {match.name}
                    </h3>
                    <span className={`w-3 h-3 rounded-full ${onlineUsers.includes(match._id) ? "bg-pink-500" :''}  absolute right-5`}></span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 p-2 bg-pink-500 text-white rounded-md z-0"
        onClick={toggleSidebar}
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
};

export default Sidebar;

const NoMatchesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Heart className="text-pink-400 mb-4" size={48} />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Matches Yet
      </h3>
      <p className="text-gray-500 max-w-xs">
        Don&apos;t worry! Your perfect matche is just around the corner. Keep
        swiping!
      </p>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Loader className="text-pink-500 mb-3 animate-spin" size={48} />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Loading Matches
      </h3>
      <p className="text-gray-500 max-w-xs">
        We&apos;re finding your perfect matches. This might take a moment...
      </p>
    </div>
  );
};
