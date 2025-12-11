# IISU Icon Maker

A web-based application for creating custom game cartridge icons with gradients, system presets, and artwork overlays. Design beautiful retro-inspired gaming icons with an intuitive interface and real-time preview.

## Features

- **Gradient Customization**: Create custom color gradients with multiple color stops and reorderable colors
- **System Presets**: Pre-built preset configurations for different gaming systems
- **Custom Icons**: Use emoji or upload custom icon images
- **Artwork Upload**: Add game artwork as overlays with zoom control
- **Real-time Preview**: See changes instantly in high-quality preview
- **Download Export**: Export your designs as PNG images at 1024x1024 resolution
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Library**: Radix UI for accessible components
- **Rendering**: HTML Canvas for cartridge rendering
- **Icons**: Lucide React icons
- **Package Manager**: Bun
- **Linting**: ESLint with TypeScript support
- **Forms**: React Hook Form for form management

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- Git

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd iisu-icon-maker
```

2. Install dependencies:
```sh
bun install
# or with npm
npm install
```

3. Start the development server:
```sh
bun run dev
# or with npm
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Development

### Available Scripts

- `bun run dev` - Start development server with hot module reloading
- `bun run build` - Build for production
- `bun run build:dev` - Build with development mode enabled
- `bun run preview` - Preview the production build locally
- `bun run lint` - Run ESLint to check code quality

### Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Radix UI component wrappers (shadcn/ui)
│   ├── ControlsPanel.tsx
│   ├── PreviewPanel.tsx
│   ├── GameCartridgeBuilder.tsx
│   ├── GradientControls.tsx
│   ├── ImageUpload.tsx
│   ├── IconInput.tsx
│   └── PresetSelector.tsx
├── pages/               # Page components
│   ├── IconMaker.tsx    # Main application page
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/               # Custom React hooks
│   ├── use-cartridge-renderer.tsx
│   └── use-mobile.tsx
├── services/            # Business logic
│   └── presetService.tsx
├── types/               # TypeScript type definitions
├── data/                # Static data
└── lib/                 # Utility functions
public/
├── systems/             # System artwork and icons
│   ├── artwork/
│   ├── colors/
│   └── icons/
```

## How It Works

### Icon Creation Process

1. **Select or Create a Preset**: Choose from pre-built system presets or customize your own
2. **Customize Colors**: Pick colors or use the gradient editor to create custom color combinations
3. **Choose Icon**: Select from emoji or upload a custom image
4. **Add Artwork**: Optionally upload game artwork to be displayed on the cartridge
5. **Preview & Export**: See the real-time preview and download your design as PNG

### Key Components

- **PreviewPanel**: Displays the real-time preview of the cartridge icon
- **ControlsPanel**: Main interface for all customization options
- **GameCartridgeBuilder**: Renders the cartridge design using HTML Canvas
- **GradientControls**: Manages color gradient selection and ordering
- **PresetSelector**: Browse and apply system presets
- **ImageUpload**: Handle artwork upload and processing

### Gradient System

The application supports multi-stop gradients. Colors can be:
- Selected from preset gradients
- Customized individually
- Reordered by dragging
- Toggled with any number of color stops

## Building & Deployment

### Production Build

```sh
bun run build
```

This creates an optimized production build in the `dist/` directory.

### Previewing Production Build

```sh
bun run preview
```

This serves the production build locally for testing before deployment.

## Configuration

### Tailwind CSS

Configuration available in `tailwind.config.ts` for customizing the design system.

### TypeScript

Project configuration in:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Build-time settings

### Vite

Build and dev server configuration in `vite.config.ts`.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure code passes linting: `bun run lint`
4. Commit and push changes
5. Create a pull request

## Browser Support

This application works on all modern browsers that support:
- ES2020+ JavaScript
- Canvas API
- File API
- CSS Grid and Flexbox

## License

This project is part of the iisu gaming project by Chaotics Labs.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icon set from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
