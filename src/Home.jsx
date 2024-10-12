import React from "react";
import Search from "./Search";
import Movies from "./Movies";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Search />
      <Movies />
    </div>
  );
};

export default Home;
