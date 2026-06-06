const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const html = fs.readFileSync("/Users/keithalanspeirs/documents/aws/aws-website/frontend/pages/about.html", "utf8");
const js = fs.readFileSync("/Users/keithalanspeirs/documents/aws/aws-website/frontend/js/skill-queue.js", "utf8");

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });

// Override innerWidth to simulate desktop
Object.defineProperty(dom.window, 'innerWidth', {writable: true, configurable: true, value: 1200});

dom.window.eval(js);

setTimeout(() => {
    console.log("Desktop Cards Container display:", dom.window.document.querySelector('.skill-builder-cards-container').style.display);
    console.log("Queue Area exists:", !!dom.window.document.querySelector('.queue-area'));
    if (dom.window.document.querySelector('.queue-area')) {
        console.log("Queue Area innerHTML length:", dom.window.document.querySelector('.queue-area').innerHTML.length);
    }
}, 500);
