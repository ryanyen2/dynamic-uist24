import Image from "next/image";
import Banner from "./components/Banner";
import Topic from "./components/Topic";
import Agenda from "./components/Agenda";
import Joining from "./components/Joining";
import Organizers from "./components/Organizers";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main className="container mx-auto">
      <Banner />
      <div className="relative">
        {/* <div className="w-full h-1 bg-gray-300 my-8 relative flex justify-center">
          <button className="absolute -top-3 w-6 h-6 bg-gray-300 border-2 border-white rounded-full" />
        </div> */}
        <Topic />
        <Agenda />
        <Joining />
        <Organizers />
        <Footer />
      </div>
    </main>
  );
}
