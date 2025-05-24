# LedgerLens

LedgerLens is a web application that visualizes and analyzes Ethereum's multi-layer ecosystem, focusing on token flows, bridge usage, and scaling behaviors across L1 and L2 networks.

## Features

- **Real-time Bridge Analytics**: Track token flows between Ethereum and Layer 2 networks

- **Layer Architecture Visualization**: Interactive visualization of Ethereum's multi-layer ecosystem
- **Bridge Volume Tracking**: Monitor bridge usage and volume across different networks
- **Responsive Design**: Modern UI with smooth animations and transitions

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Chart.js, vis-network
- **Animations**: Framer Motion
- **Data Fetching**: React Query

## Project Structure

```
web3/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── About/          # About page components
│   │   ├── AppPage/        # Main application page
│   │   ├── Footer/         # Footer component
│   │   └── Layers/         # Layer visualization components
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── package.json           # Project dependencies
```

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
cd web3
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- The project uses TypeScript for type safety
- Follow the component structure in `src/components`
- Use Tailwind CSS for styling
- Maintain consistent naming conventions

## Contributors

- Adam Najajreh
- Tomas Horicka
- Juraj Budinsky
