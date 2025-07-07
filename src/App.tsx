import "./App.css";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Terminal from "./Terminal";
import BlogList from "./BlogList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs";

// library.add(faGift);

function App() {
    return (
        <Router>
            <Navbar />
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<Terminal />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/blog/:filename" element={<Blogs />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
