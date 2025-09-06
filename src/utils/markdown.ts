import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";


export function renderMarkdown(src: string, lang: string): string {
    try {
        // Check if the language is supported by highlight.js
        if (lang && hljs.getLanguage(lang)) {
            const highlighted = hljs.highlight(src, { language: lang }).value;
            return highlighted;
        } else {
            // Fallback: try to auto-detect the language
            const autoHighlighted = hljs.highlightAuto(src);
            return autoHighlighted.value;
        }
    } catch (error) {
        // If highlighting fails, return escaped HTML
        return hljs.highlight(src, { language: 'plaintext' }).value;
    }
}