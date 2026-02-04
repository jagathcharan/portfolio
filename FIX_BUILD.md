# 🔧 Fix Build Error - Terser Not Found

## Problem
Build fails with error: `terser not found`

## Solution

Run this command to install terser:

```bash
npm install --save-dev terser
```

Or if you want to install all dependencies:

```bash
npm install
```

## After Installing

Try building again:

```bash
npm run build
```

The build should now succeed!

---

## Alternative: Use esbuild Instead

If you prefer not to use terser, you can change the minifier to esbuild (which is built into Vite):

Edit `vite.config.ts`:
```typescript
build: {
  minify: 'esbuild', // Change from 'terser' to 'esbuild'
  // Remove terserOptions section
}
```

But terser is recommended for better minification, so installing it is the better option.
