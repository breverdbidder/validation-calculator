# Startup Validation Calculator

Interactive web app for the Enhanced 40-Day Validation Framework.

## Features

- **Interactive Calculator**: Input your validation metrics and get instant go/no-go decision
- **Landing Page**: Explain the framework and value proposition
- **Results Dashboard**: Visual display of quantitative and qualitative scores
- **Decision Matrix**: GREEN/YELLOW/RED with clear next actions

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Cloudflare Pages** - Hosting (free)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
5. Deploy automatically on push

### Option 2: Direct Deploy

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build
npm run build

# Deploy
wrangler pages deploy dist --project-name=validation-calculator
```

## Environment Variables

None required - this is a static site.

## URL Structure

- `/` - Landing page
- `/calculator` - Interactive calculator
- `/result` - Results display

## Integration with Life OS

This app links to the full framework documentation at:
https://github.com/breverdbidder/life-os/tree/main/docs/validation_framework

Users can:
1. Use the calculator to get instant feedback
2. Download the full framework for detailed guidance
3. Access all checklists, templates, and tools

## Customization

To customize for your brand:

1. Update colors in `src/App.css`:
   - Primary: `#667eea` (purple)
   - Success: `#10b981` (green)
   - Warning: `#f59e0b` (yellow)
   - Danger: `#ef4444` (red)

2. Update logo/branding in `src/App.jsx`

3. Update footer links

## License

MIT - Use freely
