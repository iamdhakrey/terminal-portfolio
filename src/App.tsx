import "./App.css";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Terminal from "./Terminal";
import BlogList from "./BlogList";
import Profile from "./Profile";
import Projects from "./Projects";
import StatusBar from "./StatusBar";
import NotFound from "./NotFound";
import { Routes, Route, BrowserRouter, Navigate, useParams } from "react-router-dom";
import Blogs from "./Blogs";

// Redirect component for old blog URLs
function BlogRedirect() {
    const { filename } = useParams<{ filename: string }>();
    return <Navigate to={`/blogs/${filename}`} replace />;
}

// library.add(faGift);

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-black"> {/* Removed padding bottom for fixed footer */}
                <Navbar />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Terminal />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/blogs/:filename" element={<Blogs />} />
                        <Route path="/blog/:filename" element={<BlogRedirect />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <StatusBar />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
