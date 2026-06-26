# Jasmine Cash Sanity Studio

This folder contains the Sanity Studio for editing Jasmine Cash portfolio content.

## Project

- Project ID: `qu5bojff`
- Dataset: `production`

## Local development

From this `studio` folder:

```bash
pnpm install
pnpm run dev
```

Sanity Studio usually runs at:

```text
http://localhost:3333
```

## First content type

The first migrated content type is `publication`, matching the existing publication cards:

- Title
- Summary
- Year
- DOI URL
- Topics
- Display order

The next migrated content type is `projectTheme`, which groups editable project cards by theme.

`presentationSection` groups editable presentation entries by page section.

`recognitionSection` groups editable grants, honors, leadership, service, and professional contribution entries.

`expertisePage` stores the editable Training and Expertise page content as one page document.

`teachingPage` stores the editable Teaching page content as one page document.

`homePage` stores the editable homepage content as one page document.

## Importing existing publications

The script at `scripts/importPublications.mjs` can import the existing `_publications/*.md` files into Sanity.

Before running it, create a Sanity API token with write access, then run:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:publications
```

## Syncing Sanity publications back to the current Jekyll site

Until the frontend is fully migrated, the current Jekyll site reads publications from:

```text
../_data/publications.json
```

To refresh that file from Sanity:

```bash
pnpm run sync:publications
```

If the dataset is not publicly readable, create a Sanity read token and run:

```bash
SANITY_READ_TOKEN=your-token pnpm run sync:publications
```

## Importing and syncing project themes

To import the current Projects page data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:projects
```

To refresh the current Jekyll Projects data file from Sanity:

```bash
pnpm run sync:projects
```

## Importing and syncing presentation sections

To import the current Presentations page data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:presentations
```

To refresh the current Jekyll Presentations data file from Sanity:

```bash
pnpm run sync:presentations
```

## Importing and syncing recognition sections

To import the current Recognition page data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:recognition
```

To refresh the current Jekyll Recognition data file from Sanity:

```bash
pnpm run sync:recognition
```

## Importing and syncing the expertise page

To import the current Expertise page data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:expertise
```

To refresh the current Jekyll Expertise data file from Sanity:

```bash
pnpm run sync:expertise
```

## Importing and syncing the teaching page

To import the current Teaching page data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:teaching
```

To refresh the current Jekyll Teaching data file from Sanity:

```bash
pnpm run sync:teaching
```

## Importing and syncing the homepage

To import the current homepage data into Sanity:

```bash
SANITY_AUTH_TOKEN=your-token pnpm run import:home
```

To refresh the current Jekyll homepage data file from Sanity:

```bash
pnpm run sync:home
```
