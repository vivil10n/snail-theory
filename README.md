# Snail Theory 🐌

A small interactive introduction to my Substack publication, *Snail Theory*.

*Snail Theory* is where I write about design, early-career life, internet culture and being human online. I made this page as a way to introduce the publication through the same ideas and visual language that shape the writing.

The page begins almost empty, with a few traces sitting in the dirt. Clicking around leaves winding ASCII trails behind, slowly turning the page into a record of where you have been.

### [Read Snail Theory →](https://snailtheory.substack.com/)

## Built with

* HTML
* CSS
* JavaScript
* GitHub Pages

## About the design

I wanted the site to feel like damp ground after rain.

The visual language borrows from ASCII art, early-web aesthetics and printed textures. Small fragments of writing sit quietly across the page, worms move through the soil, and every click creates a new trail. I also wanted the interaction to be something you discover instead of something that is immediately explained. You have to feel around a little before understanding what the page does.

The snail first became important to the publication while I was writing my first essay, [The Snail and the Infinite Scroll](https://medium.com/@suedesociety/the-snail-and-the-infinite-scroll-b3ef257041c5). I kept returning to the image of a snail because its movement is deliberate and because it leaves visible evidence of where it has been. That idea ended up shaping the name, visual language and feeling of *Snail Theory*.

## How the trails work

The trail system is written in vanilla JavaScript.

When someone clicks or taps the page, the pointer coordinates become the starting point for a new path. Each path is made from a few connected cubic Bézier curves with randomised lengths, directions and control points.

I sample points along those curves and place ASCII characters such as `/`, `\`, `_`, `~`, `.` and `,` along them. The character chosen depends loosely on the direction of the curve at that point, which helps the punctuation read as one continuous winding line.

There is also a little randomness added to the positioning, size and opacity so the trails do not feel too mathematically perfect.

Sometimes there is a snail at the end.

`@)`

## References & process

I looked at a mix of early-web work, ASCII techniques, interaction design writing and JavaScript references while making this.

### ASCII and early web

**Rowan Crawford: ASCII Graphical Techniques V1.0**  
https://www.roysac.com/tutorial/rowanasciiarttutorial.html

This was especially helpful for understanding how different ASCII characters can suggest curves and movement. I referred to it while working out how the generated trails could bend without looking like completely random punctuation.

**Rhizome: Emoticon, Emoji, Text II: Just ASCII**  
https://old.rhizome.org/editorial/2013/apr/30/emoticon-emoji-text-ii-ascii/

I liked reading about ASCII as part of the visual language of the early internet, especially the way technical limitations became an aesthetic of their own.

**Rhizome ArtBase / early net.art**  
https://archive.rhizome.org/exhibition/artbase101/

Looking through early internet art was a useful reminder that a website can be expressive in itself through text, interaction and the browser.

### Low-tech and textured web design

**LOW←TECH MAGAZINE: How to Build a Low-tech Website?**  
https://solar.lowtechmagazine.com/2018/09/how-to-build-a-low-tech-website/

Their solar-powered website was a visual reference for the project, especially its use of dithering, reduced imagery and a deliberately lightweight web aesthetic.

**LOW←TECH MAGAZINE: Rebuilding a Solar Powered Website**  
https://solar.lowtechmagazine.com/2023/06/rebuilding-a-solar-powered-website/

I also looked at how they treated technical constraints, compression and image treatment as part of the visual identity instead of something to hide.

### JavaScript and interaction

**MDN: `addEventListener()`**  
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

I used this while working through how to respond to pointer interaction on the page. Each trail begins with a `pointerdown` event and uses the coordinates of that interaction as its starting point.

**MDN: Pointer events**  
https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

This was useful for understanding pointer input across mouse and touch.

**MDN: `Document.createElement()`**  
https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

The trails are not pre-written in the HTML. JavaScript creates each character as a new element and positions it dynamically on the page.

**The Modern JavaScript Tutorial: Browser, Document, Events and Interfaces**  
https://javascript.info/ui

I referred to this while learning more about DOM manipulation, browser coordinates and event-driven interaction.

**The Modern JavaScript Tutorial: Introduction to browser events**  
https://javascript.info/introduction-browser-events

This helped me think through the basic structure of the interaction. Something happens on the page, JavaScript listens for it, and that event becomes the starting point for something new.

### Bézier curves

**Pomax: A Primer on Bézier Curves**  
https://pomax.github.io/BezierInfo-2/

This was one of the most useful technical references for the trail system.

The paths are generated using cubic Bézier curves, so I used this to understand how the control points affect the shape of a curve.

**Bezier.js by Pomax**  
https://github.com/Pomax/bezierjs

I looked through this alongside the Bézier primer to understand how curve calculations can be approached programmatically.

I did not use Bezier.js itself in the final project. The curve calculations in the site are written directly in vanilla JavaScript.

---

Designed and built by Vivian Truong for [Snail Theory](https://snailtheory.substack.com/).
