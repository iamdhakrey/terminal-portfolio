import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused = activeElement?.tagName === 'INPUT' || 
                            activeElement?.tagName === 'TEXTAREA' ||
                            (activeElement as HTMLElement)?.contentEditable === 'true';

      // Don't trigger shortcuts when typing in input fields
      if (isInputFocused) return;

      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export const getKeyboardShortcutsHelp = (): string[] => {
  return [
    "⌨️  Keyboard Shortcuts:",
    "═══════════════════════════════════════",
    "",
    "🔧 Terminal Shortcuts:",
    "  Ctrl + L       - Clear terminal",
    "  Ctrl + C       - Cancel current input",
    "  ↑/↓ Arrow     - Navigate command history",
    "  Tab            - Auto-complete commands",
    "",
    "🧭 Navigation Shortcuts:",
    "  Ctrl + H       - Go to home/terminal",
    "  Ctrl + P       - Go to projects",
    "  Ctrl + B       - Go to blogs",
    "  Ctrl + R       - Go to profile",
    "",
    "💡 Browser Shortcuts:",
    "  Ctrl + R       - Refresh page",
    "  F12            - Open developer tools",
    "  Ctrl + Shift + I - Open developer tools",
    "",
    "💡 Type 'shortcuts' to see this help anytime!"
  ];
};
