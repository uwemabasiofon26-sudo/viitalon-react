# Where to put your images

Drop your image files into these folders using the EXACT filenames below
(any format works — jpg, png, webp — just update the extension in the code
if you don't use .jpg).

## public/images/products/

Each product needs TWO kinds of images:

**1. Main image** — shown on the homepage card, shop grid, cart, and quick-buy bar:
- vortex.jpg
- creatine-monohydrate.jpg
- somnus.jpg
- magnesium-glycinate.jpg
- vigor.jpg
- the-stack.jpg

**2. Three product-page views** — shown in the slideshow on each product's own
detail page (rotates automatically every 4 seconds, with dot navigation).
Name them with `-1`, `-2`, `-3` suffixes:
- vortex-1.jpg, vortex-2.jpg, vortex-3.jpg
- creatine-monohydrate-1.jpg, creatine-monohydrate-2.jpg, creatine-monohydrate-3.jpg
- somnus-1.jpg, somnus-2.jpg, somnus-3.jpg
- magnesium-glycinate-1.jpg, magnesium-glycinate-2.jpg, magnesium-glycinate-3.jpg
- vigor-1.jpg, vigor-2.jpg, vigor-3.jpg
- the-stack-1.jpg, the-stack-2.jpg, the-stack-3.jpg

A typical shoot for the 3 views: front label, angled/lifestyle shot, and a
close-up (e.g. the supplement facts panel or the powder/capsules).
If you only have one photo for now, just skip the -1/-2/-3 files —
the slideshow will automatically fall back to showing the main image alone.

## public/images/ingredients/
- l-citrulline.jpg
- l-arginine-hcl.jpg
- taurine.jpg
- caffeine-anhydrous.jpg
- l-theanine.jpg
- creatine-monohydrate.jpg
- valerian-root-extract.jpg
- passionflower-extract.jpg
- magnesium-glycinate.jpg
- epimedium-extract.jpg
- panax-ginseng-extract.jpg
- beetroot-extract.jpg
- zinc-acetate.jpg
- black-pepper-extract.jpg

## public/images/blog/
- why-fully-disclosed-formulas-matter.jpg
- creatine-most-proven-supplement.jpg
- sleep-is-recovery.jpg

---

That's it — no code changes needed if your filenames match exactly.
The dev server (`npm run dev`) picks up new files automatically; just
refresh the browser tab after adding one.

If you'd rather use different filenames or a different format (e.g. .png,
.webp), just tell Claude and it'll update the corresponding line in
src/lib/productData.js, src/lib/ingredientData.js, src/pages/Blog.jsx,
src/pages/BlogPost.jsx, or src/components/home/BlogTeaser.jsx to match.
