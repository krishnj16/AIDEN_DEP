import dotenv from 'dotenv';
dotenv.config();

// Define the shape of a Tool
export interface Tool {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  execute: (args: any) => Promise<string>;
}

// 1. Calculator Tool
const calculateTool: Tool = {
  name: "calculate",
  description: "Perform mathematical calculations. Use this for ANY math question.",
  parameters: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "The mathematical expression to evaluate (e.g., '2 + 2' or '100 * 0.5').",
      },
    },
    required: ["expression"],
  },
  execute: async ({ expression }) => {
    try {
      const sanitized = expression.replace(/[^0-9+\-*/(). ]/g, '');
      // eslint-disable-next-line no-eval
      const result = eval(sanitized); 
      return String(result);
    } catch (err) {
      return "Error: Invalid calculation.";
    }
  },
};

// 2. Web Search Tool (Tavily)
const searchTool: Tool = {
  name: "web_search",
  description: "Search the live internet for current events, news, weather, or facts.",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query (e.g., 'Weather in Tokyo' or 'Stock price of Apple').",
      },
    },
    required: ["query"],
  },
  execute: async ({ query }) => {
    try {
      console.log(`[Tool] Searching Tavily for: "${query}"...`);
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: query,
          search_depth: "basic",
          include_answer: true, // Tells Tavily to summarize it for us
          max_results: 3
        }),
      });

      const data = await response.json();
      
      // Return the direct answer if available, or the snippets
      return data.answer || data.results.map((r: any) => r.content).join("\n");
      
    } catch (err) {
      console.error("[Tool] Search failed:", err);
      return "Error: Could not connect to the search engine.";
    }
  },
};

// 3. The Tool Registry
export const TOOLS: Record<string, Tool> = {
  calculate: calculateTool,
  web_search: searchTool, // 👈 Added here
};

// 4. Export definitions for OpenAI
export const TOOL_DEFINITIONS = Object.values(TOOLS).map(tool => ({
  type: "function",
  function: {
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
  },
}));