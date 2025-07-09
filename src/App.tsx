import "./App.css";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Terminal from "./Terminal";
import BlogList from "./BlogList";
import Profile from "./Profile";
import Projects from "./Projects";
import { Routes, Route, HashRouter } from "react-router-dom";
import Blogs from "./Blogs";

// library.add(faGift);

function App() {
    return (
        <HashRouter>
            <div className="min-h-screen flex flex-col bg-black pb-16"> {/* Added padding bottom for fixed footer */}
                <Navbar />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Terminal />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/blog/:filename" element={<Blogs />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/projects" element={<Projects />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
