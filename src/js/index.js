import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import observe from "./obs";
import "../scss/index.scss";

const lenis = new Lenis({
    wrapper: document.querySelector("body"),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.set(".home", {
    visibility: "visible",
});

function GsapIntro() {
    const DOM = {
        body: "body",
        home: ".home",
        nav: ".nav",
        heroTUWrap: ".hero__textUnderneathWrap",
        heroTU: ".hero__textUnderneath",
        heroImgCover: ".hero__imgCover",
        heroImgCover1: ".hero__imgCover--first",
        heroImgCover2: ".hero__imgCover--second",
        heroImg: ".hero__img",
    };

    const intro = gsap.timeline({
        delay: 1,
        defaults: {
            duration: 0.8,
            willChange: "transform",
        },
    });

    gsap.set([DOM.nav, DOM.heroImg], {
        opacity: 0,
    });

    gsap.set(DOM.heroTUWrap, {
        overflow: "hidden",
    });

    intro
        .from(DOM.heroImgCover, {
            transformOrigin: "0% 50%",
            scaleX: 0,
            stagger: 0.08,
            ease: "power1.inOut",
        })
        .set(DOM.heroImg, {
            opacity: 1,
        })
        .to(
            DOM.heroImgCover2,
            {
                transformOrigin: "100% 50%",
                scaleX: 0,
                ease: "power1.inOut",
            },
            ">+=0.2"
        )
        .to(
            DOM.heroImgCover1,
            {
                transformOrigin: "100% 50%",
                scaleX: 0,
                ease: "power1.inOut",
            },
            "<+=0.08"
        )
        .from(
            DOM.heroImg,
            {
                scale: 1.3,
                duration: 1.5,
                ease: "power1.out",
            },
            "<"
        )
        .from(
            DOM.heroTU,
            {
                yPercent: 100,
                duration: 0.4,
                ease: "power1.inOut",
            },
            "<+=40%"
        )
        .to(
            DOM.nav,
            {
                opacity: 1,
            },
            ">+=0.4"
        );
}

function GsapLinks() {
    const links = [...document.querySelectorAll('[data-animate="link"')];
    let spans;

    spans = links
        .map(function (link) {
            return [...link.querySelectorAll(".wrap span")];
        })
        .flat();

    Splitting({
        target: spans,
        by: "chars",
        whitespace: true,
    });

    links.forEach(function (link) {
        let words = link.querySelectorAll(".wrap > span");

        let wordChars1 = words[0].querySelectorAll("span");
        let wordChars2 = words[1].querySelectorAll("span");

        const tl = gsap.timeline({
            defaults: {
                duration: 0.4,
                stagger: {
                    amount: 0.1,
                    from: "end",
                },
                ease: "power1.inOut",
            },
            paused: true,
        });

        gsap.set(words[1], { opacity: 1 });

        tl.from(wordChars2, {
            yPercent: 100,
        }).to(
            wordChars1,
            {
                yPercent: -100,
            },
            "<"
        );

        link.addEventListener("mouseenter", () => tl.play());
        link.addEventListener("mouseleave", () => tl.reverse());
    });
}

function GsapTextReveal() {
    const texts = document.querySelectorAll('[data-animate="text"');

    const splits = Splitting({
        target: texts,
        by: "lines",
    });

    const obsOpts = {
        threshold: 1,
    };

    splits.forEach(function ({ el, words, lines }) {
        words.forEach(function (word) {
            const content = word.textContent;
            const wrap = `<span class="wordWrap">
                                <span class="wordWrap__word">
                                    ${content}
                                </span>
                          </span>`;

            word.innerHTML = wrap;
        });

        gsap.set(".wordWrap__word", {
            yPercent: 100,
            rotateX: 50,
            opacity: 0,
            willChange: "transform",
        });

        observe(el, obsOpts).then(function () {
            lines.forEach(function (line) {
                const words = line.map(function (word) {
                    return word.querySelector(".wordWrap__word");
                });

                gsap.to(words, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "easeOut",
                    stagger: {
                        each: 0.01,
                    },
                });
            });
        });
    });
}

GsapIntro();
GsapLinks();
GsapTextReveal();
