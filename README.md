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
| Programme overview on the homepage | `index.html` | `id="our-programmes"` |
| Trust members, affiliations and roles | `trustees.html` | `class="trustee-list"` |
| Homepage's next-programme notice | `index.html` | `announcement-title` |
| Homepage video tiles | `index.html` | `id="videos"` |
| Student article feature | `index.html` | `id="student-reflection"` |
| Upcoming programme details | `programmes.html` | `id="upcoming"` |
| Past programmes | `programmes.html` | `archive-entry` |
| Past programme details and photos | `programme-YYYY.html` | `id="overview"` or `id="photos"` |
| Colours, fonts, spacing and width | `assets/styles.css` | `:root` |
| Header logo | `assets/logo.png` | Replace the file |
| Browser-tab icon | Both HTML files | `rel="icon"` |
| Navigation and footer | Both HTML files | `main-nav` and `site-footer` |
| Search-result titles and descriptions | Each HTML file | `<title>` and `name="description"` |

Search for `EDIT:` in the HTML files to find the intended editing points. HTML comments look like `<!-- this -->` and are not visible on the page. Change visible text between tags; keep the surrounding tags intact. Use `&amp;` for an ampersand and `&lt;` for a literal less-than sign inside text.

The homepage's video tiles link to public YouTube videos and use YouTube-hosted thumbnails. Update each thumbnail URL and matching video link together when replacing a video. The video opens on YouTube only when selected.

The homepage's student reflection links to an external Medium article; update the linked title and summary if replacing it.

Pages with section navigation use a native collapsible “On this page” menu. Select the heading to show or hide its section links.




- Replace the logo file at `assets/logo.png` with your own PNG artwork.
- Update the logo image `src` in both HTML files to `assets/logo.png` if needed.
- The logo is alongside the trust's full name, so its empty `alt` attribute is intentional: screen readers already get the brand name.
- The browser-tab icon is a separate embedded SVG in each page. To replace it, save `assets/favicon.png` and replace the existing icon link in both pages with:

```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

## Add trustees

In `trustees.html`, find `class="trustee-list"`. Each member is one `<li class="trustee">` within the list. Add the member's name in an `<h3>`, put a known affiliation after the name, and put the role on the following line. Copy an existing `<li>` to add another member.

```html
<li class="trustee">
  <h3>Member name <span class="trustee-affiliation">— Institution</span></h3>
  <p class="trustee-role">Role</p>
</li>
```

Do not publish unconfirmed personal details or affiliations.

## Announce an upcoming programme

In `programmes.html`, replace the `upcoming-panel` inside `id="upcoming"` with your confirmed details. Also update the smaller announcement on the homepage. These are two ordinary HTML sections; they do not sync automatically.

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
- Replace the temporary logo and browser-tab icon.
- Confirm any remaining trust-member roles and affiliations before publishing.
- Add confirmed upcoming dates, venue, eligibility and application information.
- Add verified dates, venues, programme details and approved photos to each past-edition page.
- Add any contact or trust-registration details you wish to publish. None have been invented.

## Sources and limitations

The programme summary, Class 10 audience, residential format, free participation and 2026 date are the details currently recorded on this website. Edition-specific dates, venues, schedules, participant information, photos and outcomes should be added only after they are verified and approved for publication. No event outcomes or impact claims have been invented.

The IIT Bombay personal-page reference could not be loaded reliably. This is an original, restrained academic design made from scratch, not a pixel-for-pixel reproduction or an assertion about the reference site's implementation.

Check all six HTML pages, their local links, page titles and images in a desktop and mobile browser before making the site public.
