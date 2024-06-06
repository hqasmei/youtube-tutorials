## Refactored

- Using pnpm instead of npm
- Moved globals.css from /app to /styles
- Added Shadcn
  - Button
  - Form
  - Label
- Added Zod
- Added prettier.config.js using @ianvs/prettier-plugin-sort-imports

## To Update

- Update favicon.ico: https://favicon.io/
- Update opengraph-image.png & twitter-image.png: size 1200 x 630, https://og-playground.vercel.app/
  - To test, https://docs.srv.us/
  - run `ssh srv.us -R 1:localhost:3000`
  - get url and put in https://www.opengraph.xyz/
- Update apple-icon.png, 512 x 512
- Update icon.png, 512 x 512
- Update sitemap.ts, to show all the routes in the web app, check by doing /sitemap.xml
- Update robots.ts, for the disallow
- Update Vercel Environmental Variables for NEXT_PUBLIC_BASE_URL

## Resources
- https://search.google.com/, to see your search performance

