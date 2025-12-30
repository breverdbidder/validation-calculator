#!/bin/bash

echo "🚀 Building Validation Calculator..."

# Build
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=validation-calculator

echo "✅ Deployed!"
echo "📱 Visit: https://validation-calculator.pages.dev"
