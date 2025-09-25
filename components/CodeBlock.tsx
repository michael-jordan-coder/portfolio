"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy, IconEdit, IconX } from "@tabler/icons-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  editable?: boolean;
  onCodeChange?: (newCode: string, tabIndex?: number) => void;
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  editable = false,
  onCodeChange,
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editCode, setEditCode] = React.useState("");
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(false);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const tabsExist = tabs.length > 0;

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Vertical scroll detection
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
      
      // Horizontal scroll detection
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;

  React.useEffect(() => {
    checkScrollPosition();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
    }
  }, [activeTab, activeCode]);

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const startEditing = () => {
    const currentCode = tabsExist ? tabs[activeTab].code : code;
    setEditCode(currentCode || "");
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (onCodeChange) {
      onCodeChange(editCode, tabsExist ? activeTab : undefined);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditCode("");
  };
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="relative w-full max-h-[600px] min-h-[400px] rounded-2xl bg-neutral-900 font-mono text-sm flex flex-col">
      <div className="flex flex-col gap-2 p-4 pb-2 flex-shrink-0">
        {tabsExist && (
          <div className="flex  overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center py-2">
          <div className="text-xs text-neutral-400">
            {tabsExist ? tabs[activeTab].name : filename}
          </div>
          <div className="flex items-center gap-2">
            {editable && !isEditing && (
              <button
                onClick={startEditing}
                className="flex items-center gap-1 text-xs font-sans transition-all duration-200 ease-out transform text-neutral-400 hover:text-neutral-200 hover:scale-105"
              >
                <IconEdit size={14} />
                <span>Edit</span>
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1 text-xs font-sans transition-all duration-200 ease-out transform text-green-400 hover:text-green-300 hover:scale-105"
                >
                  <IconCheck size={14} />
                  <span>Save</span>
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 text-xs font-sans transition-all duration-200 ease-out transform text-red-400 hover:text-red-300 hover:scale-105"
                >
                  <IconX size={14} />
                  <span>Cancel</span>
                </button>
              </>
            )}
            <button
              onClick={copyToClipboard}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`flex items-center gap-1 text-xs font-sans transition-all duration-200 ease-out transform ${
                copied 
                  ? 'text-green-400 scale-110' 
                  : isHovered 
                    ? 'text-neutral-200 scale-105 bg-neutral-800 px-2 py-1 rounded-lg' 
                    : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className={`transition-all duration-200 ${copied ? 'rotate-0' : isHovered ? 'rotate-12' : 'rotate-0'}`}>
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              </div>
              <span className={`transition-all duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                {copied ? 'Copied!' : ''}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 hover:scrollbar-thumb-neutral-500 relative"
      >
        {/* Scroll indicators */}
        {canScrollUp && (
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none z-10" />
        )}
        {canScrollDown && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none z-10" />
        )}
        {canScrollLeft && (
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-10" />
        )}
        
        {isEditing ? (
          <textarea
            value={editCode}
            onChange={(e) => setEditCode(e.target.value)}
            className="w-full h-full bg-transparent text-sm font-mono text-white resize-none outline-none border-none p-0 m-0"
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              lineHeight: '1.5',
            }}
            placeholder="Enter your code here..."
          />
        ) : (
          <SyntaxHighlighter
            language={activeLanguage}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: 0,
              background: "transparent",
              fontSize: "0.875rem", // text-sm equivalent
              minWidth: "max-content", // Ensure content doesn't wrap
            }}
            wrapLines={false}
            showLineNumbers={true}
            lineProps={(lineNumber) => ({
              style: {
                backgroundColor: activeHighlightLines.includes(lineNumber)
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
                display: "block",
                whiteSpace: "pre", // Prevent line wrapping
              },
            })}
            PreTag="div"
          >
            {String(activeCode)}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};
