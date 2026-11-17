Hero portrait files:

  mk-ai.webp        AI-enhanced portrait, cropped 4:5 (800x1000). Set as `image` in content/bio.md.
  mk-original.webp  The same 4:5 frame cut from the original iPhone shot, aligned to mk-ai.webp
                    so the faces overlay. Set as `imageOriginal` in content/bio.md; powers the
                    before/after slider.

The full-resolution original (mk.jpg) was removed from the repo; it is still in git history
(e.g. `git show f58f83b:public/images/bio/mk.jpg > mk.jpg`).

If you replace either photo, re-crop both to the same frame or the slider will jump.
