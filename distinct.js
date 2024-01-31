(function setUp() {
	/* GSAP */
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollSmoother);
	gsap.registerPlugin(SplitText);

	gsap.defaults({
		ease: "power2.out",
		duration: 0.5,
	});

	/* basic smooth scroll implementation */
	ScrollSmoother.create({
		smooth: 1,
		effects: true,
	});

	/* Splide */
	Splide.defaults = {
		perMove: 1,
		gap: "0rem",
		arrows: false,
		pagination: false,
		focus: 0,
		speed: 600,
		dragAngleThreshold: 60,
		rewind: false,
		rewindSpeed: 400,
		waitForTransition: false,
		updateOnMove: true,
		trimSpace: "move",
		type: "loop",
		drag: true,
		snap: true,
		autoWidth: false,
		autoplay: true,
		interval: 5000,
	};
})();

/* progress bar */
function splide_progress(splide_instance) {
	let bar = splide_instance.root.querySelector(".slider-progress_bar");
	// Updates the bar width whenever the carousel loads and updates:
	splide_instance.on("ready active", function () {
		let end = splide_instance.Components.Controller.getEnd() + 1;
		let rate = Math.min((splide_instance.index + 1) / end, 1);
		bar.style.width = String(100 * rate) + "%";
	});
}

/* homepage services */
function mount_splide_home_services(myClass) {
	let splides = document.querySelectorAll(myClass);
	for (let i = 0; i < splides.length; i++) {
		let splide = new Splide(splides[i], {
			perMove: 1,
			gap: "1rem",
			focus: 0,
			speed: 600,
			dragAngleThreshold: 60,
			perPage: 3,
			rewindSpeed: 400,
			waitForTransition: false,
			updateOnMove: true,
			trimSpace: "move",
			type: "loop",
			drag: true,
			snap: true,
			autoplay: false,
			arrows: true,
			breakpoints: {
				767: { perPage: 1 },
				991: { perPage: 2 },
			},
		});

		splide_progress(splide); /* add progress bar */
		splide.on("mounted", function () {
			Webflow.require("ix2").init();
		});
		splide.mount();
	}
}
mount_splide_home_services(".splide.is-home-services");

/* hero slider on homepage */
function mount_splide_home_hero(myClass) {
	let splides = document.querySelectorAll(myClass);
	for (let i = 0; i < splides.length; i++) {
		let splide = new Splide(splides[i], {
			type: "fade",
			rewind: true,
			pauseOnHover: false,
			pauseOnFocus: false,
		});

		var toggleButton = document.querySelector(".splide-button");
		var buttonPause = toggleButton.querySelector(".splide-button_pause");
		var buttonPlay = toggleButton.querySelector(".splide-button_play");

		/* get all videos within slider */
		var videosContainer = document.querySelector(".home-hero");
		var videos = videosContainer.querySelectorAll("video");
		/* get progress bar */
		var progressBar = document.querySelector(".splide-button_progress-circle");

		/* add pause/play functionality */
		splide.on("autoplay:play", function () {
			toggleButton.setAttribute("aria-label", "Pause autoplay");
			buttonPlay.style.display = "none";
			buttonPause.style.display = "block";
		});

		splide.on("autoplay:pause", function () {
			toggleButton.setAttribute("aria-label", "Start autoplay");
			buttonPause.style.display = "none";
			buttonPlay.style.display = "block";
		});
		splide.on("autoplay:playing", function (rate) {
			progressBar.style.strokeDashoffset = rate;
		});

		/* when pause/play button is clicked */
		toggleButton.addEventListener("click", function () {
			var Autoplay = splide.Components.Autoplay;

			/* if splide is currently paused */
			if (Autoplay.isPaused()) {
				/* play autoplay */
				Autoplay.play();
				/* also get any onscreen videos and play them */
				videos.forEach((video) => {
					if (
						video.paused &&
						video.closest(".splide__slide").classList.contains("is-active")
					) {
						video.play();
					}
				});
			} else {
				Autoplay.pause();
				videos.forEach((video) => {
					if (
						!video.paused &&
						video.closest(".splide__slide").classList.contains("is-active")
					) {
						video.pause();
					}
				});
			}
		});

		splide.mount();
	}
}
mount_splide_home_hero(".splide.is-home-hero");

/* sticky home hero */
function stickyHomeHero() {
	ScrollTrigger.create({
		trigger: ".s-home-intro",
		start: "top 100%",
		end: "top 0%",
		scrub: true,
		pin: ".s-home-hero",
		pinSpacing: false,
	});
}

/* split text */
function splitText() {
	const splitTexts = document.querySelectorAll(".anim-split-text");

	function setupSplits() {
		splitTexts.forEach((text) => {
			// Reset if needed
			if (text.anim) {
				text.anim.progress(1).kill();
				text.split.revert();
			}

			text.split = new SplitText(text, {
				type: "words,chars",
				linesClass: "split-line",
			});

			// Set up the anim
			text.anim = gsap.from(text.split.chars, {
				scrollTrigger: {
					trigger: text,
					toggleActions: "play pause resume reverse",
					start: "top 80%",
					end: "top 20%",
					scrub: true,
				},
				//duration: 0.6,
				ease: "circ.out",
				opacity: 0.15,
				stagger: 0.02,
			});
		});
	}

	ScrollTrigger.addEventListener("refresh", setupSplits);
	setupSplits();
}

// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
	// wait until window is loaded - all images, styles-sheets, fonts, links, and other media assets
	// you could also use addEventListener() instead
	window.onload = function () {
		// OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
		window.requestAnimationFrame(function () {
			// GSAP custom code goes here
			stickyHomeHero();
			splitText();
		});
	};
});
