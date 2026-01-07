# Lines

A minimal, static-first web application displaying one carefully curated line at a time.

Inspired by messagesfromlife.com, this is a quiet, literary artifact—not a product platform.

## Philosophy

- Stillness over engagement
- Restraint over features
- Signal over volume
- Discovery over consumption

## What It Does

- Displays one quote, excerpt, or reflection at a time
- Provides unique, shareable permalinks for each line
- Refreshes to show different content
- Avoids showing the same line twice in a row

## What It Doesn't Do

- No accounts, no login
- No tracking, analytics, or cookies
- No user input or interactions
- No feeds, archives, or navigation
- No AI features
- No personalization

## Tech Stack

**Pure vanilla web technologies:**
- HTML5
- CSS3
- JavaScript (ES6+)
- Static JSON data file

**Zero framework dependencies. Zero build steps.**

## Project Structure

```
.
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Minimal styling
│   ├── app.js          # Core JavaScript logic
│   └── _redirects      # Netlify routing config
├── data/
│   └── lines.json      # Content (curated lines)
├── tests/
│   ├── lines.test.js   # Unit tests
│   └── routing.test.js # Integration tests
├── package.json        # Dev dependencies only
├── netlify.toml        # Netlify configuration
├── vercel.json         # Vercel configuration
├── CLAUDE.md          # AI assistant context
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (for running tests only)
- Any static file server for development

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd lines

# Install dev dependencies (optional, for testing)
npm install
```

### Development

```bash
# Run tests
npm test

# Start local server (Python 3)
npm run dev

# Or use any static server:
# python3 -m http.server 8000 -d public
# npx serve public
# php -S localhost:8000 -t public
```

Visit `http://localhost:8000` in your browser.

## Content Management

### Adding or Editing Lines

1. Open `data/lines.json`
2. Edit the JSON array following this schema:

```json
{
  "id": "unique-stable-id",
  "text": "1–3 lines of text only.",
  "source": "Optional attribution",
  "tags": ["metadata", "not-shown"]
}
```

**Guidelines:**
- Keep text brief (1-3 lines maximum)
- Use stable, meaningful IDs for permalinks
- Tags are for metadata only—never displayed
- Source is optional but recommended
- Validate JSON syntax before committing

3. Commit and push changes:

```bash
git add data/lines.json
git commit -m "Add new line: [brief description]"
git push
```

## Routing

- `/` → Random line (avoids immediate repeats)
- `/[id]` → Specific line by ID (e.g., `/whitman-leaves`)

Permalinks are stable and shareable.

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set publish directory: `public`
3. No build command needed
4. Deploy

Netlify automatically uses `netlify.toml` or `public/_redirects` for routing.

### Vercel

1. Connect your repository to Vercel
2. Set Root Directory: `public`
3. No build settings needed
4. Deploy

Vercel automatically uses `vercel.json` for routing.

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to `public/` directory
3. Note: Permalink routing requires additional configuration

### Cloudflare Pages

1. Connect repository
2. Set build output directory: `public`
3. Deploy

Cloudflare automatically handles SPA routing.

### Any Static Host

Simply upload the `public/` directory contents. Ensure your host supports:
- Serving `index.html` for all routes (SPA routing)
- Or configure redirects/rewrites manually

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test coverage:**
- Data loading and parsing
- Random selection with repeat avoidance
- Permalink resolution
- LocalStorage management
- Full user flow integration

## Performance

- **Target load time:** < 1 second
- **Bundle size:** < 10 KB (HTML + CSS + JS)
- **No external dependencies**
- **No tracking or analytics**
- **Mobile-first responsive design**

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

- Semantic HTML structure
- Respects `prefers-reduced-motion`
- Respects `prefers-color-scheme` (dark mode)
- Keyboard navigable
- Screen reader friendly

## Customization

### Changing the Coffee Link

Edit `public/index.html`:

```html
<a href="https://buymeacoffee.com/your-username">
  Buy me a coffee
</a>
```

### Adjusting Typography

Edit `public/styles.css`. Key variables:
- Font size: `.line-text { font-size: ... }`
- Colors: `body { color: ... background-color: ... }`
- Spacing: `main { padding: ... }`

Keep changes minimal. Maintain the calm aesthetic.

## Contributing

This is an intentionally constrained project.

**Before contributing, read:**
1. `CLAUDE.md` - Product constraints and philosophy
2. `prompt.md` - Original requirements

**What NOT to add:**
- User accounts or authentication
- Tracking or analytics
- Databases or CMSs
- AI features
- Category/tag UI
- Search functionality
- Dark mode toggles (use system preference)

**What's welcome:**
- Bug fixes
- Performance improvements
- Accessibility enhancements
- Documentation improvements
- New curated lines (via PR to `data/lines.json`)

## License

[Your chosen license]

## Credits

Inspired by messagesfromlife.com

Built with restraint.
