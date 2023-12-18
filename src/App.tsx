import "./App.css";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Terminal from "./Terminal";

// library.add(faGift);
function App() {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Navbar />
            <Terminal />
            <Footer />
        </div>
    );
}

export default App;
