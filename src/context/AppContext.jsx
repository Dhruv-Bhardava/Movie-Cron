import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

const API_URL = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_API_KEY
}`;

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("hacker");

  const getMovie = async (url) => {
    setIsLoading(true); // Ensure loading state is set when fetching
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setMovies(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (err) {
      setIsError({ show: true, msg: "Something went wrong!" });
      console.log(err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-14 w-14 rounded-full border-8 border-white border-b-indigo-600"></div>
        <p className="text-center text-lg mt-3 ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{ isError, isLoading, movies, query, setQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const CustomContext = () => {
  return useContext(AppContext);
};
