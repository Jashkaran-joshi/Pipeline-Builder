# Pipeline Builder

A professional, feature-rich pipeline building application with a React-based frontend and a FastAPI backend. This project allows users to create complex workflows using a variety of nodes, verify connections, and ensure the pipeline structure is valid.

## 🚀 Quick Start

This project is set up for a seamless developer experience. You can start both the frontend and backend servers with a single command from the root directory.

### Prerequisites
- **Node.js**: v14 or higher
- **Python**: 3.8+
- **npm**: Standard with Node.js
- **pip**: Standard with Python

### One-Command Setup & Run
1. **Clone and Navigate**:
   ```bash
   cd "Mapper Model Frontend"
   ```

2. **Install All Dependencies**:
   ```bash
   # Installs root, frontend, and backend dependencies
   npm run install:all
   ```

3. **Start Development Servers**:
   ```bash
   # Starts React (Port 3000) and FastAPI (Port 8000)
   npm run dev
   ```

## 🛠️ Tech Stack

### Frontend
- **React**: Modern component-based architecture
- **React Flow**: Powerful library for building node-based editors
- **Zustand**: Lightweight state management for the graph data
- **Vanilla CSS / CSS Modules**: Premium, customized styling without the weight of large frameworks

### Backend
- **FastAPI**: High-performance Python web framework
- **Pydantic**: Robust data validation
- **Kahn's Algorithm**: Efficient DAG (Directed Acyclic Graph) detection logic

## ✨ Key Features

### 1. Robust Node Abstraction
- All nodes are built on a reusable **BaseNode** component, ensuring consistent styling and behavior.
- Total of **9 functional nodes** available in the toolbar:
  - **Core**: Input, Output, LLM, Text
  - **Logic & Utility**: Math, Delay, JSON, Condition, Merge

### 2. Premium Design System
- **Modern UI**: Implemented with glassmorphism effects, smooth transitions, and a professional dark mode.
- **Dynamic Feedback**: Hover effects on handles and edges, with indigo glow effects for a high-end feel.
- **Clean Typography**: Uses the Inter font family for optimal readability.

### 3. Intelligent Text Node
- **Variable Detection**: Automatically detects `{{ variableName }}` syntax in text.
- **Dynamic Handles**: Creates corresponding input handles on-the-fly as you type variables.
- **Auto-resizing**: The node expands both vertically and horizontally based on content density.

### 4. Pipeline Validation
- Integrated backend logic to analyze the pipeline.
- Detects whether the created graph is a **Directed Acyclic Graph (DAG)**.
- Provides real-time feedback upon submission with node/edge counts and structural status.

## 📁 Project Structure

```text
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # UI Abstractions (BaseNode, etc.)
│   │   ├── nodes/        # Individual node implementations
│   │   ├── store.js      # Zustand graph state
│   │   └── ui.js         # React Flow canvas setup
│   └── package.json
├── backend/              # FastAPI Application
│   ├── main.py           # API endpoints & DAG logic
│   └── requirements.txt  # Python package list
├── package.json          # Root-level management (Dev scripts)
└── README.md             # This file
```

## 📝 Features & Testing

### How to Test the Workflow
1. **Drag & Drop**: Pull any of the 9 nodes from the top toolbar onto the canvas.
2. **Connect**: Link nodes by dragging from a source handle (right) to a target handle (left).
3. **Text Variables**: Add a Text Node and type `Hello {{ name }}`. Notice the new handle that appears instantly.
4. **Submit**: Click the **SUBMIT PIPELINE** button to see the backend analysis of your graph structure.
5. **Cycle Detection**: Create a loop (e.g., A -> B -> A) and submit; the system will identify that it is no longer a DAG.

---
**Author**: Jaskaran Joshi  
**Status**: ✅ Fully Functional & Production-Ready
