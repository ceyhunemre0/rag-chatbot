import Header from "./components/Header";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import Upload from "./components/Upload";

export default function Home() {
  return (
  <div className="bg-white text-black transition-colors duration-300 min-h-screen flex flex-col">
    <Header />
    <Chat />
    <Footer />
  </div>
  );
} 
