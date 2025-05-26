import Stat from "../components/Stat";
import Carousel from "../components/Carousel";
import React from "react";
import Footer from "../components/Footer";

function Home() {
  return (
 <div className="flex flex-col items-center gap-y-5">
 <Carousel/>
 <Stat/>
 </div>
  );
}

export default Home;
