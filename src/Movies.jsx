import React from "react";
import { CustomContext } from "./context/AppContext";
import { Link } from "react-router-dom";

const Movies = () => {
  const { movies, isLoading } = CustomContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-14 w-14 rounded-full border-8 border-white border-b-indigo-600"></div>
        <p className="text-center text-lg mt-3 ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl m-auto  p-8 rounded-md">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-100">
        Popular Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((data) => {
          return (
            <Link key={data.imdbID} to={`/movie/${data.imdbID}`}>
              <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-full h-96 object-cover group-hover:opacity-75 transition-opacity duration-300"
                  src={data.Poster}
                  alt={data.Title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full text-center bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {data.Title}
                  </h2>
                  <p className="text-sm text-gray-400">{data.Year}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
