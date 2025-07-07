---
title: "Sudoku Solver - Modular Rust Workspace"
date: "2025-01-01"
author: "Hrithik Dhakrey"
--- 
# Sudoku Solver - Modular Rust Workspace

[![Crates.io](https://img.shields.io/crates/v/sudoko.svg)](https://crates.io/crates/sudoko)
[![Documentation](https://docs.rs/sudoko/badge.svg)](https://docs.rs/sudoko)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive, modular Rust library and application suite for solving advanced Sudoku puzzles of various sizes (3x3, 4x4, 5x5, and more) using multiple solving strategies, with WebAssembly (WASM) and terminal UI support.

## Installation

Add the core library to your Rust project:

```toml
[dependencies]
sudoko = "0.3"

# For WebAssembly support
sudoko = { version = "0.3", features = ["wasm"] }
```

Install the terminal UI application:

```bash
cargo install sudoko-tui
```

For WebAssembly projects, use the core library with WASM features enabled.

## Features

- **Multiple Grid Sizes**: 4x4 (2x2), 9x9 (3x3), 16x16 (4x4), 25x25 (5x5), and more
- **Advanced Solving Strategies**: Naked/Hidden Singles, Pairs, X-Wing, Swordfish, and more
- **Backtracking Algorithm**: For hard puzzles
- **WebAssembly Support**: Use the library in web browsers
- **Puzzle Generation**: Create new puzzles with difficulty levels
- **Validation & Hints**: Check solutions and get next-move suggestions
- **Statistics**: Track solving performance and strategy usage
- **Simple Text UIs**: Both TUI and WASM use lightweight text rendering

---

## Project Structure

This workspace consists of two main crates:

### 📚 `sudoko` - Core Library with WASM Support
- Located in `sudoko/`
- Provides all puzzle logic, solving, generation, validation, and CLI
- **Includes WebAssembly support** when built with `--features wasm`
- **Public API:**
  - `Sudoku`, `SudokuSolver`, `Cell`, `Difficulty`, and utilities
  - `WasmSudoku` and WASM utilities (when `wasm` feature is enabled)

### 🖥️ `sudoko-tui` - Terminal User Interface
- Located in `sudoko-tui/`
- Simple interactive terminal UI (WASD navigation, number input, solve, etc.)
- Uses only the public API from the core library
- No external UI dependencies

---

## Building and Running

### Prerequisites
- Rust 1.70+ with Cargo

### Build All Crates
```bash
cargo build
```

### Build Individual Crates
```bash
# Core library
cargo build -p sudoko

# Core library with WASM support
cargo build -p sudoko --features wasm

# Terminal UI
cargo build -p sudoko-tui
```

### Running Applications

#### CLI Interface
```bash
# Solve a puzzle
cargo run -p sudoko --bin sudoko-cli -- solve "530070000600195000..." 9

# Generate a puzzle
cargo run -p sudoko --bin sudoko-cli -- generate 9 hard

# Get help
cargo run -p sudoko --bin sudoko-cli -- --help
```

#### Terminal UI
```bash
cargo run -p sudoko-tui
```

#### WebAssembly (WASM)
Use the provided `build-wasm.sh` script to build for web, node, and bundler targets:
```bash
./build-wasm.sh
```
See `web-example/` for a browser demo.

---

## Usage Examples

### Core Library (Rust)
```rust
use sudoko::{Sudoku, SudokuSolver, Difficulty};

// Create a new puzzle
let mut puzzle = Sudoku::new(9);

// Load from string
let puzzle = Sudoku::from_string("530070000...", 9)?;

// Solve the puzzle
let mut solver = SudokuSolver::new();
let solution = solver.solve(puzzle)?;

// Generate a new puzzle
let puzzle = solver.generate_puzzle(9, Difficulty::Hard)?;
```

### WASM (JavaScript)
```javascript
import { WasmSudoku } from './pkg/sudoko.js';

// Create a new puzzle
const sudoku = new WasmSudoku(9);

// Load an example puzzle
const example = create_example_puzzle();

// Solve it
example.solve();

// Render as text
console.log(example.render_text());
```

---

## Architecture Benefits

1. **Unified Codebase**: Core logic and WASM interface are in one crate, reducing duplication
2. **Optional Features**: WASM support is feature-gated, keeping the core library lightweight
3. **Reusability**: The core library can be used in any Rust project with or without WASM
4. **Simple UIs**: TUI uses simple text rendering with no heavy dependencies
5. **Clean API**: Well-defined public interfaces for all functionality

## Development Notes

- All crates use only the public API from the core library, ensuring clean boundaries and maintainable code.
- The core library uses feature flags to keep WASM dependencies optional.
- The implementations avoid heavy dependencies, making them lightweight and easy to integrate into different environments.

## License

MIT
