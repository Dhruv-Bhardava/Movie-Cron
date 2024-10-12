import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomContext } from "./context/AppContext";

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isError, setIsError } = CustomContext();
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&i=${id}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
          setIsError({ show: false, msg: "" });
        } else {
          setIsError({ show: true, msg: data.Error });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, setIsError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-14 w-14 rounded-full border-8 borde-white border-b-indigo-600 "></div>
        <p className="text-center text-lg mt-3 ml-2">Loading...</p>
      </div>
    );
  }

  if (isError.show) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <h2>Error: {isError.msg}</h2>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900 items-center min-h-screen justify-center">
      <div className="max-w-screen-lg mx-auto p-6 bg-gray-800 shadow-2xl text-white rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-300"
        >
          Back
        </button>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-auto h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg mb-2">
                <strong>Year:</strong> {movie.Year}
              </p>
              <p className="text-lg mb-2">
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p className="text-lg mb-2">
                <strong>Director:</strong> {movie.Director}
              </p>
              <p className="text-lg mb-2">
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p className="text-lg mb-4">
                <strong>IMDB Rating:</strong> {movie.imdbRating}
              </p>
              <p className="text-lg mb-4">
                <strong>Runtime:</strong> {movie.Runtime}
              </p>
            </div>
            <h2 className="text-xl font-semibold mt-4">Plot</h2>
            <p className="text-gray-300 mb-4">{movie.Plot}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Awards</h2>
              <p className="text-gray-400">
                {movie.Awards || "No awards available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
