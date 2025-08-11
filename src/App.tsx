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
import { ThemeProvider } from "./utils/themeContext";
import { getTerminalConfig } from "./utils/configManager";
import { HelmetProvider } from "react-helmet-async";
import ModernBlogs from "./ModernBlogs";

// Redirect component for old blog URLs
function BlogRedirect() {
    const { filename } = useParams<{ filename: string }>();
    return <Navigate to={`/blogs/${filename}`} replace />;
}

// library.add(faGift);

function App() {
    const terminalConfig = getTerminalConfig();

    return (
        <HelmetProvider>
            <ThemeProvider defaultTheme={terminalConfig.theme}>
                <BrowserRouter>
                    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--theme-background)', color: 'var(--theme-text)' }}>
                        <Navbar />
                        <div className="flex-1">
                            <Routes>
                                <Route path="/" element={<Terminal />} />
                                <Route path="/blogs" element={<BlogList />} />
                                <Route path="/blogs/:filename" element={<ModernBlogs />} />
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
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
