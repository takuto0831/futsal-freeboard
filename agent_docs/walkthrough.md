# Futsal Tactics Board Walkthrough

## Overview
The Futsal Tactics Board is a web application designed to help coaches and players design and visualize set plays. It allows users to position players and the ball on a futsal court, create sequences of movements (frames), and export the result as a GIF animation.

## Features
-   **Interactive Board**: Drag and drop players (Home/Away) and the ball.
-   **Frame-based Animation**: Create multiple frames to define movement. The app automatically interpolates positions between frames for smooth playback.
-   **Playback Controls**: Play, pause, and navigate through frames.
-   **Save/Load**: Save your tactics as a JSON file and load them later to continue editing.
-   **GIF Export**: Generate a GIF animation of your tactic to share with others.

## How to Use

### 1. Positioning
-   Drag the **Red** circles (Home team) and **Blue** circles (Away team) to their starting positions.
-   Drag the **Ball** to its starting position.

### 2. Creating Animation
-   The timeline at the bottom shows the current frame (Frame 1).
-   Click the **"+"** button in the timeline to add a new frame. This duplicates the current positions.
-   In the new frame, move the players/ball to their next positions.
-   Repeat this process to create a sequence of moves.

### 3. Playback
-   Click the **Play** button (▶) in the timeline to preview the animation.
-   The app will smoothly animate the movement between frames.

### 4. Saving & Loading
-   Click **Save Project** in the toolbar to download a `.json` file of your current tactic.
-   Click **Load Project** to upload a previously saved `.json` file.

### 5. Exporting GIF
-   Click **Export GIF** in the toolbar.
-   The app will play through the animation and capture frames.
-   Once complete, a `tactics.gif` file will be downloaded automatically.

## Technical Details
-   **Framework**: Next.js 15 (App Router)
-   **Canvas**: React-Konva (Konva.js) for high-performance 2D rendering.
-   **State Management**: Zustand for managing the project state (frames, entities).
-   **Styling**: Tailwind CSS.
-   **Export**: `gif.js` running in a web worker for client-side GIF generation.

## Future Improvements (Cloud Integration)
For future scalability, the application is designed to support cloud persistence.
-   **Database**: Firestore or PostgreSQL.
-   **Schema**:
    -   `Project`: `{ id, userId, name, createdAt, updatedAt }`
    -   `Frame`: `{ id, projectId, order, entities: Entity[] }`
    -   `Entity`: `{ id, type, x, y, team, number, color }`
-   **API**: Next.js API Routes can be added to handle CRUD operations.
