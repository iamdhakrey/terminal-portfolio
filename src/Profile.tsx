import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateSEOTags, generateStructuredData, shareProfile } from './utils/seoUtils';

function Profile() {
    const [profileData, setProfileData] = useState<any>(null);
    const [githubData, setGithubData] = useState<any>(null);
    const [shareMessage, setShareMessage] = useState('');

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const [profileResponse, githubResponse] = await Promise.all([
                    fetch('/profile-data.json'),
                    fetch('/github-projects.json')
                ]);

                const profileData = await profileResponse.json();
                const githubData = await githubResponse.json();

                setProfileData(profileData);
                setGithubData(githubData);

                // Update SEO tags for social sharing
                updateSEOTags({
                    title: `${profileData.name} (@${profileData.username}) - ${profileData.title}`,
                    description: profileData.description,
                    image: `${window.location.origin}${profileData.image}`,
                    url: window.location.href,
                    type: 'profile',
                    siteName: 'iamdhakrey.dev',
                    author: profileData.name,
                    keywords: `${profileData.name}, ${profileData.username}, ${profileData.skills.join(', ')}`
                });

                // Generate structured data for search engines
                generateStructuredData(profileData);
            } catch (error) {
                console.error('Error loading profile data:', error);
                // Fallback data
                setProfileData({
                    name: 'Hrithik Dhakrey',
                    username: 'iamdhakrey',
                    title: 'Full Stack Developer & DevOps Engineer',
                    description: 'Python Developer & DevOps Engineer | Discord Bot Developer | CLI Applications Creator',
                    image: '/dbgrq23-ee7a8ee2-ff35-431a-9c70-51b5e05246e5.jpg'
                });
                setGithubData({
                    stats: { totalRepos: 19, totalStars: 5, totalForks: 1 }
                });
            }
        };

        loadProfileData();
    }, []);

    const handleShare = async () => {
        const success = await shareProfile(
            window.location.href,
            `${profileData?.name} (@${profileData?.username}) - ${profileData?.title}`,
            `Check out ${profileData?.name}'s profile - ${profileData?.description}`
        );

        if (success) {
            if ('share' in navigator) {
                setShareMessage('Profile shared successfully! 🎉');
            } else {
                setShareMessage('Profile link copied to clipboard! 📋');
            }
        } else {
            setShareMessage('Unable to share profile. Please try again.');
        }

        // Clear message after 3 seconds
        setTimeout(() => setShareMessage(''), 3000);
    };

    if (!profileData) {
        return (
            <div className="min-h-screen bg-black text-green-400 font-mono pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-green-400 text-xl mb-4">🔄 Loading profile...</div>
                    <div className="text-gray-400">Please wait while we load your shareable profile</div>
                </div>
            </div>
        );
    }

    const skills = [
        { category: 'Languages', items: ['GoLang', 'Rust', 'Python', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SQL'] },
        { category: 'Frameworks', items: ['Echo(Go)', 'Actix(Rust)', 'FastAPI', 'Django', 'Flask', 'React', 'Tailwind CSS'] },
        { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Nginx'] },
        { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Redis', 'SQLite'] },
        { category: 'Tools', items: ['Git', 'VS Code', 'Postman', 'Discord.py', 'SQLAlchemy'] },
    ];

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono pb-16">
            <div className="max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
                {/* Terminal navigation */}
                <div className="mb-4 sm:mb-6">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <div className="flex items-center space-x-1 text-xs sm:text-sm">
                                <span className="text-blue-400 hidden sm:inline">user@localhost</span>
                                <span className="text-white hidden sm:inline">:</span>
                                <span className="text-blue-600 hidden sm:inline">~/profile</span>
                                <span className="text-white">$ </span>
                                <Link
                                    to="/"
                                    className="text-green-400 hover:text-green-300 underline"
                                >
                                    cd ~
                                </Link>
                            </div>
                            <span className="text-gray-500 text-xs sm:text-sm"># Back to home</span>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gray-800 border-b border-gray-700 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-400 text-sm ml-4">profile.sh</span>
                            </div>
                            <div className="text-gray-500 text-xs">
                                ./profile.sh --share
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8">
                        {/* Profile Header */}
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-4 border-green-400 overflow-hidden bg-gray-800">
                                <img
                                    src={profileData.image}
                                    alt={profileData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                                <span className="text-gray-600">$ </span>{profileData.name}
                            </h1>
                            <p className="text-blue-400 text-lg mb-2">@{profileData.username}</p>
                            <p className="text-gray-300 text-sm sm:text-base">
                                {profileData.description}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center">
                                <div className="text-yellow-400 text-xl sm:text-2xl font-bold">{githubData?.stats?.totalRepos || profileData.stats.projects}</div>
                                <div className="text-gray-400 text-xs sm:text-sm">Projects</div>
                            </div>
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center">
                                <div className="text-blue-400 text-xl sm:text-2xl font-bold">{githubData?.stats?.totalStars || profileData.stats.profileViews}</div>
                                <div className="text-gray-400 text-xs sm:text-sm">{githubData ? 'GitHub Stars' : 'Profile Views'}</div>
                            </div>
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center">
                                <div className="text-green-400 text-xl sm:text-2xl font-bold">{githubData?.stats?.totalForks || profileData.stats.streak}</div>
                                <div className="text-gray-400 text-xs sm:text-sm">{githubData ? 'GitHub Forks' : 'Streak'}</div>
                            </div>
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center">
                                <div className="text-purple-400 text-xl sm:text-2xl font-bold">{profileData.stats.botUsers}</div>
                                <div className="text-gray-400 text-xs sm:text-sm">Bot Users</div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600">## </span>Connect With Me
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {Object.entries(profileData.socialLinks).map(([platform, url], index) => (
                                    <a
                                        key={index}
                                        href={url as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="text-2xl mb-1">
                                            {platform === 'github' && '🐙'}
                                            {platform === 'telegram' && '📱'}
                                            {platform === 'linkedin' && '💼'}
                                            {platform === 'website' && '🌐'}
                                        </div>
                                        <div className="text-blue-400 text-sm capitalize">{platform}</div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600">## </span>Quick Navigation
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link
                                    to="/projects"
                                    className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
                                >
                                    <div className="text-3xl mb-2">🚀</div>
                                    <div className="text-orange-400 font-semibold mb-1">Projects</div>
                                    <div className="text-gray-400 text-xs">View {githubData?.stats?.totalRepos || '19'} repositories</div>
                                </Link>
                                <Link
                                    to="/blogs"
                                    className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
                                >
                                    <div className="text-3xl mb-2">📝</div>
                                    <div className="text-green-400 font-semibold mb-1">Blog Posts</div>
                                    <div className="text-gray-400 text-xs">Read technical articles</div>
                                </Link>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600">## </span>Technical Skills
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map((skillGroup, index) => (
                                    <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                        <h3 className="text-yellow-400 font-semibold mb-2 text-sm">
                                            {skillGroup.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            {skillGroup.items.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600">## </span>Achievements
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {profileData.achievements.map((achievement: any, index: number) => (
                                    <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                        <h3 className="text-yellow-400 font-semibold mb-1 text-sm">
                                            🏆 {achievement.title}
                                        </h3>
                                        <p className="text-gray-300 text-xs">{achievement.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current Focus */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-green-400 mb-4">
                                <span className="text-gray-600">## </span>Current Focus
                            </h2>
                            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    {profileData.currentFocus.map((item: string, index: number) => (
                                        <li key={index}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Fun Fact */}
                        <div className="bg-blue-900 border border-blue-600 rounded-lg p-4 text-center">
                            <p className="text-blue-200 text-sm">
                                🔍 <strong>Fun Fact:</strong> {profileData.funFact}
                            </p>
                        </div>

                        {/* Share Button */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleShare}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                📤 Share Profile
                            </button>
                            {shareMessage && (
                                <div className="mt-3 text-sm text-green-400">
                                    {shareMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Terminal footer */}
                <div className="mt-6 text-center text-gray-500 text-xs">
                    <p>
                        <span className="text-blue-400">user@localhost</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-600">~/profile</span>
                        <span className="text-white">$ </span>
                        <span className="text-green-400">echo "Profile shared successfully!"</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
