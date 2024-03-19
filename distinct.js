// Create a global object to store component data
const distinct = {};
distinct.anim = {};
distinct.helpers = {};

function distinct_anim() {
	// create all the anim functions
	function anim_set_up() {
		/* */
		/* SET UP */

		/* GSAP */
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(SplitText);
		gsap.registerPlugin(Draggable);
		gsap.registerPlugin(InertiaPlugin);
		gsap.registerPlugin(Flip);

		gsap.defaults({
			ease: "power2.out",
			duration: 0.5,
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

		/* FUNCTIONS */

		/* progress bar */
		distinct.helpers.splide_progress = function (splide_instance) {
			let bar = splide_instance.root.querySelector(".slider-progress_bar");
			// Updates the bar width whenever the carousel loads and updates:
			splide_instance.on("ready active", function () {
				let end = splide_instance.Components.Controller.getEnd() + 1;
				let rate = Math.min((splide_instance.index + 1) / end, 1);
				bar.style.width = String(100 * rate) + "%";
			});
		};

		/* pause this splide on hover */
		distinct.helpers.splide_hover_pause = function (splide_instance) {
			const splide_track = splide_instance.root.querySelector(".splide__track"); //get child track
			var AutoScroll = splide_instance.Components.AutoScroll;

			// Pause Splide when hovering over the track
			splide_track.addEventListener("mouseenter", function () {
				AutoScroll.pause();
			});

			// Resume Splide when not hovering over the element
			splide_track.addEventListener("mouseleave", function () {
				AutoScroll.play();
			});
		};

		/* homepage services */
		distinct.anim.splide_home_services = function (
			myClass = ".splide.is-home-services"
		) {
			if (!document.querySelector(myClass)) return;

			let splides = document.querySelectorAll(myClass);

			for (let i = 0; i < splides.length; i++) {
				const isMobile = window.innerWidth <= 767;

				let splideOptions = {
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
					pauseOnHover: false,
					interval: 10000,
					arrows: true,
					breakpoints: {
						767: { perPage: 1 },
						1200: { perPage: 2 },
					},
					autoScroll: {
						autoStart: false,
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: false,
						speed: 1,
					},
				};

				// Conditionally add autoScroll options if not on mobile
				if (!isMobile) {
					splideOptions.autoScroll = {
						autoStart: true,
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: false,
						speed: 1,
					};
				}

				let splide = new Splide(splides[i], splideOptions);

				splide.on("mounted", function () {
					Webflow.require("ix2").init();
				});

				// /* gsap scroll trigger to pause when out of viewport */
				// ScrollTrigger.create({
				// 	trigger: ".s-home-services",
				// 	start: "top bottom",
				// 	end: "bottom top",
				// 	// markers: true,
				// 	onEnter: () => splideOptions.AutoScroll.play(),
				// 	onLeave: () => splideOptions.AutoScroll.pause(),
				// 	onEnterBack: () => splideOptions.AutoScroll.play(),
				// 	onLeaveBack: () => splideOptions.AutoScroll.pause(),
				// });

				splide.mount(window.splide.Extensions);

				// distinct.helpers.splide_progress(splide); /* add progress bar */
				// distinct.helpers.splide_hover_pause(splide); //pause on hover on track
			}
		};

		/* sustainability approach */
		distinct.anim.splide_sustainability_approach = function (
			myClass = ".splide.is-sustainability-approach"
		) {
			if (!document.querySelector(myClass)) return;

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

				distinct.helpers.splide_progress(splide); /* add progress bar */
				splide.on("mounted", function () {
					Webflow.require("ix2").init();
				});
				splide.mount();
			}
		};

		/* homepage testimonials */
		distinct.anim.splide_home_testimonials = function (
			myClass = ".splide.is-home-testimonials"
		) {
			if (!document.querySelector(myClass)) return;

			let splides = document.querySelectorAll(myClass);
			for (let i = 0; i < splides.length; i++) {
				let splide = new Splide(splides[i], {
					perMove: 1,
					gap: "0rem",
					focus: 0,
					speed: 750,
					dragAngleThreshold: 60,
					perPage: 1,
					rewindSpeed: 400,
					waitForTransition: false,
					updateOnMove: true,
					trimSpace: "move",
					type: "fade",
					drag: true,
					snap: true,
					autoplay: false,
					arrows: true,
					rewind: true,
				});

				distinct.helpers.splide_progress(splide); /* add progress bar */
				splide.on("mounted", function () {
					Webflow.require("ix2").init();
				});
				splide.mount();
			}
		};

		/* ethos slider */
		distinct.anim.splide_about_ethos = function (myClass = ".splide.is-ethos") {
			if (!document.querySelector(myClass)) return;

			let splides = document.querySelectorAll(myClass);
			for (let i = 0; i < splides.length; i++) {
				let splide = new Splide(splides[i], {
					gap: "1rem",
					perPage: 1,
					type: "slide",
					autoplay: false,
					arrows: true,
					mediaQuery:
						"min" /* mobile first - so slider is destroyed for 768 and above */,
					breakpoints: {
						768: {
							destroy: true,
						},
					},
				});

				splide.mount();
			}
		};

		/* hero slider on homepage */
		distinct.anim.splide_home_hero = function (
			myClass = ".splide.is-home-hero"
		) {
			if (!document.querySelector(myClass)) return;

			let splides = document.querySelectorAll(myClass);
			for (let i = 0; i < splides.length; i++) {
				let splide = new Splide(splides[i], {
					type: "fade",
					rewind: true,
					pauseOnHover: false,
					pauseOnFocus: false,
					gap: "0rem",
					autoplay: true,
				});

				var toggleButton = document.querySelector(".splide-button");
				var buttonPause = toggleButton.querySelector(".splide-button_pause");
				var buttonPlay = toggleButton.querySelector(".splide-button_play");

				/* get all videos within slider */
				var videosContainer = document.querySelector(".hero");
				var videos = videosContainer.querySelectorAll("video");
				/* get progress bar */
				var progressBar = document.querySelector(
					".splide-button_progress-circle"
				);

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

				/* gsap scroll trigger to pause when intro overlaps it */
				ScrollTrigger.create({
					trigger: ".section-spacing.is-home",
					start: "top bottom",
					end: "top 10%",
					// markers: true,
					onEnter: () => splide.Components.Autoplay.play(),
					onLeave: () => splide.Components.Autoplay.pause(),
					onEnterBack: () => splide.Components.Autoplay.play(),
					onLeaveBack: () => splide.Components.Autoplay.pause(),
				});

				splide.mount();
			}
		};

		/* split text */
		distinct.anim.splitText = function () {
			if (!document.querySelector(".anim-split-text")) return;

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
		};

		/* slide text */
		distinct.anim.slideText = function () {
			if (!document.querySelector(".anim-slide-text")) return;

			const splitTexts = document.querySelectorAll(".anim-slide-text");

			function setupSlides() {
				splitTexts.forEach((text) => {
					// Reset if needed
					// if (text.lines[0].anim) {
					// 	text.anim.progress(1).kill();
					// 	text.lines.revert();
					// }

					text.split = new SplitText(text, {
						type: "lines",
						linesClass: "slide-line",
					});

					text.parent = new SplitText(text, {
						linesClass: "slide-line-parent",
					});

					// text.anim = [];

					text.anim = gsap.from(text.split.lines, {
						ScrollTrigger: {
							trigger: text,
							toggleActions: "play pause resume reverse",
							start: "top 60%",
							end: "top 20%",
							scrub: true,
						},
						ease: "circ.out",
						y: 100,
						stagger: 0.02,
					});
				});
			}

			ScrollTrigger.addEventListener("refresh", setupSlides);
			setupSlides();
		};

		distinct.anim.slideText_v2 = function () {
			document.fonts.ready.then(function () {
				// try waiting for custom fonts to load first

				/* --- Split the text, Client Title --- */
				function setupSplits() {
					const targets = gsap.utils.toArray(
						".anim-slide-text:not(.w-richtext), .anim-slide-text.w-richtext :is(h1, h2, h3, h4)"
					); // NB rich text elements don't work the same - need to target the relevant children instead
					targets.forEach((target) => {
						let targetSelector = gsap.utils.selector(target); // get a selector fn we can use at the end

						/* set custom fonts to default for splitting purposes */

						let first_split = new SplitText(target, {
							type: "lines",
							linesClass: "split-line-inner",
						});

						let second_split = new SplitText(target, {
							type: "lines",
							linesClass: "split-line-outer",
						});
						gsap.set(first_split.lines, { y: "100%" });
						gsap.set(".anim-slide-text", { autoAlpha: 1 });
						// ScrollTrigger.refresh();

						var arrowEls = prepArrows(target);
						if (arrowEls) {
							var arrow = arrowEls[0];
							var outerLine = arrowEls[1];
							var innerLine = arrowEls[2];
							var arrowWidth = arrow.offsetWidth + 10;
						}

						gsap
							.timeline({
								scrollTrigger: {
									trigger: target,
									start: "top 80%",
									// end: "bottom 50%",
									// scrub: true,
								},
							})
							.to(first_split.lines, {
								y: "0%",
								ease: "power2.out",
								stagger: 0.1,
							})
							.addLabel("slideDone", ">")
							.to(innerLine, { x: arrowWidth })
							.to(arrow, { x: 0 }, "<")
							.set(
								targetSelector(".split-line-outer"),
								{
									"overflow-y": "visible",
								},
								"slideDone"
							); // when anim done, get the ...-outer elements within this target and turn off the overflow, to avoid any clipping issues

						// tl_split.to(first_split.lines, {
						// 	// duration: 1,
						// 	y: "0%",
						// 	ease: "power2.out",
						// 	stagger: 0.1,
						// 	scrollTrigger: {
						// 		trigger: target,
						// 		start: "top 80%",
						// 		end: "bottom 70%",
						// 		scrub: true,
						// 	},
						// 	// onComplete: () => {
						// 	// 	if (arrowEls) {
						// 	// 		var arrowWidth = arrow.offsetWidth + 10;
						// 	// 		gsap.to(innerLine, { x: arrowWidth });
						// 	// 		gsap.to(arrow, { x: 0 });
						// 	// 	}
						// 	// },
						// });

						// tl_split.to(innerLine, { x: arrowWidth });
						// tl_split.to(arrow, { x: 0 });
					});
				}

				setupSplits();

				/* --- Split the text, Client Title --- */
				function setupSplits_instant() {
					const targets = gsap.utils.toArray(
						".anim-slide-text-instant:not(.w-richtext), .anim-slide-text-instant.w-richtext :is(h1, h2, h3, h4)"
					); // NB rich text elements don't work the same - need to target the relevant children instead
					targets.forEach((target) => {
						/* set custom fonts to default for splitting purposes */

						let first_split = new SplitText(target, {
							type: "lines",
							linesClass: "split-line-inner",
						});

						let second_split = new SplitText(target, {
							type: "lines",
							linesClass: "split-line-outer",
						});
						gsap.set(first_split.lines, { y: "100%" });
						gsap.set(".anim-slide-text-instant", { autoAlpha: 1 });

						let tl_split = gsap.timeline();

						tl_split.to(first_split.lines, {
							duration: 1,
							y: "0%",
							ease: "power2.out",
							stagger: 0.1,
						});
					});
				}
				setupSplits_instant();

				function prepArrows(target) {
					var indentedAncestor = target.closest(".indent");
					if (indentedAncestor) {
						//if target is indented
						var arrow = indentedAncestor.querySelector(".indent_arrow"); // arrow to move
						var outerLine = target.querySelector(
							".split-line-outer:first-of-type "
						); // line to move arrow to
						var innerLine = outerLine.querySelector(
							".split-line-inner:first-of-type "
						);
						outerLine.prepend(arrow); // move arrow
						gsap.set(outerLine, {
							display: "flex",
							"flex-direction": "row",
							position: "relative",
						});

						gsap.set(arrow, { position: "absolute", x: "-100%" });

						return [arrow, outerLine, innerLine];
					}
				}
			});
		};

		/* flexccordion */
		distinct.anim.flexccordion = function () {
			if (!document.querySelector(".flexccordion_item")) return;

			const tl = gsap.timeline();

			/* set initial states */
			tl.set(".flexccordion_item:not(:nth-child(1)) .flexccordion_item-body", {
				height: 0,
				opacity: 0,
			});
			tl.set(".flexccordion_item:not(:nth-child(1)) .card", {
				autoAlpha: 0,
			});
			tl.set(
				[
					".flexccordion_item:not(:nth-child(1)) :is(.flexccordion-bar, .flexccordion-bar_short)",
				],
				{
					height: 0,
				}
			);

			// Click event listener for flexccordion headers
			document
				.querySelectorAll(".flexccordion_item-header")
				.forEach((header, index) => {
					header.addEventListener("click", () => {
						const tl_item = gsap.timeline();
						// get parent flexccordion
						const flexccordion = header.closest(".flexccordion");
						//Returns a selector function that's scoped to a particular Element, meaning it'll only find descendants of that Element like jQuery.find().
						let gsap_flexccordion = gsap.utils.selector(flexccordion);

						// Find the parent .flexccordion_item element
						const item = header.closest(".flexccordion_item");

						// Find the .flexccordion_item-body element within the parent item
						const body = item.querySelector(".flexccordion_item-body");

						// Find the .card element within the parent item
						const card = item.querySelector(".card");

						// Get parent right element - we need to hide this so cards are hoverable */
						const right = item.querySelector(".flexccordion_right");

						// get bar
						const bar = item.querySelector(".flexccordion-bar");
						const bar_short = item.querySelector(".flexccordion-bar_short");

						// Close all other items within this flexccordion
						tl_item.to(gsap_flexccordion(".flexccordion_item-body"), {
							height: 0,
							opacity: 0,
							duration: 0.35,
						});
						tl_item.to(
							gsap_flexccordion(".card"),
							{
								autoAlpha: 0,
								// display: "none", /* we need to hide cards otherwise hover doesn't work */
								duration: 0.1,
							},
							0.1
						);
						tl_item.to(
							gsap_flexccordion([
								".flexccordion-bar",
								".flexccordion-bar_short",
							]),
							{
								height: 0,
							},
							0
						);
						gsap.set(body, { height: "auto", opacity: 1 }); // temporarily set the body to height auto so we can capture the required height of the bar
						const item_height = item.offsetHeight;
						// Expand clicked item
						tl_item.from(
							body,
							{
								height: "0",
								opacity: 0,
								duration: 0.35,
							},
							0.2
						);
						tl_item.to(
							card,
							{
								autoAlpha: 1,
								duration: 0.35,
								// display: "flex",
							},
							0.3
						);
						tl_item.to(
							bar,
							{
								height: item_height,
								duration: 0.35,
							},
							0.2
						);
						tl_item.addLabel("open", ">");
						tl_item.to(
							bar_short,
							{
								height: 25,
								duration: 0.35,
							},
							0.2
						);

						// when body anim is done, set body height to auto
						tl_item.set(body, { height: "auto", opacity: 1 }, "open");
					});
				});
		};

		distinct.anim.featuresTab = function () {
			if (!document.querySelector(".feature_body")) return;

			/* set initial states */

			const tl = gsap.timeline();
			/* hide all images and text */
			tl.set(".feature_body, .feature_img", {
				opacity: 0,
			});
			/* set all titles opacity */
			tl.set(".feature-title", {
				opacity: 0.5,
			});

			/* make first item active */
			tl.set(
				".features_item:nth-child(1) :is(.feature_body, .feature_img, .feature-title)",
				{
					opacity: 1,
				}
			);

			// event listener for feature titles
			var featureTitles = document.querySelectorAll(".feature-title");
			featureTitles.forEach((title, index) => {
				// timeline for each item
				const tl_item = gsap.timeline({ paused: true }); // Change paused to true

				/* create the timeline */
				(function feature_mouseOver() {
					// get parent features component
					const features = title.closest(".features");
					let gsap_features = gsap.utils.selector(features);

					// Find the parent .features_item element
					const item = title.closest(".features_item");
					let gsap_item = gsap.utils.selector(item);

					// Find the .feature_body element within the parent item
					const body = item.querySelector(".feature_body");

					// Find the img within the parent item
					const img = item.querySelector(".feature_img");

					// make other items inactive
					// tl_item.to(
					// 	gsap_features(".feature_body"),
					// 	{
					// 		opacity: 0,
					// 		duration: 0.35,
					// 	},
					// 	0
					// );
					// tl_item.to(
					// 	gsap_features(".feature_img"),
					// 	{
					// 		opacity: 0,
					// 		duration: 0.75,
					// 	},
					// 	0
					// );
					// tl_item.to(
					// 	gsap_features(".feature-title"),
					// 	{
					// 		opacity: 0.5,
					// 		duration: 0.15,
					// 	},
					// 	0
					// );

					// show item
					tl_item.to(
						title,
						{
							opacity: 1,
							duration: 0.85,
						},
						0.05
					);
					tl_item.to(
						body,
						{
							opacity: 1,
							duration: 0.3,
						},
						0.2
					);
					tl_item.to(
						img,
						{
							opacity: 1,
							duration: 0.85,
						},
						0.05
					);
				})();

				/* store timeline on DOM node */
				title.animation = tl_item;

				/* create event handlers */
				title.addEventListener("mouseover", () => {
					title.animation.play();
				});
				title.addEventListener("mouseout", () => {
					title.animation.reverse();
				});

				/* play for first item */
				// featureTitles[0].animation.play();
			});
		};

		distinct.anim.brandScroll = function () {
			if (!document.querySelector(".brands_list-item")) return;

			const brands_loop = verticalLoop(".brands_list-item", {
				repeat: -1,
				paused: true,
				center: true,
				draggable: true,
				inertia: true,
				speed: 0.8,
			});

			/* add a scroll trigger to only play animation when in viewport */
			ScrollTrigger.create({
				trigger: ".home-brands",
				start: "top bottom",
				end: "bottom top",
				// markers: true,
				onEnter: () => brands_loop.play(),
				onLeave: () => brands_loop.pause(),
				onEnterBack: () => brands_loop.play(),
				onLeaveBack: () => brands_loop.pause(),
				// onRefresh: () => logRed("onRefresh"),
				// onUpdate: self => redProgress.innerText = "progress: " + self.progress.toFixed(3)
			});

			// return brands_loop;

			/* Helper function from GSAP https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop */
			// use the helper function to build a seamless looping gsap.timeline() with some special properties/methods

			/*
This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.

Features:
- Uses yPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates up or down enough, it will loop back to the other side
- Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingBottom.
- The returned timeline will have the following methods added to it:
    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
    - times - an Array of the times on the timeline where each element hits the "starting" spot.
    - elements - an Array of the elements that are being controlled by the timeline
*/
			function verticalLoop(items, config) {
				items = gsap.utils.toArray(items);
				config = config || {};
				let onChange = config.onChange,
					lastIndex = 0,
					tl = gsap.timeline({
						repeat: config.repeat,
						onUpdate:
							onChange &&
							function () {
								let i = tl.closestIndex();
								if (lastIndex !== i) {
									lastIndex = i;
									onChange(items[i], i);
								}
							},
						paused: config.paused,
						defaults: { ease: "none" },
						onReverseComplete: () =>
							tl.totalTime(tl.rawTime() + tl.duration() * 100),
					}),
					length = items.length,
					startY = items[0].offsetTop,
					times = [],
					heights = [],
					spaceBefore = [],
					yPercents = [],
					curIndex = 0,
					center = config.center,
					clone = (obj) => {
						let result = {},
							p;
						for (p in obj) {
							result[p] = obj[p];
						}
						return result;
					},
					pixelsPerSecond = (config.speed || 1) * 100,
					snap =
						config.snap === false
							? (v) => v
							: gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
					timeOffset = 0,
					container =
						center === true
							? items[0].parentNode
							: gsap.utils.toArray(center)[0] || items[0].parentNode,
					totalHeight,
					getTotalHeight = () =>
						items[length - 1].offsetTop +
						(yPercents[length - 1] / 100) * heights[length - 1] -
						startY +
						spaceBefore[0] +
						items[length - 1].offsetHeight *
							gsap.getProperty(items[length - 1], "scaleY") +
						(parseFloat(config.paddingBottom) || 0),
					populateHeights = () => {
						let b1 = container.getBoundingClientRect(),
							b2;
						items.forEach((el, i) => {
							heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
							yPercents[i] = snap(
								(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i]) *
									100 +
									gsap.getProperty(el, "yPercent")
							);
							b2 = el.getBoundingClientRect();
							spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
							b1 = b2;
						});
						gsap.set(items, {
							// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
							yPercent: (i) => yPercents[i],
						});
						totalHeight = getTotalHeight();
					},
					timeWrap,
					populateOffsets = () => {
						timeOffset = center
							? (tl.duration() * (container.offsetWidth / 2)) / totalHeight
							: 0;
						center &&
							times.forEach((t, i) => {
								times[i] = timeWrap(
									tl.labels["label" + i] +
										(tl.duration() * heights[i]) / 2 / totalHeight -
										timeOffset
								);
							});
					},
					getClosest = (values, value, wrap) => {
						let i = values.length,
							closest = 1e10,
							index = 0,
							d;
						while (i--) {
							d = Math.abs(values[i] - value);
							if (d > wrap / 2) {
								d = wrap - d;
							}
							if (d < closest) {
								closest = d;
								index = i;
							}
						}
						return index;
					},
					populateTimeline = () => {
						let i, item, curY, distanceToStart, distanceToLoop;
						tl.clear();
						for (i = 0; i < length; i++) {
							item = items[i];
							curY = (yPercents[i] / 100) * heights[i];
							distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
							distanceToLoop =
								distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
							tl.to(
								item,
								{
									yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
									duration: distanceToLoop / pixelsPerSecond,
								},
								0
							)
								.fromTo(
									item,
									{
										yPercent: snap(
											((curY - distanceToLoop + totalHeight) / heights[i]) * 100
										),
									},
									{
										yPercent: yPercents[i],
										duration:
											(curY - distanceToLoop + totalHeight - curY) /
											pixelsPerSecond,
										immediateRender: false,
									},
									distanceToLoop / pixelsPerSecond
								)
								.add("label" + i, distanceToStart / pixelsPerSecond);
							times[i] = distanceToStart / pixelsPerSecond;
						}
						timeWrap = gsap.utils.wrap(0, tl.duration());
					},
					refresh = (deep) => {
						let progress = tl.progress();
						tl.progress(0, true);
						populateHeights();
						deep && populateTimeline();
						populateOffsets();
						deep && tl.draggable
							? tl.time(times[curIndex], true)
							: tl.progress(progress, true);
					},
					proxy;
				gsap.set(items, { y: 0 });
				populateHeights();
				populateTimeline();
				populateOffsets();
				window.addEventListener("resize", () => refresh(true));
				function toIndex(index, vars) {
					vars = clone(vars);
					Math.abs(index - curIndex) > length / 2 &&
						(index += index > curIndex ? -length : length); // always go in the shortest direction
					let newIndex = gsap.utils.wrap(0, length, index),
						time = times[newIndex];
					if (time > tl.time() !== index > curIndex) {
						// if we're wrapping the timeline's playhead, make the proper adjustments
						time += tl.duration() * (index > curIndex ? 1 : -1);
					}
					if (vars.revolutions) {
						time += tl.duration() * Math.round(vars.revolutions);
						delete vars.revolutions;
					}
					if (time < 0 || time > tl.duration()) {
						vars.modifiers = { time: timeWrap };
					}
					curIndex = newIndex;
					vars.overwrite = true;
					gsap.killTweensOf(proxy);
					return tl.tweenTo(time, vars);
				}
				tl.elements = items;
				tl.next = (vars) => toIndex(curIndex + 1, vars);
				tl.previous = (vars) => toIndex(curIndex - 1, vars);
				tl.current = () => curIndex;
				tl.toIndex = (index, vars) => toIndex(index, vars);
				tl.closestIndex = (setCurrent) => {
					let index = getClosest(times, tl.time(), tl.duration());
					setCurrent && (curIndex = index);
					return index;
				};
				tl.times = times;
				tl.progress(1, true).progress(0, true); // pre-render for performance
				if (config.reversed) {
					tl.vars.onReverseComplete();
					tl.reverse();
				}
				if (config.draggable && typeof Draggable === "function") {
					proxy = document.createElement("div");
					let wrap = gsap.utils.wrap(0, 1),
						ratio,
						startProgress,
						draggable,
						dragSnap,
						align = () =>
							tl.progress(
								wrap(startProgress + (draggable.startY - draggable.y) * ratio)
							),
						syncIndex = () => tl.closestIndex(true);
					typeof InertiaPlugin === "undefined" &&
						console.warn(
							"InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
						);
					draggable = Draggable.create(proxy, {
						trigger: items[0].parentNode,
						type: "y",
						onPressInit() {
							gsap.killTweensOf(tl);
							startProgress = tl.progress();
							refresh();
							ratio = 1 / totalHeight;
							gsap.set(proxy, { y: startProgress / -ratio });
						},
						onDrag: align,
						onThrowUpdate: align,
						inertia: true,
						snap: (value) => {
							let time = -(value * ratio) * tl.duration(),
								wrappedTime = timeWrap(time),
								snapTime = times[getClosest(times, wrappedTime, tl.duration())],
								dif = snapTime - wrappedTime;
							Math.abs(dif) > tl.duration() / 2 &&
								(dif += dif < 0 ? tl.duration() : -tl.duration());
							return (time + dif) / tl.duration() / -ratio;
						},
						onRelease: syncIndex,
						onThrowComplete: syncIndex,
					})[0];
					tl.draggable = draggable;
				}
				tl.closestIndex(true);
				onChange && onChange(items[curIndex], curIndex);
				return tl;
			}
		};

		distinct.anim.collabs = function () {
			if (!document.querySelector(".collabs")) return;

			// collaboration logo grids on service etc pages

			(function loadCollabs() {
				// get all collabs instances on page, their child rows and logos, as well as gsap scope functions for each
				let collabs = {
					instances: [],
				};

				const instances = gsap.utils.toArray(".collabs");

				instances.forEach((instance) => {
					const componentInfo = {
						rows: [],
						element: instance,
						gsapScope: gsap.utils.selector(instance),
					};

					const collabsRows = componentInfo.gsapScope(
						".collabs_list:not(.is-mobile)"
					); /* don't process the mobile logos */

					const rows = collabsRows.map((row) => ({
						element: row,
						gsapScope: gsap.utils.selector(row),
						logos: gsap.utils.toArray(row.querySelectorAll(".collabs_item")),
					}));

					componentInfo.rows = rows;
					collabs.instances.push(componentInfo);
				});

				distinct.collabs = collabs;
			})();

			// stop if no instances of component
			if (distinct.collabs.instances.length == 0) {
				console.log("no collabs found");
				return;
			}

			(function getLogosToChange() {
				distinct.collabs.instances.forEach((instance) => {
					// get the logos that should start 'wide' - ie with a large flex-basis. This creates the gap
					// 1st row we want 1st logo, 2nd row we want 2nd, 3rd row 3rd (and then we loop back to 1st logo if we have 4+ rows).
					instance.wide_start = instance.gsapScope([
						".collabs_list-wrap:nth-child(2n+1) .collabs_item:nth-child(3n+1)",
						".collabs_list-wrap:nth-child(2n+2) .collabs_item:nth-child(3n+2)",
						".collabs_list-wrap:nth-child(3n+3) .collabs_item:nth-child(3n+3)",
					]);
					// get the logos that should be wide at the end of the animation - this is the last logo in each row.
					instance.wide_end = instance.gsapScope(".collabs_item:nth-child(3)");

					instance.wide_start.forEach((item) => {
						growLogo(item);
					});
				});
			})();

			function growLogo(item) {
				item.style.flexBasis = "calc(50% - (2 * var(--collabs-gap)))";
				item.style.flexGrow = "1";
			}

			function shrinkLogo(item) {
				item.style.flexBasis = "auto";
				item.style.flexGrow = "0";
			}

			function doFlip(instance) {
				// do the animation
				instance.rows.forEach((row) => {
					// for each row, store the initial states of the row and all child logos, and the rows starting height
					// row.logos = row.gsapScope(".collabs_item");
					row.state = Flip.getState(row.logos, row.element);
					row.startingHeight = gsap.getProperty(row.element, "height");
					// console.log(row.startingHeight);
					// gsap.set(row, { height: row.startingHeight });
				});

				// do the style change
				function changeLayout(instance) {
					// make all these items auto sized
					instance.wide_start.forEach((item) => {
						shrinkLogo(item);
					});
					// make these items grow
					instance.wide_end.forEach((item) => {
						growLogo(item);
					});
				}
				changeLayout(instance);

				instance.rows.forEach((row) => {
					// get height after style change
					row.newHeight = gsap.getProperty(row, "height");
					// set height back to original height
					gsap.set(row.element, { height: row.startingHeight });
					Flip.from(row.state, {
						absolute: true, // uses position: absolute during the flip to work around flexbox challenges
						duration: 1,
						stagger: 0.025, // slight stagger
					});
				});
			}

			distinct.collabs.instances.forEach((instance) => {
				// create a scroll trigger for each instance
				ScrollTrigger.create({
					trigger: instance.element, // the trigger is the parent component
					start: "top center",
					onEnter: () => {
						doFlip(instance); // do animation for this instance
					},
				});
			});
		};

		distinct.anim.slider_caseStudies = function () {
			if (!document.querySelector(".case-studies")) return;

			const caseStudies = {
				component: document.querySelector(".case-studies"), // get the parent component element
				slides: [],
				currentSlideIndex: 0,
				nextSlideIndex: 0,
				previousSlideIndex: 0,
				nextButton: document.querySelector(
					".splide__arrow--next#case-study-next"
				),
				previousButton: document.querySelector(
					".splide__arrow--prev#case-study-prev"
				),
				loop: true,
				progressElement: document.querySelector(
					".slider-progress_bar#case-study"
				),
			};

			(function getSlides() {
				const slideElements =
					caseStudies.component.querySelectorAll(".case-study"); // get all slides

				slideElements.forEach((slideElement, index) => {
					const slideObj = {
						slide: slideElement,
						isActive: false,
						image: slideElement.querySelector(".case-study_img-wrap"), // get slide image
						body: slideElement.querySelector(".case-study_body"), // get slide body
						caption: slideElement.querySelector(".testimonial_caption"), // get slide caption
					};

					if (index === 0) {
						slideObj.isActive = true; // Set first slide as active
					} else {
						slideObj.image.style.opacity = 0;
						slideObj.body.style.opacity = 0;
						slideObj.caption.style.opacity = 0;
					}

					caseStudies.slides.push(slideObj); //add slides to caseStudies obj
				});
			})();

			(function openFirstSlide() {
				// if at least one slide, set first slide active
				if (caseStudies.slides.length != 0) {
					caseStudies.currentSlideIndex = 0;
					caseStudies.slides[0].isActive = true;
					updateIndexes(); // get prev and next indexes and pass to cS obj
					updateProgress(); // update progress bar
				}
			})();

			// update progress bar
			function updateProgress() {
				const percent =
					(caseStudies.currentSlideIndex / (caseStudies.slides.length - 1)) *
					100;
				// console.log(percent);
				if (caseStudies.progressElement) {
					gsap.to(caseStudies.progressElement, {
						width: `${percent}%`,
						duration: 0.5,
					});
				}
			}

			// get next and previous slides
			function getPreviousAndNextIndexes(
				totalSlides,
				currentIndex,
				shouldLoop
			) {
				if (currentIndex < 0 || currentIndex >= totalSlides) {
					throw new Error("Current slide index is out of range");
				}

				let previousIndex = currentIndex - 1;
				let nextIndex = currentIndex + 1;

				if (shouldLoop) {
					previousIndex = (previousIndex + totalSlides) % totalSlides;
					nextIndex = nextIndex % totalSlides;
				} else {
					previousIndex = Math.max(previousIndex, 0);
					nextIndex = Math.min(nextIndex, totalSlides - 1);
				}

				return {
					previousIndex: previousIndex,
					nextIndex: nextIndex,
				};
			}

			// update indexes
			function updateIndexes() {
				const indexes = getPreviousAndNextIndexes(
					caseStudies.slides.length,
					caseStudies.currentSlideIndex,
					caseStudies.loop
				);
				caseStudies.previousSlideIndex = indexes.previousIndex;
				caseStudies.nextSlideIndex = indexes.nextIndex;
			}

			// on next click
			caseStudies.nextButton.addEventListener("click", () => {
				openSlide(caseStudies.nextSlideIndex);
			});

			// on prev click
			caseStudies.previousButton.addEventListener("click", () => {
				openSlide(caseStudies.previousSlideIndex);
			});

			function openSlide(newIndex) {
				var oldIndex = caseStudies.currentSlideIndex;

				// set new slide to active
				caseStudies.currentSlideIndex = newIndex;
				caseStudies.slides[oldIndex].isActive = false;
				caseStudies.slides[newIndex].isActive = true;

				//update cS indexes
				updateIndexes();

				// console.log(caseStudies.currentSlideIndex);

				const tl_slide = gsap.timeline();
				const gsap_component = gsap.utils.selector(caseStudies.component);
				const gsap_slide = gsap.utils.selector(
					caseStudies.slides[caseStudies.currentSlideIndex].slide
				);
				tl_slide.to(
					gsap_component(
						".case-study_img-wrap, .case-study_body, .testimonial_caption"
					),
					{
						opacity: 0,
						duration: 0.35,
					}
				);
				tl_slide.to(
					gsap_slide(
						".case-study_img-wrap, .case-study_body, .testimonial_caption"
					),
					{
						opacity: 1,
						duration: 0.35,
					}
				);

				updateProgress();
			}
		};

		distinct.anim.accordion = function () {
			if (!document.querySelector(".accordion_list")) return;

			let accordions = gsap.utils.toArray(".accordion_list");

			console.log(accordions);

			accordions.forEach((accordion) => {
				let panels = gsap.utils.toArray(".accordion-panel", accordion);
				let headers = gsap.utils.toArray(".accordion_header", accordion);
				let animations = panels.map(createAnimation); //create an animation function for every panel

				// Open the first panel by default
				if (headers.length > 0) {
					playAnim(headers[0]);
				}

				// add click listener
				headers.forEach((header) => {
					header.addEventListener("click", () => playAnim(header));
				});

				// add hover listener
				panels.forEach((panel) => {
					if ("ontouchstart" in document.documentElement) {
						/* mobile device, don't do hover */
					} else {
						panel.addEventListener("mouseenter", () => handlePanelHover(panel));
						panel.addEventListener("mouseleave", () => handlePanelHover(panel));
					}
				});

				function playAnim(selectedHeader) {
					animations.forEach((animation) => animation(selectedHeader));
				}

				function createAnimation(element) {
					let header = element.querySelector(".accordion_header");
					let body = element.querySelector(".accordion_body-wrap");
					let icon = element.querySelector(".accordion_icon");
					let iconInner = element.querySelector(".accordion_icon-inner");

					gsap.set(body, { height: "auto" });
					gsap.set(icon, { opacity: 1 });
					gsap.set(iconInner, {
						rotationZ: 45,
						transformOrigin: "50% 50%",
					});

					let animation = gsap
						.timeline()
						.from(body, {
							height: 0,
							duration: 0.35,
						})
						.from(icon, { duration: 0.2, opacity: 0.4 }, 0)
						.from(iconInner, { duration: 0.2, rotationZ: 0 }, 0)
						.reverse();

					return function (selected) {
						if (selected === header) {
							animation.reversed(!animation.reversed());
						} else {
							animation.reverse();
						}
					};
				}

				function handlePanelHover(panel) {
					let header = panel.querySelector(".accordion_header");
					let icon = panel.querySelector(".accordion_icon");

					if (!isPanelOpen(panel)) {
						// Change opacity only if the panel is not open
						gsap.to(icon, {
							opacity: panel.classList.contains("hovered") ? 1 : 0.4,
							duration: 0.2,
						});
					}
				}

				function isPanelOpen(panel) {
					// Check if the panel is currently opened (playing the animation)
					// You may need to adjust this depending on how the animation is controlled
					// For simplicity, you can use a class to check if the panel is open
					return panel.classList.contains("open");
				}
			});
		};

		// add parallax effect to hero images
		distinct.anim.parallax = function () {
			if (!document.querySelector(".parallax")) return;

			gsap.utils
				.toArray(document.querySelectorAll(".parallax"))
				.forEach((parallax) => {
					const depth = 0.125;
					const movement = -(parallax.offsetHeight * depth);

					const tl = gsap.timeline();

					// tl.set(parallax, {
					// 	y: -movement,
					// 	scale: 1.25,
					// });

					tl.fromTo(
						parallax,
						{
							y: -movement,
							// opacity: 1,
						},
						{
							y: movement,
							// opacity: 1,
							ease: "none",
							scrollTrigger: {
								trigger: parallax,
								scrub: true,
								markers: false,
							},
						}
					);

					tl.from(parallax, { autoAlpha: 0 }, 0.5);
				});
		};

		// Change dates to 'pretty' text
		distinct.anim.updateDates = function () {
			if (!document.querySelector(".date")) return;

			// Get all elements with class .resource-card_date that haven't been processed yet
			const dateElements = document.querySelectorAll(
				".date:not([data-processed])"
			);

			// Get the current date
			const currentDate = new Date();

			// Loop through each date element
			dateElements.forEach((dateElement) => {
				// Get the date string from the element
				const dateString = dateElement.textContent.trim();

				// Parse the date string into a Date object
				const postDate = new Date(dateString);

				// Calculate the difference between the current date and the post date
				const timeDiff = currentDate.getTime() - postDate.getTime();

				// Calculate the time difference in days, weeks, months, and years
				const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				const weeksDiff = Math.floor(daysDiff / 7);
				const monthsDiff = Math.floor(daysDiff / 30);
				const yearsDiff = Math.floor(daysDiff / 365);

				// Determine the appropriate string to display based on the time difference
				let displayString;
				if (timeDiff >= 0) {
					if (daysDiff === 0) {
						displayString = "Today";
					} else if (yearsDiff > 0) {
						displayString = `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
					} else if (monthsDiff > 0) {
						displayString = `${monthsDiff} month${
							monthsDiff > 1 ? "s" : ""
						} ago`;
					} else if (weeksDiff > 0) {
						displayString = `${weeksDiff} week${weeksDiff > 1 ? "s" : ""} ago`;
					} else {
						displayString = `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
					}
				} else {
					displayString = ""; // If the date is in the future, set string to empty
				}

				// Update the text content of the date element
				dateElement.textContent = displayString;

				// Mark the date element as processed
				dateElement.setAttribute("data-processed", "true");
			});
		};
		distinct.anim.updateDates_watch = function () {
			if (document.getElementById("post-list")) {
				// Create a new instance of MutationObserver
				const observer = new MutationObserver(distinct.anim.updateDates);

				// Configuration of the observer:
				const config = { childList: true, subtree: true };

				// Start observing the target node for configured mutations

				observer.observe(document.getElementById("post-list"), config);
			}
		};

		// Show nav images on hover
		distinct.anim.navImages = function () {
			// Get all subnav elements
			const subnavs = document.querySelectorAll(".subnav");

			// Loop through each subnav
			subnavs.forEach((subnav) => {
				// Get subnav links and images within the current subnav
				const subnavLinks = subnav.querySelectorAll(".subnav_link");
				const subnavImages = subnav.querySelectorAll(".subnav_img");

				// Hide all images except the first one
				gsap.set(subnavImages, { opacity: 0, display: "none" });
				gsap.set(subnavImages[0], { opacity: 1, display: "block" });

				// Add event listeners to each subnav link
				subnavLinks.forEach((link, index) => {
					link.addEventListener("mouseenter", () => {
						// Hide all images
						gsap.to(subnavImages, {
							opacity: 0,
							display: "none",
							duration: 0.3,
						});
						// Show the corresponding image
						if (subnavImages[index]) {
							gsap.to(subnavImages[index], {
								opacity: 1,
								display: "block",
								duration: 0.3,
							});
						}
					});
				});
			});
		};

		// change header bg colour on page scroll
		distinct.anim.headerBg = function () {
			// Select the elements
			const header = document.querySelector(".header");

			// Get the height of the header element
			const headerHeight = header.offsetHeight;

			// Function to handle scroll event
			function handleScroll() {
				// Check if the page has been scrolled by the height of the header

				if (window.scrollY >= headerHeight) {
					// Add 'is-scrolled' class to header
					header.classList.add("is-scrolled");
				} else {
					// Remove 'is-scrolled' class from header
					header.classList.remove("is-scrolled");
				}
			}

			// Listen for scroll event
			window.addEventListener("scroll", handleScroll);

			// check on window resize
			window.addEventListener("resize", function (event) {
				handleScroll();
			});
		};

		// open / close nav dropdowns on hover - DISABLED
		distinct.anim.navlinkhover = function () {
			let mm = gsap.matchMedia();

			// add a media query. When it matches, the associated function will run
			mm.add("(min-width: 768px)", () => {
				const navLinks = document.querySelectorAll(".nav-link.is-trigger");
				const navDropdowns = document.querySelectorAll(".nav_dropdown");
				gsap.set(".nav_dropdown", { opacity: 0, height: 0 });

				// Function to animate dropdown when hovering over nav-link
				function showDropdown(index) {
					// console.log(index);
					const dropdown = navDropdowns[index];
					const tl_show = gsap.timeline();
					gsap.set(dropdown, { opacity: 1 });
					tl_show.to(dropdown, { height: "auto", duration: 0.5 });
					tl_show.to(dropdown, { opacity: 1, duration: 0.25 }, "<+=0.2");
				}

				// Function to close dropdown when hovering away from nav-link
				function hideDropdown(index) {
					const dropdown = navDropdowns[index];
					const tl_close = gsap.timeline();
					tl_close.to(dropdown, { height: 0, duration: 0.5 });
					tl_close.to(dropdown, { opacity: 0, duration: 0.25 }, "<+=0.2");
				}

				// Loop through each nav-link and add event listeners
				navLinks.forEach((navLink, index) => {
					navLink.addEventListener("mouseenter", function () {
						showDropdown(index);
					});
					navLink.addEventListener("mouseleave", function () {
						hideDropdown(index);
					});
				});
			});
		};

		// open / close nav on mobile - DISABLED
		distinct.anim.openCloseNav = function () {
			let mm = gsap.matchMedia();
			const header = document.querySelector(".header");
			const menuToggle = header.querySelector("#nav-button");
			const navMenu = header.querySelector("#nav-menu");
			const scrollWrap = document.querySelector("#smooth-wrapper");
			const headerBg = header.querySelector(".header_bg");
			const navLinks = header.querySelectorAll(".nav-link");
			const logoLink = header.querySelector(".logo_link");
			var tl_nav;

			function toggleMenu() {
				navMenu.classList.toggle("is-open");

				if (navMenu.classList.contains("is-open")) {
					scrollWrap.style.overflow = "hidden";
					lenis.stop(); /* this is what actually stops scrolling when lenis is enabled */
					tl_nav.play(); /* open menu animation */
				} else {
					scrollWrap.style.overflow = "";
					lenis.start();
					tl_nav.reverse();
				}
			}

			// Create nav animation timeline
			function navTimeline() {
				const tl_nav = gsap.timeline({ paused: true });
				tl_nav.to(header, { height: "80vh", duration: 0.5 }, 0);
				tl_nav.to(headerBg, { backgroundColor: "white", duration: 0.5 }, 0);
				tl_nav.to(logoLink, { color: "black", duration: 0.5 }, 0);
				tl_nav.from(navMenu, { autoAlpha: 0, y: -20 }, 0);
				// tl_nav.from(
				// 	navLinks,
				// 	{ autoAlpha: 0, x: -20, duration: 0.25, stagger: 0.1 },
				// 	0
				// );
				return tl_nav;
			}

			function resetNav() {
				// console.log("reset nav");
				scrollWrap.style.overflow = "";
				lenis.start();
				navMenu.classList.remove("is-open");
				if (tl_nav) {
					tl_nav.revert();
				}
			}

			menuToggle.addEventListener("click", toggleMenu);
			// run on small screens
			mm.add("(max-width: 767px)", () => {
				tl_nav = navTimeline();
				menuToggle.addEventListener("click", toggleMenu);

				return () => {
					// clean up on large screens
					resetNav();
				};
			});

			// check on window resize
			window.addEventListener("resize", function (event) {
				if (window.innerWidth > 767) {
					resetNav();
				}
			});
		};

		distinct.anim.splitSliders = function () {
			if (!document.querySelector(".split-slider_list")) return;

			const sliders = gsap.utils.toArray(".split-slider_list");
			sliders.forEach((slider, index) => {
				const slides = gsap.utils.toArray(
					".split-slider_item",
					slider
				); /* return descendent elements */

				let currentSlide = slides[0];

				/* make split-slider appropriate height for scrolling */
				const slider_height = slides.length * 100 + "vh";
				gsap.set(slider, { height: slider_height });

				/* for each slide */
				slides.forEach((slide, index) => {
					// 	/* get internal content */
					const img = slide.querySelector(".split-slider_img-wrap");
					const text = slide.querySelector(".split-slider_footer");
					// 	/* for all but first slide, hide content */
					if (index > 0) {
						gsap.set(slide, { opacity: 0 });
					}
					gsap.to(slide, {
						/* create scroll trigger for each slide */
						scrollTrigger: {
							trigger: slide,
							// start: () => (index - 0.5) * innerHeight,
							start: "top top",
							end: "+=500",
							// end: () => innerHeight,
							pin: true,
							pinSpacing: false, // Keeps pinned element at the top of the viewport
							// endTrigger: '.split-slider_item:last-child',
							// end: "bottom 150px",
							scrub: true, // Smoothly animate the pinning
							//markers: true,
							onToggle: (self) => self.isActive && setSlide(slide),
						},
						opacity: 1,
					});
				});

				function setSlide(newSlide) {
					if (newSlide !== currentSlide) {
						gsap.to(currentSlide, { autoAlpha: 0 });
						gsap.to(newSlide, { autoAlpha: 1 });
						currentSlide = newSlide;
					}
				}
			});
		};

		distinct.anim.whyDistinct = function () {
			if (!document.querySelector("[tr-scroll-toggle='component']")) return;

			$("[tr-scroll-toggle='component']").each(function (index) {
				// get elements
				let component = $(this);
				let lists = component.find("[tr-scroll-toggle='list']");
				// set item total
				let itemTotal = lists.first().children().length;
				component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
				// create trigger divs & spacer
				let firstTrigger = component
					.find("[tr-scroll-toggle='trigger']")
					.first();
				for (let i = 1; i < itemTotal; i++) {
					firstTrigger.clone().appendTo(component);
				}
				let triggers = component.find("[tr-scroll-toggle='trigger']");
				firstTrigger.css("margin-top", "-100vh");
				let trSpacer = $(
					"<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
				)
					.hide()
					.appendTo(component);
				// check for min width
				let minWidth = 0;
				let trMinWidth = component.attr("tr-min-width");
				if (trMinWidth !== undefined && trMinWidth !== false) {
					minWidth = +trMinWidth;
				}
				// main breakpoint
				gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
					// show spacer
					trSpacer.show();
					// switch which item is active
					function makeItemActive(activeIndex) {
						component
							.find("[tr-scroll-toggle='transform-y']")
							.css("transform", `translateY(${activeIndex * -100}%)`);
						component
							.find("[tr-scroll-toggle='transform-x']")
							.css("transform", `translateX(${activeIndex * -100}%)`);
						component
							.find("[tr-scroll-toggle='number-current']")
							.text(activeIndex + 1);
						lists.each(function (index) {
							$(this).children().removeClass("is-active");
							$(this).children().eq(activeIndex).addClass("is-active");
						});
					}
					makeItemActive(0);
					// scroll to trigger div on click of anchor
					let anchorLinks = component.find("[tr-anchors]").children();
					anchorLinks.on("click", function () {
						let myIndex = $(this).index();
						let scrollDistance =
							triggers.eq(myIndex).offset().top +
							triggers.eq(myIndex).height() -
							1;
						$("html, body").animate({ scrollTop: scrollDistance });
					});
					// triggers timeline
					triggers.each(function (index) {
						let triggerIndex = index;
						let tl = gsap.timeline({
							scrollTrigger: {
								trigger: $(this),
								start: "top top",
								end: "bottom top",
								scrub: true,
								onToggle: ({ self, isActive }) => {
									if (isActive) {
										makeItemActive(triggerIndex);
									}
								},
							},
							defaults: {
								ease: "none",
							},
						});
						lists.each(function () {
							let childItem = $(this).children().eq(triggerIndex);
							tl.to(
								childItem.find("[tr-item-animation='scale-to-1']"),
								{ scale: 1 },
								0
							);
							tl.from(
								childItem.find("[tr-item-animation='scale-from-1']"),
								{ scale: 1 },
								0
							);
							tl.to(
								childItem.find("[tr-item-animation='progress-horizontal']"),
								{ width: "100%" },
								0
							);
							tl.to(
								childItem.find("[tr-item-animation='progress-vertical']"),
								{ height: "100%" },
								0
							);
							tl.to(
								childItem.find("[tr-item-animation='rotate-to-0']"),
								{ rotation: 0 },
								0
							);
							tl.from(
								childItem.find("[tr-item-animation='rotate-from-0']"),
								{ rotation: 0 },
								0
							);
						});
					});
					// component timeline
					let tl = gsap.timeline({
						scrollTrigger: {
							trigger: component,
							start: "top top",
							end: "bottom bottom",
							scrub: true,
						},
						defaults: {
							ease: "none",
						},
					});
					tl.to(
						component.find("[tr-section-animation='scale-to-1']"),
						{ scale: 1 },
						0
					);
					tl.from(
						component.find("[tr-section-animation='scale-from-1']"),
						{ scale: 1 },
						0
					);
					tl.to(
						component.find("[tr-section-animation='progress-horizontal']"),
						{ width: "100%" },
						0
					);
					tl.to(
						component.find("[tr-section-animation='progress-vertical']"),
						{ height: "100%" },
						0
					);
					tl.to(
						component.find("[tr-section-animation='rotate-to-0']"),
						{ rotation: 0 },
						0
					);
					tl.from(
						component.find("[tr-section-animation='rotate-from-0']"),
						{ rotation: 0 },
						0
					);
					// optional scroll snapping
					if (component.attr("tr-scroll-snap") === "true") {
						let tl2 = gsap.timeline({
							scrollTrigger: {
								trigger: component,
								start: "top top",
								end: "bottom bottom",
								snap: {
									snapTo: "labelsDirectional",
									duration: { min: 0.01, max: 0.2 },
									delay: 0.0001,
									ease: "power1.out",
								},
							},
						});
						triggers.each(function (index) {
							tl2.to($(this), { scale: 1, duration: 1 });
							tl2.addLabel("trigger" + index);
						});
					}
					// smaller screen sizes
					return () => {
						trSpacer.hide();
						component
							.find("[tr-scroll-toggle='transform-y']")
							.css("transform", "translateY(0%)");
						component
							.find("[tr-scroll-toggle='transform-x']")
							.css("transform", "translateX(0%)");
						lists.each(function (index) {
							$(this).children().removeClass("is-active");
						});
					};
				});
			});
		};
	}

	anim_set_up();

	window.scrollBy(0, 2);
	window.scrollBy(0, -2);

	try {
		distinct.anim.headerBg();
	} catch (error) {
		console.error("Error executing distinct.anim.headerBg():", error);
	}

	try {
		distinct.anim.updateDates();
	} catch (error) {
		console.error("Error executing distinct.anim.updateDates():", error);
	}

	try {
		distinct.anim.updateDates_watch();
	} catch (error) {
		console.error("Error executing distinct.anim.updateDates_watch():", error);
	}

	try {
		distinct.anim.splide_home_services();
	} catch (error) {
		console.error(
			"Error executing distinct.anim.splide_home_services():",
			error
		);
	}

	try {
		distinct.anim.splide_sustainability_approach();
	} catch (error) {
		console.error(
			"Error executing distinct.anim.splide_sustainability_approach():",
			error
		);
	}

	try {
		distinct.anim.splide_home_testimonials();
	} catch (error) {
		console.error(
			"Error executing distinct.anim.splide_home_testimonials():",
			error
		);
	}

	try {
		distinct.anim.splide_about_ethos();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_about_ethos():", error);
	}

	try {
		distinct.anim.splide_home_hero();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_home_hero():", error);
	}

	try {
		distinct.anim.splitText();
	} catch (error) {
		console.error("Error executing distinct.anim.splitText():", error);
	}

	try {
		distinct.anim.slideText_v2();
	} catch (error) {
		console.error("Error executing distinct.anim.slideText_v2:", error);
	}

	try {
		distinct.anim.brandScroll();
	} catch (error) {
		console.error("Error executing distinct.anim.brandScroll():", error);
	}

	try {
		distinct.anim.flexccordion();
	} catch (error) {
		console.error("Error executing distinct.anim.flexccordion():", error);
	}

	try {
		distinct.anim.featuresTab();
	} catch (error) {
		console.error("Error executing distinct.anim.featuresTab():", error);
	}

	try {
		distinct.anim.collabs();
	} catch (error) {
		console.error("Error executing distinct.anim.collabs():", error);
	}

	try {
		distinct.anim.accordion();
	} catch (error) {
		console.error("Error executing distinct.anim.accordion():", error);
	}

	try {
		distinct.anim.navImages();
	} catch (error) {
		console.error("Error executing distinct.anim.navImages():", error);
	}

	try {
		distinct.anim.parallax();
	} catch (error) {
		console.error("Error executing distinct.anim.parallax():", error);
	}

	try {
		distinct.anim.slider_caseStudies();
	} catch (error) {
		console.error("Error executing distinct.anim.slider_caseStudies():", error);
	}

	try {
		distinct.anim.splitSliders();
	} catch (error) {
		console.error("Error executing distinct.anim.splitSliders():", error);
	}

	try {
		distinct.anim.whyDistinct();
	} catch (error) {
		console.error("Error executing distinct.anim.whyDistinct():", error);
	}
}

// // wait until DOM is ready
// document.addEventListener("DOMContentLoaded", function (event) {
// 	// wait until window is loaded - all images, styles-sheets, fonts, links, and other media assets. You could also use addEventListener() instead
// 	window.onload = function () {
// 		headerBg();

// 		// Do date updating - Run once on page load
// 		updateDates();
// 		//and then set up a mutation observer if we are on a page with post-lists - only the Resource page
// 		if (document.getElementById("post-list")) {
// 			// Create a new instance of MutationObserver
// 			const observer = new MutationObserver(updateDates);

// 			// Configuration of the observer:
// 			const config = { childList: true, subtree: true };

// 			// Start observing the target node for configured mutations
// 			observer.observe(document.getElementById("post-list"), config);
// 		}

// 		// OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
// 		window.requestAnimationFrame(function () {
// 			// GSAP custom code goes here
// 			splitText();
// 			try {
// 				brandScroll();
// 			} catch (err) {
// 				console.log("no brand scroll");
// 			}
// 			flexccordion();
// 			featuresTab();
// 			collabs();
// 			accordion();
// 			navImages();
// 			parallax();
// 			try {
// 				slider_caseStudies();
// 			} catch (err) {
// 				console.log("no case studies slider");
// 			}

// 			const sliders = gsap.utils.toArray(".split-slider_list");
// 			sliders.forEach((slider, index) => {
// 				const slides = gsap.utils.toArray(
// 					".split-slider_item",
// 					slider
// 				); /* return descendent elements */

// 				let currentSlide = slides[0];

// 				/* make split-slider appropriate height for scrolling */
// 				const slider_height = slides.length * 100 + "vh";
// 				gsap.set(slider, { height: slider_height });

// 				/* for each slide */
// 				slides.forEach((slide, index) => {
// 					// 	/* get internal content */
// 					const img = slide.querySelector(".split-slider_img-wrap");
// 					const text = slide.querySelector(".split-slider_footer");
// 					// 	/* for all but first slide, hide content */
// 					if (index > 0) {
// 						gsap.set(slide, { opacity: 0 });
// 					}
// 					gsap.to(slide, {
// 						/* create scroll trigger for each slide */
// 						scrollTrigger: {
// 							trigger: slide,
// 							// start: () => (index - 0.5) * innerHeight,
// 							start: "top top",
// 							end: "+=500",
// 							// end: () => innerHeight,
// 							pin: true,
// 							pinSpacing: false, // Keeps pinned element at the top of the viewport
// 							// endTrigger: '.split-slider_item:last-child',
// 							// end: "bottom 150px",
// 							scrub: true, // Smoothly animate the pinning
// 							//markers: true,
// 							onToggle: (self) => self.isActive && setSlide(slide),
// 						},
// 						opacity: 1,
// 					});
// 				});

// 				function setSlide(newSlide) {
// 					if (newSlide !== currentSlide) {
// 						gsap.to(currentSlide, { autoAlpha: 0 });
// 						gsap.to(newSlide, { autoAlpha: 1 });
// 						currentSlide = newSlide;
// 					}
// 				}
// 			});
// 		});
// 	};
// });
