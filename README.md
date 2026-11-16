# Mathematical Inception Trust — website editing guide

A small, independent website made with **plain HTML and CSS**. You can edit every part in VS Code. There is no framework, JavaScript, package installation, build command, database, paid template, or external font dependency. The website works by opening `index.html` in a browser. 

## Start here

1. Extract the downloadable ZIP, keeping its folder structure.
2. In VS Code, choose **File → Open Folder** and select the extracted folder.
3. Open `index.html` in your web browser to view the home page.
4. Edit a file in VS Code, save it, then refresh the browser.
5. Open `README.md` and use VS Code's Markdown preview to read this guide.

The ZIP places website files at its root. In the hosted project's source checkout, these same website files live inside `dist/`; `dist/` is the publish folder, and its contents are handwritten source, not generated output. The editing instructions below use paths relative to that website folder.

## Where to make changes

| What you want to change | File | What to search for |
| --- | --- | --- |
| Homepage introduction and mission | `index.html` | `Homepage introduction` or `id="about"` |
| Programme differences | `programmes.html` | `id="our-programmes"` |
| Learning approach in the programme | `programmes.html` | `id="our-approach"` |
| Trust members, affiliations and roles | `index.html` | `id="trustees"` |
| Shared right-side upcoming-programme sidebar | All linked HTML pages | `announcement-title` |
| Programme video tiles | `programmes.html` | `id="videos"` |
| Student reflections | `student-reflections.html` | `class="student-story"` |
| Upcoming programme details | `programmes.html` | `id="upcoming"` |
| Past programmes | `programmes.html` | `archive-entry` |
| Past programme details and photos | `programme-YYYY.html` | `id="overview"` or `id="photos"` |
| Colours, fonts, spacing and width | `assets/styles.css` | `:root` |
| Shared masthead logos | `assets/Square_fade_PNG.png` | Replace the file |
| Browser-tab icon | Each HTML page | `rel="icon"` |
| Navigation and footer | The relevant HTML page | `main-nav` and `site-footer` |
| Search-result titles and descriptions | Each HTML file | `<title>` and `name="description"` |

Search for `EDIT:` in the HTML files to find the intended editing points. HTML comments look like `<!-- this -->` and are not visible on the page. Change visible text between tags; keep the surrounding tags intact. Use `&amp;` for an ampersand and `&lt;` for a literal less-than sign inside text.

The stylesheet links include a version query (for example, `assets/styles.css?v=20261018-1`) to prevent browsers from reusing an older cached stylesheet after an update. Whenever you change `assets/styles.css`, update the version in every HTML page's stylesheet link to a new value before publishing. Keep the version identical across all pages.

The programme page's video tiles link to public YouTube videos and use YouTube-hosted thumbnails. Update each thumbnail URL and matching video link together when replacing a video. The video opens on YouTube only when selected.

The student reflections page contains participant stories and feedback. To add a reflection, copy the existing `<article class="student-story">` in `student-reflections.html` and replace its title, summary and link with approved content.

Pages with section navigation use a native collapsible “On this page” menu. Select the heading to show or hide its section links.




- All linked pages use `assets/Square_fade_PNG.png` for both masthead logos and share the homepage's night-sky header, patterned background, upcoming-programmes sidebar, and compact footer.
- The logos are alongside the trust's full name, so their empty `alt` attributes are intentional: screen readers already get the brand name.
- The browser-tab icon is a separate image in each page. To replace it, save `assets/favicon.png` and update the icon link in each page to:

```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

## Add trustees

In `index.html`, find `id="trustees"` and its `class="trustee-list"`. Add each member as a numbered list item in the format `Name (Position) - Affiliation`. Copy an existing `<li>` to add another member.

```html
<ol class="trustee-list">
  <li class="trustee">Member name (Position) - Institution</li>
</ol>
```

Do not publish unconfirmed personal details or affiliations.

## Announce an upcoming programme

In `programmes.html`, replace the `upcoming-panel` inside `id="upcoming"` with your confirmed details. Also update the banner on the homepage. These are two ordinary HTML sections; they do not sync automatically.

This example deliberately contains replacement text, not a fictitious programme:

```html
<article class="upcoming-panel">
  <span class="status-label">Applications open</span>
  <h3>REPLACE: Programme name</h3>
  <p>REPLACE: A short programme description.</p>
  <dl class="programme-facts">
    <div><dt>Dates</dt><dd>REPLACE: Confirmed dates</dd></div>
    <div><dt>Venue</dt><dd>REPLACE: Confirmed venue</dd></div>
    <div><dt>Eligibility</dt><dd>REPLACE: Who may apply</dd></div>
  </dl>
  <p>REPLACE: Application deadline and how to apply.</p>
</article>
```

Once you have a working application URL, add an ordinary link, for example `<a href="YOUR_ACTUAL_URL">Apply for the programme</a>`. Replace `YOUR_ACTUAL_URL` before publishing. This website itself does not collect form submissions or process payments.

When a programme ends, move its record into the archive and update both upcoming notices. Dates and statuses are manually maintained; there is no automatic scheduling or expiry.

## Add a past programme

Each past programme has its own local page. The archive in `programmes.html` links to those pages. Add edition-specific details in the overview section of the corresponding page. To add another edition, create a page using the same structure and add a matching archive entry with a local `href`. Keep newest editions first.

To add photos, replace the `photo-placeholder-frame` in that edition's `photos` section with an image, for example `<img src="assets/mi2026-workshop.jpg" alt="A concise description of the photo">`. Put the approved photo in `assets/` and write accurate alternative text.

## Create a programme page from the template

`_templates/mi-programme-page-template.html` gives every edition the same simple page, in the order a visitor asks: About this edition (with key facts), Who can apply (upcoming editions), What students learn, The week, Who teaches, Gallery and In their words (completed editions), Contact, and links to the previous and next editions. GitHub Pages does not publish folders that start with `_`, so the template never appears on the live site. `programme-2026.html` is a finished example.

1. Copy the template to the website root as `programme-YYYY.html` (add the place if a year has two editions, for example `programme-2026-ppec-bengaluru.html`).
2. Replace every `REPLACE:` value with confirmed details.
3. Remove what the edition does not need. Each section runs from its `SECTION` comment to its `END SECTION` comment, and smaller parts inside a section are marked `OPTIONAL PART`. Also remove the section's link under "On this page". Never publish an empty section: if photos, quotes or videos are not ready, keep that section inside an HTML comment until they are, as `programme-2026.html` does.
4. Search the new page for `REPLACE:`. Nothing should be left.
5. Add a matching `archive-entry` in `programmes.html`, newest first, and update the previous and next links on the neighbouring edition pages.

The comment at the top of the template explains how one page is updated through an edition's life: announced, applications closed, selection published, and after the workshop. Every block uses the existing styles, so no stylesheet change is needed.

## Change the appearance

The top of `assets/styles.css` has design variables shared by both pages:

```css
:root {
  --navy: #182f4b;       /* Main headings and logo colour */
  --blue: #215d8f;       /* Links */
  --ink: #283747;        /* Body text */
  --muted: #596877;      /* Secondary text */
  --paper: #ffffff;     /* Page background */
  --wash: #f2f6fa;       /* Announcement background */
  --line: #d8e1e9;       /* Dividers */
  --site-width: 1160px;  /* Maximum content width */
}
```

The stylesheet includes desktop, tablet, mobile and print rules. Keep text legible against its background. After changing fonts or spacing, check a narrow browser window and 200% browser zoom. The layout uses system fonts so it remains self-contained.

For a real programme photograph, place the file inside `assets/`, then add an image with meaningful alternative text:

```html
<img src="assets/workshop.jpg"
     alt="Replace with an accurate description of the photograph"
     width="1200" height="800" loading="lazy">
```

Use the photograph's actual width and height, and ensure it is approved for public use.

## Publish independently and connect a domain

The website files can be uploaded to any host that serves static HTML. Upload all `.html` pages and the `assets/` folder together. Do not upload just some of the HTML files, or local programme links may break; do not omit the assets, or styling and the logo will be missing. There is no build command. The ZIP root is the publish directory; for the hosted source checkout, use `dist/`.

One option is Cloudflare Pages with Direct Upload. Consult its official instructions for the current upload procedure:

- [Cloudflare Pages: Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

The general process is:

1. Choose a static website host and create a project.
2. Upload the website folder and check its temporary hosting address.
3. Buy your chosen domain from a domain registrar. The domain is the address; the host serves the website files.
4. Add the domain in your hosting project's custom-domain settings.
5. At your registrar or DNS provider, add the exact DNS records requested by your host. Root domains and `www` subdomains may need different configuration. Do not guess record values or remove unrelated email records.
6. Complete the host's verification and HTTPS setup, then test both the chosen domain and its `www` variant if configured.
7. For later updates, edit your local files and upload the updated website again. If you want automatic publication from your own Git repository, choose a hosting project that supports Git integration when you set it up.

A private review copy made during this conversation is separate from independent hosting. Downloading this source gives you the website files; it does not automatically sync future local edits to that review copy. You can use the downloaded website with your own host and domain without depending on this conversation.

## Content that still needs your input

- Review and approve the homepage mission and approach wording; it is draft copy based on the programme description.
- Replace the browser-tab icon if the trust has approved replacement artwork.
- Confirm any remaining trust-member roles and affiliations before publishing.
- Add confirmed upcoming dates, venue, eligibility and application information.
- Add verified dates, venues, programme details and approved photos to each past-edition page.
- Add any contact or trust-registration details you wish to publish. None have been invented.

## Sources and limitations

The programme summary, Class 10 audience, residential format, free participation and 2026 date are the details currently recorded on this website. Edition-specific dates, venues, schedules, participant information, photos and outcomes should be added only after they are verified and approved for publication. No event outcomes or impact claims have been invented.

The IIT Bombay personal-page reference could not be loaded reliably. This is an original, restrained academic design made from scratch, not a pixel-for-pixel reproduction or an assertion about the reference site's implementation.

Check all six HTML pages, their local links, page titles and images in a desktop and mobile browser before making the site public.
