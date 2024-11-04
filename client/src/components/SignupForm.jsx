import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  const { signup, loading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, gender, age, genderPreference });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="name"
            name="name"
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="block font-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="age"
            name="age"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={18}
            max={120}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Gender */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700 ">
          Your Gender
        </label>
        <div className="mt-2 flex-gap-2 flex items-center gap-x-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="male"
              name="gender"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="female"
              name="gender"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="other"
              name="gender"
              checked={gender === "other"}
              onChange={() => setGender("other")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="other" className="ml-2 block text-sm text-gray-900">
              Other
            </label>
          </div>
        </div>
      </div>

      {/* Gender Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prefer me
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-male"
              name="gender-preference"
              value="male"
              checked={genderPreference === "male"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="prefer-male"
              className="ml-2 block text-sm text-gray-900"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-female"
              name="gender-preference"
              value="female"
              checked={genderPreference === "female"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="prefer-female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="prefer-both"
              name="gender-preference"
              value="both"
              checked={genderPreference === "both"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label
              htmlFor="prefer-both"
              className="ml-2 block text-sm text-gray-900"
            >
              Both
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-mdeium text-white ${
          loading
            ? "bg-pink-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
        }`}
        disabled={loading}
      >
        {loading ? "Signing up" : "Sign up"}
      </button>
    </form>
  );
};

export default SignupForm;
