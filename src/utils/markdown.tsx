import React from 'react';

/**
 * Minimal inline markdown parser converting **bold** and `code`
 * without any external library dependencies.
 */
export function parseInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Split text by tokens: **bold** and `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-text">
          {inner}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="font-mono text-[13px] bg-subtle text-text rounded-[6px] px-[5px] py-[1px]"
        >
          {inner}
        </code>
      );
    }

    // Clean any accidental leftover single asterisks or stray backticks
    const cleaned = part.replace(/\*/g, '').replace(/`/g, '');
    return cleaned;
  });
}

/**
 * Strips all inline markdown for assertion tests and plain-text search.
 */
export function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*/g, '')
    .replace(/`/g, '');
}
