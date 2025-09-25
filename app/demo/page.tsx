'use client';

import WobbleCardDemo from "@/components/ui/wobble-card-demo";
import { CodeBlock } from "@/components/CodeBlock";
import DomeGallery from "@/components/DomeGallery";
import { useState } from "react";

// Import all unused components for demo
import Aurora from "@/components/Aurora";
import { Button } from "@/components/Button";
import ContactModal from "@/components/ContactModal";
import { DotPattern } from "@/components/DotPattern";
import ImageTest from "@/components/ImageTest";
import ImageTrail from "@/components/ImageTrail";
import LivingSquaresGrid from "@/components/LivingSquaresGrid";
import Navbar from "@/components/Navbar";
import NeonBlobs from "@/components/NeonBlobs";
import NextProjectButton from "@/components/NextProjectButton";
import { ScrollToButton } from "@/components/ScrollToButton";
import TextType from "@/components/TextType";

// Import UI components
import { AnimatedTestimonialsDemo } from "@/components/ui";
import { KPICard } from "@/components/ui";
import TerminalCard from "@/components/ui/TerminalCard";

export default function DemoPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [tabs, setTabs] = useState([
    {
      name: "Component.tsx",
      code: `import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

export const MyComponent = () => {
  return (
    <CodeBlock
      language="typescript"
      filename="example.ts"
      code={\`const hello = "world";\`}
      highlightLines={[1]}
    />
  );
};`,
      language: "tsx"
    },
    {
      name: "NoteClassifier.swift",
      code: `//
//  NoteClassifier.swift
//  SwiftNoteClassifier
//
//  Created by SwiftNoteClassifier on 2025-01-27.
//

import Foundation
import Combine

/// Main classifier that combines heuristics and LLM
@MainActor
public class NoteClassifier: ObservableObject {
    
    // Required by ObservableObject when no @Published properties are present
    public let objectWillChange = ObservableObjectPublisher()
    
    // MARK: - Properties
    
    private let heuristicClassifier: HeuristicClassifier
    private let llmClient: LLMClient
    private let config: OllamaConfig
    
    // MARK: - Configuration Constants
    
    private let minConfidenceThreshold: Double = 0.6
    private let heuristicConfidence: Double = 0.95
    
    // MARK: - Initialization
    
    public init(config: OllamaConfig = OllamaConfig()) {
        self.config = config
        self.heuristicClassifier = HeuristicClassifier()
        self.llmClient = LLMClient(config: config)
    }
    
    // MARK: - Public Methods
    
    /// Classify a note using heuristics first, then LLM if needed
    /// - Parameter note: The note text to classify
    /// - Returns: ClassificationResult
    public func classify(_ note: String) async -> ClassificationResult {
        let trimmedNote = note.trimmingCharacters(in: .whitespacesAndNewlines)
        
        // Handle empty notes
        guard !trimmedNote.isEmpty else {
            return ClassificationResult(
                label: .notes,
                confidence: 0.0,
                subtype: nil,
                rationale: "empty note"
            )
        }
        
        // Try heuristics first
        if let heuristicResult = heuristicClassifier.classify(trimmedNote) {
            return heuristicResult
        }
        
        // Fall back to LLM
        let systemPrompt = PromptBuilder.buildSystemPrompt()
        let userPrompt = PromptBuilder.buildUserPrompt(note: trimmedNote)
        
        guard let llmResult = await llmClient.generate(systemPrompt: systemPrompt, userPrompt: userPrompt) else {
            // Fallback if LLM fails completely
            return ClassificationResult(
                label: .notes,
                confidence: 0.0,
                subtype: nil,
                rationale: "LLM unavailable, defaulting to Notes"
            )
        }
        
        // Apply tie-break logic for low confidence
        if llmResult.confidence < minConfidenceThreshold {
            let tieBreakLabel = applyTieBreak(note: trimmedNote, originalLabel: llmResult.label)
            if tieBreakLabel != llmResult.label {
                // Adjust confidence based on tie-break
                let confidenceBoost: Double = tieBreakLabel == .quotes || tieBreakLabel == .people || tieBreakLabel == .snippets ? 0.15 : 0.05
                let adjustedConfidence = max(0.0, min(1.0, llmResult.confidence + confidenceBoost))
                
                // Determine subtype for tie-break result if it's Actionable
                let subtype = determineSubtypeForActionable(note: trimmedNote, label: tieBreakLabel)
                
                return ClassificationResult(
                    label: tieBreakLabel,
                    confidence: adjustedConfidence,
                    subtype: subtype,
                    rationale: "Enhanced classification from \\(llmResult.label.rawValue): \\(llmResult.rationale)"
                )
            }
        }
        
        // Additional validation: if heuristic result exists and LLM confidence is moderate,
        // prefer heuristic for certain categories where they're highly accurate
        if let heuristicResult = heuristicClassifier.classify(trimmedNote),
           llmResult.confidence < 0.85 {
            // Trust heuristics for categories where they're extremely accurate
            if [.quotes, .people, .shopping, .links, .snippets, .actionable].contains(heuristicResult.label) {
                let subtype = determineSubtypeForActionable(note: trimmedNote, label: heuristicResult.label)
                
                return ClassificationResult(
                    label: heuristicResult.label,
                    confidence: max(llmResult.confidence, 0.90),
                    subtype: subtype,
                    rationale: "High-accuracy heuristic override: \\(heuristicResult.rationale)"
                )
            }
        }
        
        return llmResult
    }
    
    /// Test if the LLM service is available
    /// - Returns: true if service is available, false otherwise
    public func testConnection() async -> Bool {
        return await llmClient.testConnection()
    }
    
    // MARK: - Private Methods
    
    private func applyTieBreak(note: String, originalLabel: Category) -> Category {
        // Get secondary heuristics that might have been missed
        if let heuristicResult = heuristicClassifier.classify(note) {
            return heuristicResult.label
        }
        
        // Return original label if no tie-break available
        return originalLabel
    }
    
    private func determineSubtypeForActionable(note: String, label: Category) -> ActionableSubtype? {
        guard label == .actionable else { return nil }
        
        let textLower = note.lowercased()
        
        // Check for todo-like patterns (imperatives/verbs)
        let todoPatterns = ["finish", "update", "implement", "call", "buy", "pack", "write", "review", "create", "send", "email", "prepare", "schedule", "book"]
        let todoCount = todoPatterns.filter { textLower.contains($0) }.count
        
        // Check for idea-like patterns (conceptual)
        let ideaPatterns = ["idea", "concept", "what if", "vision", "maybe", "consider", "think about", "proposal"]
        let ideaCount = ideaPatterns.filter { textLower.contains($0) }.count
        
        // Check for structural indicators using NSRegularExpression with anchorsMatchLines
        let fullRange = NSRange(note.startIndex..<note.endIndex, in: note)
        let bulletRegex = try? NSRegularExpression(pattern: #"^\\s*[-*•]\\s+"#, options: [.anchorsMatchLines])
        let numberedRegex = try? NSRegularExpression(pattern: #"^\\s*\\d+\\.\\s+"#, options: [.anchorsMatchLines])
        let hasListStructure =
            (bulletRegex?.firstMatch(in: note, options: [], range: fullRange) != nil) ||
            (numberedRegex?.firstMatch(in: note, options: [], range: fullRange) != nil)
        
        if todoCount > ideaCount || hasListStructure {
            return .todo
        } else if ideaCount > todoCount {
            return .idea
        } else {
            return .unknown
        }
    }
}`,
      language: "swift"
    },
    {
      name: "LLMClient.swift",
      code: `//
//  LLMClient.swift
//  SwiftNoteClassifier
//
//  Created by SwiftNoteClassifier on 2025-01-27.
//

import Foundation

/// HTTP client for communicating with Ollama API
public class LLMClient {
    
    // MARK: - Properties
    private let config: OllamaConfig
    private let session: URLSession
    
    // MARK: - Initialization
    
    public init(config: OllamaConfig = OllamaConfig()) {
        self.config = config
        
        let sessionConfig = URLSessionConfiguration.default
        sessionConfig.timeoutIntervalForRequest = TimeInterval(config.timeout)
        sessionConfig.timeoutIntervalForResource = TimeInterval(config.timeout * 2)
        self.session = URLSession(configuration: sessionConfig)
    }
    
    // MARK: - Public Methods
    
    /// Generate a classification from the LLM
    /// - Parameters:
    ///   - systemPrompt: System prompt for the LLM
    ///   - userPrompt: User prompt containing the note to classify
    /// - Returns: ClassificationResult on success, nil on failure
    public func generate(systemPrompt: String, userPrompt: String) async -> ClassificationResult? {
        // Make initial request
        guard let response = await makeRequest(systemPrompt: systemPrompt, userPrompt: userPrompt) else {
            return nil
        }
        
        // Try to parse the response
        if let result = parseJSONResponse(response) {
            return result
        }
        
        // If parsing failed, try repair prompt
        print("Initial parsing failed, attempting repair...")
        return await attemptRepair(systemPrompt: systemPrompt, userPrompt: userPrompt)
    }
    
    /// Test if the LLM service is available
    /// - Returns: true if service is available, false otherwise
    public func testConnection() async -> Bool {
        guard let url = URL(string: "\\(config.url)/api/tags") else {
            return false
        }
        
        do {
            let (_, response) = try await session.data(from: url)
            if let httpResponse = response as? HTTPURLResponse {
                return httpResponse.statusCode == 200
            }
            return false
        } catch {
            return false
        }
    }
    
    // MARK: - Private Methods
    
    private func makeRequest(systemPrompt: String, userPrompt: String) async -> [String: Any]? {
        guard let url = URL(string: "\\(config.url)/api/generate") else {
            return nil
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let payload: [String: Any] = [
            "model": config.model,
            "prompt": "\\(systemPrompt)\\n\\n\\(userPrompt)",
            "stream": false,
            "options": [
                "temperature": config.temperature,
                "num_predict": 200
            ],
            "format": "json"
        ]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: payload)
        } catch {
            print("Failed to serialize payload: \\(error)")
            return nil
        }
        
        var lastError: Error?
        
        for attempt in 0...config.maxRetries {
            do {
                let (data, response) = try await session.data(for: request)
                
                if let httpResponse = response as? HTTPURLResponse {
                    if httpResponse.statusCode == 200 {
                        if let result = try JSONSerialization.jsonObject(with: data) as? [String: Any] {
                            return result
                        }
                    } else {
                        print("HTTP Error \\(httpResponse.statusCode): \\(String(data: data, encoding: .utf8) ?? "Unknown error")")
                    }
                }
            } catch {
                lastError = error
                if attempt < config.maxRetries {
                    let delay = pow(2.0, Double(attempt)) * 1.0 // Exponential backoff
                    print("Request failed, retrying in \\(delay)s...")
                    try? await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
                }
            }
        }
        
        print("Failed to get response from Ollama after \\(config.maxRetries + 1) attempts")
        if let lastError = lastError {
            print("Last error: \\(lastError)")
        }
        
        return nil
    }
    
    private func parseJSONResponse(_ response: [String: Any]) -> ClassificationResult? {
        guard let responseText = response["response"] as? String,
              !responseText.isEmpty else {
            return nil
        }
        
        do {
            guard let data = responseText.data(using: .utf8) else {
                return nil
            }
            
            var jsonData = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            
            // Clean up the data before validation
            if let subtype = jsonData?["subtype"] as? String,
               (subtype.isEmpty || subtype == "null"),
               let label = jsonData?["label"] as? String,
               label != "Actionable" {
                jsonData?.removeValue(forKey: "subtype")
            }
            
            // Map invalid labels to valid ones
            if let label = jsonData?["label"] as? String {
                let labelMapping: [String: String] = [
                    "Ideas": "Actionable",
                    "Idea": "Actionable",
                    "Tasks": "Actionable",
                    "Task": "Actionable",
                    "Todo": "Actionable",
                    "To-do": "Actionable",
                    "Code": "Snippets",
                    "Command": "Snippets",
                    "URL": "Links",
                    "Link": "Links",
                    "Person": "People",
                    "Contact": "People",
                    "Quote": "Quotes",
                    "Saying": "Quotes",
                    "Goal": "Goals",
                    "Target": "Goals",
                    "Reminder": "Reminders",
                    "Shopping List": "Shopping",
                    "Grocery": "Shopping",
                    "Journal Entry": "Journal",
                    "Reflection": "Journal",
                    "Media Item": "Media",
                    "Movie": "Media",
                    "Book": "Media",
                    "Note": "Notes",
                    "Information": "Notes"
                ]
                
                if let mappedLabel = labelMapping[label] {
                    jsonData?["label"] = mappedLabel
                    print("Mapped invalid label to: \\(mappedLabel)")
                }
            }
            
            // Convert to ClassificationResult
            guard let finalData = jsonData,
                  let labelString = finalData["label"] as? String,
                  let label = Category(rawValue: labelString),
                  let confidence = finalData["confidence"] as? Double,
                  let rationale = finalData["rationale"] as? String else {
                return nil
            }
            
            var subtype: ActionableSubtype?
            if let subtypeString = finalData["subtype"] as? String {
                subtype = ActionableSubtype(rawValue: subtypeString)
            }
            
            return ClassificationResult(
                label: label,
                confidence: confidence,
                subtype: subtype,
                rationale: rationale
            )
            
        } catch {
            print("Failed to parse JSON: \\(error)")
            print("Raw response: \\(responseText)")
            return nil
        }
    }
    
    private func attemptRepair(systemPrompt: String, userPrompt: String) async -> ClassificationResult? {
        let repairPrompt = """
        Please fix the JSON response. Return ONLY valid JSON in this exact format:
        {
            "label": "CATEGORY_NAME",
            "confidence": 0.95,
            "subtype": "todo",
            "rationale": "Brief explanation here"
        }
        
        Valid categories: Actionable, Notes, Shopping, Reminders, Journal, Quotes, Links, Goals, Media, Snippets, People
        Valid subtypes (only for Actionable): todo, idea, unknown
        
        Original note: \\(userPrompt)
        """
        
        guard let response = await makeRequest(systemPrompt: systemPrompt, userPrompt: repairPrompt) else {
            return nil
        }
        
        return parseJSONResponse(response)
    }
}`,
      language: "swift"
    }
  ]);

  const handleCodeChange = (newCode: string, tabIndex?: number) => {
    if (tabIndex !== undefined) {
      setTabs(prev => prev.map((tab, index) => 
        index === tabIndex ? { ...tab, code: newCode } : tab
      ));
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Complete Component Demo
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Showcasing all components in the project - both used and unused components. 
            This demo includes 20+ interactive components with various animations and effects.
          </p>
        </div>
        
        <WobbleCardDemo />
        
        {/* DomeGallery Demo Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dome Gallery
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Interactive 3D sphere gallery with drag controls and smooth image transitions. 
              Drag to rotate the sphere and click on images to view them in full size.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="h-[600px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10">
              <DomeGallery 
                images={[
                  '/imagetrail/claude.svg',
                  '/imagetrail/cursor.svg',
                  '/imagetrail/figma.svg',
                  '/imagetrail/gemini.svg',
                  '/imagetrail/gpt.svg',
                  '/imagetrail/gsap.svg',
                  '/imagetrail/next.svg',
                  '/imagetrail/tailwind.svg'
                ]}
                fit={0.6}
                segments={30}
                maxVerticalRotationDeg={8}
                dragSensitivity={25}
                grayscale={false}
                imageBorderRadius="20px"
                openedImageBorderRadius="30px"
              />
            </div>
          </div>
        </div>
        
        {/* CodeBlock Demo Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CodeBlock Component
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              A beautiful code block component with syntax highlighting, copy functionality, tab support, and live editing capabilities.
            </p>
          </div>
          
            <div className="max-w-4xl mx-auto">
              <CodeBlock
                language="typescript"
                filename=""
                tabs={tabs}
                editable={true}
                onCodeChange={handleCodeChange}
              />
            </div>
        </div>
        
        {/* Aurora Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Aurora Background
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              WebGL-powered aurora background effect with customizable colors and animations.
            </p>
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <Aurora 
              colorStops={["#5227FF", "#7cff67", "#5227FF"]}
              amplitude={1.0}
              blend={0.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Aurora Effect</h3>
            </div>
          </div>
        </div>

        {/* Button Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Button Components
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Various button styles and variants.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="accent">Accent Button</Button>
          </div>
        </div>

        {/* TextType Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              TextType Animation
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Typewriter effect with customizable speed and styles.
            </p>
          </div>
          <div className="text-center">
            <TextType 
              text="This is a typewriter effect animation!"
              typingSpeed={100}
              className="text-2xl text-blue-400"
            />
          </div>
        </div>

        {/* DotPattern Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Dot Pattern Background
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated dot pattern background effect.
            </p>
          </div>
          <div className="h-[300px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <DotPattern />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Dot Pattern</h3>
            </div>
          </div>
        </div>

        {/* NeonBlobs Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neon Blobs
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated neon blob effects.
            </p>
          </div>
          <div className="h-[300px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <NeonBlobs />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">Neon Blobs</h3>
            </div>
          </div>
        </div>

        {/* LivingSquaresGrid Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Living Squares Grid
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Interactive grid of squares with hover effects.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 p-8">
            <LivingSquaresGrid 
              items={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg',
                '/imagetrail/gsap.svg',
                '/imagetrail/next.svg',
                '/imagetrail/tailwind.svg',
                '/imagetrail/swift.svg'
              ]}
              gridSize={3}
            />
          </div>
        </div>

        {/* ImageTrail Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Image Trail Effect
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Mouse-following image trail effect.
            </p>
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 relative">
            <ImageTrail 
              items={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg'
              ]}
              variant={1}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="text-white text-2xl font-bold">Move your mouse around!</h3>
            </div>
          </div>
        </div>

        {/* AnimatedTestimonialsDemo Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Animated Testimonials
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Animated testimonials carousel.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10">
            <AnimatedTestimonialsDemo />
          </div>
        </div>

        {/* KPICard Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              KPI Cards
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Key Performance Indicator cards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KPICard 
              title="Users"
              value="10,000"
              unit="active users"
              improvement="+12%"
            />
            <KPICard 
              title="Revenue"
              value="$50,000"
              unit="monthly"
              improvement="+8%"
            />
            <KPICard 
              title="Conversion"
              value="3.2"
              unit="%"
              improvement="-2%"
            />
          </div>
        </div>

        {/* TerminalCard Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Terminal Card
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Terminal-style code display.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TerminalCard 
              command="npm install react"
              language="bash"
            />
          </div>
        </div>

        {/* ScrollToButton Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Scroll To Button
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Button that scrolls to a specific section.
            </p>
          </div>
          <div className="flex justify-center">
            <ScrollToButton 
              target="demo-features"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Scroll to Features
            </ScrollToButton>
          </div>
        </div>

        {/* NextProjectButton Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Next Project Button
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Button for navigating to the next project.
            </p>
          </div>
          <div className="flex justify-center">
            <NextProjectButton 
              nextProjectPath="/projects/tuqqi-ai"
              nextProjectTitle="Tuqqi AI Project"
            />
          </div>
        </div>

        {/* ImageTest Component Demo */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Image Test Component
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Image testing component for debugging.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-black backdrop-blur-sm border border-white/10 p-8">
            <ImageTest 
              images={[
                '/imagetrail/claude.svg',
                '/imagetrail/cursor.svg',
                '/imagetrail/figma.svg',
                '/imagetrail/gemini.svg',
                '/imagetrail/gpt.svg'
              ]}
            />
          </div>
        </div>
        
        <div id="demo-features" className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Demo Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-neutral-300">
              <div>
                <h3 className="font-semibold text-white mb-2">3D Wobble Cards</h3>
                <p>Smooth 3D transforms on hover with mouse tracking</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Dome Gallery</h3>
                <p>Interactive 3D sphere with drag controls and image zoom</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">CodeBlock Editor</h3>
                <p>Live code editing with syntax highlighting and copy functionality</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Aurora Background</h3>
                <p>WebGL-powered aurora effect with customizable colors</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">TextType Animation</h3>
                <p>Typewriter effect with customizable speed and styles</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Button Components</h3>
                <p>Various button styles and variants</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Dot Pattern</h3>
                <p>Animated dot pattern background effect</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Neon Blobs</h3>
                <p>Animated neon blob effects</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Living Squares Grid</h3>
                <p>Interactive grid of squares with hover effects</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Image Trail Effect</h3>
                <p>Mouse-following image trail effect</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Animated Testimonials</h3>
                <p>Animated testimonials carousel</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">KPI Cards</h3>
                <p>Key Performance Indicator cards</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Terminal Card</h3>
                <p>Terminal-style code display</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Scroll To Button</h3>
                <p>Button that scrolls to a specific section</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Next Project Button</h3>
                <p>Button for navigating to the next project</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Image Test Component</h3>
                <p>Image testing component for debugging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
