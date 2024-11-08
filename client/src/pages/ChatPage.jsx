import { useAuthStore } from "../store/useAuthStore";
import Header from "../components/Header";
import { useMessageStore } from "../store/useMessageStore";
import { useMatchStore } from "../store/useMatchStore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";
import { useUserStore } from "../store/useUserStore";
import { formatToReadableTime } from "../utils/formatToReadableTime";

const ChatPage = () => {
  const {
    messages,
    getMessages,
    subscribeToNewMassages,
    unsubscribeFromNewMassages,
  } = useMessageStore();
  const { authUser } = useAuthStore();
  const { getMyMatches, matches, loading } = useMatchStore();
  const { onlineUsers } = useUserStore();

  const { id } = useParams();

  const match = matches.find((m) => m?._id === id);

  useEffect(() => {
    if (authUser && id) {
      getMyMatches();
      getMessages(id);
      subscribeToNewMassages();
    }

    return () => {
      unsubscribeFromNewMassages();
    };
  }, [
    getMyMatches,
    authUser,
    subscribeToNewMassages,
    unsubscribeFromNewMassages,
    id,
    getMessages,
  ]);

  if (loading) return <LoadingMessageUI />;

  if (!match) {
    return <MatchNotFound />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-opacity-50">
      <Header />

      <div className="flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center mb-4 bg-white rounded-lg shadow p-3 relative">
          <img
            src={match.image || "/avatar.png"}
            alt="User image"
            className="w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300"
          />
          <h2 className="text-xl font-semibold text-gray-800">{match?.name}</h2>
          <div className="absolute right-5 flex items-center gap-x-2 text-xs">
            <span
              className={`w-[10px] h-[10px] rounded-full ${
                onlineUsers.includes(match._id) ? "bg-pink-500" : "bg-slate-400"
              }  `}
            ></span>
            <span>
              {onlineUsers.includes(match._id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4">
          {/* Messages */}

          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Start your conversation with {match?.name}
            </p>
          ) : (
            Array.isArray(messages) &&
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-3 relative ${
                  msg.sender === authUser._id ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block py-2 px-3 rounded-lg max-w-xs lg:max-w-md relative ${
                    msg.sender === authUser._id
                      ? "bg-pink-500 text-white text-left"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
                <div className="h-3 ml-2 text-[10px] relative">
                    {/* <span className="">01:00 AM</span> */}
                    <span className="mt-2 text-pink-500">{formatToReadableTime(msg.createdAt)}</span>
                  </div>
              </div>
            ))
          )}
        </div>
        <MessageInput match={match} />
      </div>
    </div>
  );
};

export default ChatPage;

const MatchNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <UserX size={64} className="mx-auto text-pink-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Match Not Found
        </h2>
        <p className="text-gray-600">
          Oops! It seems this match doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 inline-block"
        >
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};

const LoadingMessageUI = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <Loader size={48} className="mx-auto text-pink-500 animate-spin mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading Chat
        </h2>
        <p className="text-gray-600">
          Please wait while we fetch your conversation...
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <div
            className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>

          <div
            className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
