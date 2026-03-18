# 🧠 Page Replacement Visualizer

### *See Memory Management Come to Life*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎯 What's This About?

Ever wondered how your operating system decides which memory pages to keep and which to swap out? This interactive visualizer transforms abstract OS concepts into beautiful, step-by-step animations that make learning memory management actually *fun*.

**Perfect for:**
- 🎓 **Students** learning operating systems
- 👨‍🏫 **Educators** teaching memory management
- 💻 **Developers** brushing up on CS fundamentals
- 🧪 **Researchers** comparing algorithm performance

---

## ✨ Features That Stand Out

### � Interactive Visualization
Step through each algorithm execution frame-by-frame. Watch pages enter and leave memory in real-time.

### 🧮 Three Classic Algorithms
- **FIFO** - The simple veteran
- **LRU** - The smart tracker
- **Optimal** - The fortune teller

### 📊 Live Statistics
Real-time page fault tracking with percentage calculations and visual indicators.

### 🎨 Beautiful UI
Modern, responsive design built with Radix UI and Tailwind CSS. Dark mode ready.

### 🚀 Lightning Fast
Powered by Vite for instant hot module replacement and blazing build times.

---

## 🎮 Quick Start

```bash
# Clone this repo
git clone https://github.com/Sarth00718/page-replacement-visualizer.git

# Jump into the directory
cd page-replacement-visualizer

# Install dependencies
npm install

# Fire it up! 🚀
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start exploring!

---

## 🎪 How to Use

**1️⃣ Configure Your Simulation**

```
Frame Count: 3
Reference String: 1,2,3,4,1,2,5,1,2,3,4,5
Algorithm: FIFO
```

Or pick from our curated example sequences!

**2️⃣ Run & Watch**

Hit that "Run Simulation" button and watch the magic happen. Use the step controls to move forward, backward, or jump to any point in the execution.

**3️⃣ Analyze & Learn**

Compare page fault rates across algorithms. Notice how Optimal always wins? That's because it cheats by knowing the future! 😉

---

## 🧪 Algorithm Showdown

| Algorithm | Strategy | Pros | Cons |
|-----------|----------|------|------|
| **FIFO** | Replace oldest page | Simple, fair | Belady's anomaly |
| **LRU** | Replace least recently used | Good performance | Overhead tracking |
| **Optimal** | Replace furthest future use | Best possible | Needs future knowledge |

### 🤔 Fun Fact: Belady's Anomaly

FIFO is the only algorithm here that can actually perform *worse* with more frames! Try it:
```
Frames: 3, String: 1,2,3,4,1,2,5,1,2,3,4,5
Frames: 4, String: 1,2,3,4,1,2,5,1,2,3,4,5
```

---

## 🏗️ Built With Love Using

- **[React](https://reactjs.org/)** - The UI library we all love
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with superpowers
- **[Vite](https://vitejs.dev/)** - Next-gen frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component collection
- **[Lucide Icons](https://lucide.dev/)** - Crisp, consistent icons

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── ui/                          # Reusable UI primitives
│   ├── AlgorithmInfo.tsx            # Algorithm descriptions
│   ├── FrameDisplay.tsx             # Memory frame visualization
│   ├── PageReplacementVisualizer.tsx # Main orchestrator
│   └── StepControls.tsx             # Navigation controls
├── utils/
│   └── pageReplacementAlgorithms.ts # Core algorithm logic
├── pages/
│   ├── Index.tsx                    # Landing page
│   └── NotFound.tsx                 # 404 handler
└── main.tsx                         # App entry point
```

---

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🌟 Show Your Support

If this project helped you understand page replacement algorithms better, give it a ⭐️!

---

## 📬 Contact

Sarth Narola - sarthnarola018@gmail.com

Project Link: [https://github.com/Sarth00718/page-replacement-visualizer](https://github.com/Sarth00718/page-replacement-visualizer)

---

**Made with ❤️ and lots of ☕**
