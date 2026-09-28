# Mathematical Inception Trust — website editing guide

A small, independent website made with **plain HTML and CSS**. You can edit every part in VS Code. There is no framework, JavaScript, package installation, build command, database, paid template, or external font dependency. The website works by opening `index.html` in a browser. You do not need ChatGPT to make or publish changes.

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
| Trustees and biographies | `index.html` | `TRUSTEE TEMPLATE` |
| Homepage's next-programme notice | `index.html` | `announcement-title` |
| Upcoming programme details | `programmes.html` | `id="upcoming"` |
| Past programmes | `programmes.html` | `archive-entry` |
| Colours, fonts, spacing and width | `assets/styles.css` | `:root` |
| Header logo | `assets/logo.png` | Replace the file |
| Browser-tab icon | Both HTML files | `rel="icon"` |
| Navigation and footer | Both HTML files | `main-nav` and `site-footer` |
| Search-result titles and descriptions | Each HTML file | `<title>` and `name="description"` |

Search for `EDIT:` in the HTML files to find the intended editing points. HTML comments look like `<!-- this -->` and are not visible on the page. Change visible text between tags; keep the surrounding tags intact. Use `&amp;` for an ampersand and `&lt;` for a literal less-than sign inside text.

## Replace the temporary logo

The `mi` monogram is a dummy logo, not a finished identity.

- Replace the logo file at `assets/logo.png` with your own PNG artwork.
- Update the logo image `src` in both HTML files to `assets/logo.png` if needed.
- The logo is alongside the trust's full name, so its empty `alt` attribute is intentional: screen readers already get the brand name.
- The browser-tab icon is a separate embedded SVG in each page. To replace it, save `assets/favicon.png` and replace the existing icon link in both pages with:

```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

## Add trustees

In `index.html`, find `id="trustees"`. Delete the `pending-notice` block, then uncomment the trustee template by removing its surrounding `<!-- ... -->` markers. Replace its text. Duplicate the whole `<article class="trustee">...</article>` block for each additional trustee. The number of trustees is unrestricted.

```html
<article class="trustee">
  <h3>Replace with the trustee's name</h3>
  <p class="trustee-role">Replace with their role</p>
  <p>Replace with a short, approved biography.</p>
</article>
```

You can add a link to a trustee's public profile within their biography. Only add personal contact information that the person has approved for publication.

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

In `programmes.html`, find `class="archive-list"`. Copy one complete `<article class="archive-entry">...</article>` block and paste it at the top of that list. Update the year, edition, title, date, `href`, and `aria-label`. Newest entries should appear first.

If you want full programme details on your own website, duplicate `programmes.html` into a new file such as `programme-2026.html`, keep the shared header and stylesheet link, replace the main content, and link to it with `href="programme-2026.html"`. Update its title, description, on-page navigation, and IDs together. No routing configuration is required for `.html` pages.

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

The website files can be uploaded to any host that serves static HTML. Upload **`index.html`, `programmes.html`, and the `assets/` folder together**. Do not upload just the HTML files, or styling and the logo will be missing. There is no build command. The ZIP root is the publish directory; for the hosted source checkout, use `dist/`.

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
- Add the actual trustees, roles and approved biographies.
- Add confirmed upcoming dates, venue, eligibility and application information.
- Check the original Notion archive links in a signed-out browser, or replace them with local programme pages once you have the source content.
- Add any contact or trust-registration details you wish to publish. None have been invented.

## Sources and limitations

The trust name and its public charitable status were supplied by you. The programme summary, Class 10 audience, residential format, free participation, and 1–6 May 2026 announcement were recovered from the indexed public Mathematical Inception overview:

https://elanmath.notion.site/Mathematical-Inception-e758d06073354f299e9b3e184e109934?pvs=21

That overview links to the 2023, 2024 and 2025 programme pages. Their exact link targets are preserved in the archive. The 2026 link is the URL you supplied. Those individual Notion pages could not be retrieved reliably during creation, so their full content, images, venue details, schedules, participant lists and application information have not been migrated. Verify those external pages before public launch.

The 2026 programme date is in the past as of the preparation date, 28 September 2026, so it appears in the archive. This is a historical announcement, not an independently verified event report; no outcomes, attendance figures, affiliations, testimonials or impact statistics have been invented.

The IIT Bombay personal-page reference could not be loaded reliably. This is an original, restrained academic design made from scratch, not a pixel-for-pixel reproduction or an assertion about the reference site's implementation.

Validation during preparation covered the two HTML pages, internal links, anchor targets, asset references, page titles, document language, unique IDs and image alternative attributes. The available environment did not support an interactive browser preview for this plain static project; please check the downloaded site in your own desktop and mobile browser before making it public.
