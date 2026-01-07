You are building v1 of a minimal, static-first web application inspired by messagesfromlife.com.

This is a quiet, literary artifact, not a product platform.

# **Product Intent**

Display one carefully curated line (quote, excerpt, or short reflection) at a time.

The site should feel like:

- a digital chapbook
- a note left on a desk
- something discovered, not consumed

Optimize for:

- stillness
- restraint
- signal over volume

# **Core Principles (Non-Negotiable)**

- One line at a time
- No feeds, no scrolling lists
- No accounts, no interactions
- No explanations or commentary
- No visible AI features
- No cookies, tracking, analytics, or personalization
- Do not over-engineer

# **Functional Requirements**

1. Single-page site
2. On initial load, display exactly one line of text
3. Refreshing the page loads a different line
(avoid immediate repeats with a simple client-side guard)
4. Each line has a unique, shareable permalink
5. Optional muted source text (small, subtle, secondary)
6. Footer contains a small, unobtrusive “Buy me a coffee” link
7. No login, no forms, no user input

# **Content Storage (Locked Decision)**

Use a static JSON file only.

- Content lives in the repository (e.g. /data/lines.json)
- No database
- No Supabase
- No CMS
- No runtime writes
- No content generation

Content is pre-curated and approved by a human.

**JSON Schema**

Each item includes:

{

"id": "stable-unique-id",

"text": "1–3 lines of text only.",

"source": "optional, muted",

"tags": ["hidden", "not-shown"]

}

- id is stable and used for permalinks
- tags exist only for potential future use and are never shown
- Admin/content editing is manual via Git

# **Routing & Behavior**

- /
→ randomly select and display one item from the JSON file
- /[id]
→ display the exact matching item
- Random selection must avoid showing the same item twice in a row
- No archive, index, or navigation beyond refresh

# **Design Requirements**

- Extremely minimal typography
- Generous whitespace
- Neutral, calm color palette
- Mobile-first
- Centered or gently offset text
- No visual clutter
- No icons unless strictly necessary
- No animations beyond a very subtle fade-in

# **Technical Constraints**

- Prefer static generation or edge rendering
- Minimal dependencies
- Near-zero JavaScript where possible
- Fast load time
- Suitable for Netlify / Vercel / Cloudflare Pages
- No client-side frameworks unless clearly justified

# **Explicit Non-Goals (Do Not Build)**

- No personalization
- No category or tag UI
- No feeds or archives
- No analytics dashboards
- No admin UI
- No growth or engagement features
- No SEO tricks
- No feature creep

# **Deliverables**

- v1 working implementation
- Clean, readable code
- Simple instructions for:
    - adding/editing content via JSON
    - deploying the site

If a feature is not explicitly listed above, do not add it.

Build only what is described.
