import React from "react";
import { CustomContext } from "./context/AppContext";

const Search = () => {
  const { query, setQuery, isError } = CustomContext();
  return (
    <div className="max-w-screen-xl m-auto p-8 flex justify-center">
      <div className="relative">
        <h3 className="text-white text-xl mr-3 ">Search for Movies</h3>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="w-60 h-12 px-4   bg-gray-800 text-white placeholder-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        {isError.show && (
          <p className="text-red-600 text-md mt-2">{isError.msg}</p> 
        )}
      </div>
    </div>
  );
};

export default Search;
