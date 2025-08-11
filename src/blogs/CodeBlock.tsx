import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
    code: string;
    language: string;
    title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title }) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current && language) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="relative my-6 rounded-lg border overflow-hidden" style={{
            backgroundColor: 'var(--theme-background)',
            borderColor: 'var(--theme-border)'
        }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{
                backgroundColor: 'var(--theme-welcomeBoxBg)',
                borderColor: 'var(--theme-border)'
            }}>
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    {title && (
                        <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                            {title}
                        </span>
                    )}
                    {language && (
                        <span className="text-xs px-2 py-1 rounded-md font-mono" style={{
                            backgroundColor: 'var(--theme-primary)',
                            color: 'var(--theme-background)'
                        }}>
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 px-3 py-1 text-sm rounded-md transition-colors hover:opacity-75"
                    style={{
                        color: 'var(--theme-muted)',
                        backgroundColor: 'transparent'
                    }}
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto">
                <pre className="p-4 text-sm font-mono leading-relaxed" style={{
                    backgroundColor: 'var(--theme-background)',
                    color: 'var(--theme-text)'
                }}>
                    <code ref={codeRef} className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};
