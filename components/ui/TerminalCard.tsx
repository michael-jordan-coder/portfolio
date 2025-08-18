"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  command: string;
  language?: string;
  className?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ command, language = "javascript", className }) => {
  const [copied, setCopied] = useState(false);

  // Copy handler
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Copy button - positioned absolutely in top-right corner */}
      <button
        className="absolute top-3 right-3 p-2 rounded-md hover:bg-black/70 text-gray-300 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>

      {/* Code block container */}
      <div className="bg-transparent rounded-lg border border-gray-700 overflow-hidden shadow-lg">
        {/* Language indicator */}
        <div className="bg-transparent px-4 py-2 border-b border-gray-700">
          <span className="text-gray-300 text-sm font-mono">{language}</span>
        </div>
        
        {/* Code content with syntax highlighting */}
        <div className="p-4 max-h-[400px] overflow-auto">
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{ 
              background: "transparent", 
              margin: 0, 
              padding: 0,
              fontSize: "14px",
              lineHeight: "1.5"
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {command}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
