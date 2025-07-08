// SEO utility for social media sharing
export interface ProfileSEOData {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: string;
    siteName?: string;
    author?: string;
    keywords?: string;
}

export const updateSEOTags = (data: ProfileSEOData) => {
    const setMetaTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`) ||
            document.querySelector(`meta[name="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            if (property.startsWith('og:') || property.startsWith('twitter:')) {
                tag.setAttribute('property', property);
            } else {
                tag.setAttribute('name', property);
            }
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    };

    // Set page title
    document.title = data.title;

    // Open Graph tags
    setMetaTag('og:title', data.title);
    setMetaTag('og:description', data.description);
    setMetaTag('og:image', data.image);
    setMetaTag('og:url', data.url);
    setMetaTag('og:type', data.type || 'profile');
    setMetaTag('og:site_name', data.siteName || 'iamdhakrey.dev');

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', data.title);
    setMetaTag('twitter:description', data.description);
    setMetaTag('twitter:image', data.image);

    // Standard meta tags
    setMetaTag('description', data.description);
    if (data.keywords) {
        setMetaTag('keywords', data.keywords);
    }
    if (data.author) {
        setMetaTag('author', data.author);
    }

    // Viewport and mobile optimization
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Additional SEO tags
    setMetaTag('robots', 'index, follow');
    setMetaTag('language', 'en');
    setMetaTag('theme-color', '#10b981'); // Green color matching the site
};

export const generateStructuredData = (profileData: any) => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profileData.name,
        "alternateName": profileData.username,
        "description": profileData.description,
        "url": profileData.website,
        "image": profileData.image,
        "sameAs": Object.values(profileData.socialLinks),
        "knowsAbout": profileData.skills,
        "jobTitle": profileData.title,
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance Developer"
        }
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
};

export const shareProfile = async (url: string, title: string, text: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text,
                url
            });
            return true;
        } catch (error) {
            console.error('Error sharing:', error);
            return false;
        }
    } else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            return true;
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            return false;
        }
    }
};
