# CLAUDE.md

This document provides context for AI assistants working on this codebase.

## Product Overview

This is a **minimal, static-first web application** that displays one carefully curated line of text at a time. Think of it as a digital chapbook or a literary artifact—not a product platform.

**Inspiration:** messagesfromlife.com

**Core Philosophy:**
- Stillness over engagement
- Restraint over features
- Signal over volume
- Discovery over consumption

## What This Is

A single-page website that:
- Shows one quote, excerpt, or reflection at a time
- Provides unique, shareable permalinks for each line
- Refreshes to show different content
- Requires zero user interaction beyond navigation

## What This Is NOT

- A content platform
- A social network
- A personalization engine
- A data collection tool
- A growth product
- An AI showcase

## Critical Constraints (NEVER Violate)

### Content Storage
- **ONLY** use static JSON files in `/data/lines.json`
- **NO** databases (PostgreSQL, MongoDB, etc.)
- **NO** Supabase or Firebase
- **NO** CMS integrations
- **NO** runtime content generation
- **NO** AI-generated content

Content is **manually curated** and edited via Git commits.

### User Interaction
- **NO** user accounts or authentication
- **NO** comments, likes, or reactions
- **NO** forms or user input
- **NO** feeds, lists, or archives
- **NO** navigation beyond refresh and direct links

### Privacy & Tracking
- **NO** cookies
- **NO** analytics (Google Analytics, Plausible, etc.)
- **NO** tracking pixels
- **NO** personalization
- **NO** fingerprinting

### Features
- **NO** tags or category UI (tags in JSON are metadata only)
- **NO** search functionality
- **NO** admin dashboards
- **NO** SEO tricks or growth hacks
- **NO** animations (except subtle fade-in)
- **NO** visible AI features

## JSON Schema

```json
{
  "id": "stable-unique-id",
  "text": "1–3 lines of text only.",
  "source": "optional, muted",
  "tags": ["hidden", "not-shown"]
}
```

- **id:** Stable identifier for permalinks (never changes)
- **text:** The actual content (keep it brief)
- **source:** Optional attribution (displayed small and subtle)
- **tags:** Metadata only, never displayed to users

## Routing

- **`/`** → Display random line from JSON
- **`/[id]`** → Display specific line by ID
- Random selection must avoid immediate repeats (simple client-side guard)

## Design Principles

**Minimal Typography:**
- Generous whitespace
- Neutral, calm color palette (grays, off-whites, muted tones)
- Centered or gently offset text
- No visual clutter

**Technical:**
- Mobile-first responsive design
- Fast load times
- Minimal JavaScript (only where necessary)
- Static generation or edge rendering preferred

## Technical Stack Guidance

**Prefer:**
- Static site generators
- Edge rendering (Vercel, Netlify, Cloudflare Pages)
- Vanilla HTML/CSS/JS where possible
- Minimal dependencies

**Avoid:**
- Heavy client-side frameworks (unless clearly justified)
- Runtime databases
- Server-side complexity
- Build tool bloat

## Development Guidelines

### When Adding Features

**Ask yourself:**
1. Is this explicitly listed in `prompt.md`?
2. Does this add complexity?
3. Does this violate the "quiet artifact" principle?

**If the answer to #1 is NO, stop. Do not add it.**

### When Modifying Code

- Keep it simple
- Prefer readability over cleverness
- Maintain the minimalist aesthetic
- Test on mobile devices
- Ensure fast load times

### When Editing Content

1. Edit `/data/lines.json` manually
2. Ensure valid JSON syntax
3. Keep text brief (1-3 lines max)
4. Assign stable, meaningful IDs
5. Commit changes via Git

## Deployment

The site should be trivially deployable to:
- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Any static host

**No environment variables required for core functionality.**

## What Success Looks Like

- A visitor lands on the page
- They see one beautiful line of text
- They pause, read, reflect
- They might refresh to see another
- They might share a permalink
- The experience feels intentional, not algorithmic

## What to Build

**Only build what is explicitly described in `prompt.md`.**

This is not a place for:
- Clever feature ideas
- "Nice to have" additions
- Future-proofing
- Over-engineering

## Anti-Patterns to Avoid

❌ "Let's add a CMS for easier editing"
❌ "We could track which lines are most popular"
❌ "What if users could save favorites?"
❌ "Should we add categories?"
❌ "Let's make it shareable on social media with rich previews"
❌ "We could use AI to generate more lines"
❌ "What about a dark mode toggle?"

✅ Keep it simple
✅ Maintain the quiet
✅ Respect the constraints
✅ Build only what's specified

## Tone & Voice

The product itself has no voice—it presents others' words.

The code should be:
- Clean
- Readable
- Restrained
- Obvious

The documentation should be:
- Clear
- Direct
- Minimal

## Final Reminder

**This is a literary artifact, not a tech demo.**

Every line of code should serve the experience of quiet, focused reading. If a feature doesn't serve that purpose, it doesn't belong here.

When in doubt, do less.
