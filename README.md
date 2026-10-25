# Bihar in Bloom

A responsive React 19 / Vite website for exploring Bihar's 38 districts and imagining responsible tree planting. The user confirmed that "automan" means autumn foliage.

## Development

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev -- --host 0.0.0.0
npm run build
npm run lint
npm run preview
```

## Features

- Search all 38 districts and filter by administrative division.
- Preview autumn, cherry-blossom and green landscape inspiration.
- Browse an 18-photo gallery with 14 autumn-tree photographs, seasonal filters, search, and an accessible full-screen viewer.
- Navigate gallery photos with previous/next buttons or arrow keys; Escape closes the viewer and returns focus. Open 3840-pixel-wide versions from each photo.
- Bookmark districts in browser localStorage, with a saved-only view.
- View district details and follow official tourism resources.
- Choose a district and proposed tree count, review four planning phases, and export a plain-text draft.
- Responsive navigation, reduced-motion support, keyboard-operated tabs and district dialogs.
- View seasonal photo source assets at 3840-pixel width from About & sources.

## Sources and Editorial Boundaries

- [Official Bihar district directory](https://bihar.s3waas.gov.in/) and [NIC Bihar](https://bihar.nic.in/) for district discovery and the 38-district count.
- [Government of Bihar](https://state.bihar.gov.in/main/CitizenHome.html), [Bihar Tourism](https://tourism.bihar.gov.in/), and [Environment & Forest Department](https://state.bihar.gov.in/forest/) for official further reading.
- [Patna](https://en.wikipedia.org/wiki/Patna) and [Rajgir](https://en.wikipedia.org/wiki/Rajgir) were consulted for the Ganga riverfront and Rajgir landscape context. Descriptions are original summaries, not copied article text.

This is an independent frontend concept, not an approved government planting programme. There are no invented plantation counts, bookings, donations, carbon offsets or live weather. The roadmap is a general proposal, not an agronomic prescription. Species, cultivar chilling needs, soil, hydrology, land permissions, planting windows and care commitments require local professional assessment. Do not assume temperate autumn foliage or cherry blossoms will grow in Bihar.

Photographs are **seasonal inspiration, not verified Bihar photographs**. District labels do not assert that the pictured landscapes are in those districts. District-specific documentary photos remain an editorial follow-up requiring verified locations and rights.

## Photography

Remote images are served by Unsplash under the [Unsplash License](https://unsplash.com/license), which permits free commercial and non-commercial use. It does not permit recreating a competing image service or selling unmodified photos. Source and license links are included in the website. Photographer metadata for the original hero assets was unavailable from the automated endpoint; no names are guessed for those assets. The expanded gallery uses free (not Unsplash+) photos selected from the public source pages, with verified photographer names and individual source links where available.

The gallery catalogue, image IDs, descriptions, photographer credits, and source links are maintained in [src/Gallery.jsx](src/Gallery.jsx). Its 18 thumbnail assets were checked in the browser and loaded successfully. Categories include 14 autumn photographs, one cherry-blossom photograph, and three green-woodland photographs. Titles are editorial captions, not location claims. Full-resolution links request 3840-pixel width; delivered dimensions do not establish camera-original resolution.

| Role               | Unsplash source asset                                        |
| ------------------ | ------------------------------------------------------------ |
| Autumn avenue      | https://images.unsplash.com/photo-1476820865390-c52aeebb9891 |
| Autumn tree canopy | https://images.unsplash.com/photo-1445964047600-cdbdb873673d |
| Cherry blossoms    | https://images.unsplash.com/photo-1522383225653-ed111181a951 |
| Green woodland     | https://images.unsplash.com/photo-1441974231531-c6227db76b6e |
| Forest lake        | https://images.unsplash.com/photo-1473448912268-2022ce9509d8 |

Autumn and cherry assets were checked in the browser at `w=3840`: they decode at 3840 x 2563, 3840 x 2245, and 3840 x 2543 respectively. This verifies delivered dimensions, not camera-original resolution. Cards use smaller images; the hero uses 3840-pixel-wide images. Network access to Unsplash and Google Fonts is required. A production privacy or offline deployment should review these third-party requests and self-host licensed assets as appropriate.

## Firebase Hosting

Firebase project: `bihar-in-bloom-vmishra18296` (Bihar in Bloom).

Hosting URL: https://bihar-bloom.web.app

Hosting site: `bihar-bloom`. The original https://bihar-in-bloom-vmishra18296.web.app address remains live with its existing release; future deployments use the shorter address configured in `firebase.json`.

Console: https://console.firebase.google.com/project/bihar-in-bloom-vmishra18296/hosting

The Firebase CLI must be installed and signed in with an account that has access to this project. No Firebase browser SDK, API key, database, or paid service is needed for this static website.

```sh
firebase login
firebase deploy --only hosting --project bihar-in-bloom-vmishra18296
```

Deploying automatically runs the existing lint and production-build commands. Only `dist/` is uploaded. Firebase serves the SPA entry point for unmatched routes, caches hashed bundles for one year, and requires revalidation for HTML and other unversioned files. Local exports and source files are not uploaded. Bookmarks remain browser-local and are not synchronized to Firebase.

To preview Hosting locally without changing the live site:

```sh
npm run build
firebase emulators:start --only hosting --project demo-bihar-in-bloom
```

The local Hosting emulator uses http://127.0.0.1:5000. Stop it before starting another process on that port. Deployment is manual; no GitHub Actions workflow or automatic production deployment has been configured.

## Persistence and Deployment

Bookmarks are local to a browser, not an account. The planner runs locally and exports a file; it does not submit information to a server. Review ticks reset when changing the planner district. No backend or API credentials are needed. Deploy the generated `dist/` directory to static hosting. Root-relative asset paths assume a root deployment; configure Vite's `base` for a subdirectory.

The empty workspace contained no existing test suite or project instructions. The unrelated C++ tasks advertised by the editor do not apply to this React website. Use the build and lint scripts above, plus browser checks for search, bookmark persistence, seasonal modes, dialog keyboard handling, roadmap export, and narrow-screen overflow. The integrated browser did not expose native download events; exported Blob contents, filename and download-link setup were verified separately.
