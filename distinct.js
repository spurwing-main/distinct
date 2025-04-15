// Create a global object to store component data
/* */
const distinct = {};
distinct.anim = {};
distinct.helpers = {};
distinct.splides = {};

function distinct_anim() {
	// create all the anim functions
	function anim_set_up() {
		/* */
		/* SET UP */

		/* GSAP */
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(SplitText);

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
		distinct.anim.splide_home_services = function (myClass = ".splide.is-home-services") {
			if (!document.querySelector(myClass)) return; // if class exists on page, run this code

			let splides = document.querySelectorAll(myClass);
			distinct.splides.home_services = [];
			for (let i = 0; i < splides.length; i++) {
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
						autoStart: true,
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: false,
						speed: 1,
					},
				};

				let splide = new Splide(splides[i], splideOptions); // create splide instance with these options

				splide.on("mounted", function () {
					Webflow.require("ix2").init(); // relaunch WF interactions for card anims
				});

				splide.mount(window.splide.Extensions); // add splide to page along with extensions

				distinct.splides.home_services.push(splide); // add this splide to distinct obj so we can access it in devtools

				// pause slider when out of view, and on mob
				// let mm = gsap.matchMedia();
				// mm.add("(min-width: 768px)", () => {
				// 	/* gsap scroll trigger to pause when out of viewport */
				ScrollTrigger.create({
					trigger: ".s-home-services",
					start: "top bottom",
					end: "bottom top",
					onEnter: () => splide.Components.AutoScroll.play(),
					onLeave: () => splide.Components.AutoScroll.pause(),
					onEnterBack: () => splide.Components.AutoScroll.play(),
					onLeaveBack: () => splide.Components.AutoScroll.pause(),
				});

				// 	return () => {
				// 		// custom cleanup code here (runs when it STOPS matching)
				// 		splide.Components.AutoScroll.pause();
				// 	};
				// });
				// mm.add("(max-width: 767px)", () => {
				// 	splide.Components.AutoScroll.pause();
				// });

				/* add progress bar */
				distinct.helpers.splide_progress(splide);
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
		distinct.anim.splide_home_testimonials = function (myClass = ".splide.is-home-testimonials") {
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

		/* collabs - swiper */
		distinct.anim.swiper_logo_slider = function (
			mySelector = ".swiper[data-swiper-name='logo-slider']"
		) {
			// Get all swiper containers
			const swiperContainers = document.querySelectorAll(mySelector);

			swiperContainers.forEach((container) => {
				// Get the swiper-wrapper within the current container
				const swiperWrapper = container.querySelector(".swiper-wrapper");

				// Get all swiper-slide elements within the current container
				const swiperSlides = container.querySelectorAll(".swiper-slide");

				// Clone each swiper-slide element 4 times and append to the swiper-wrapper
				for (let i = 0; i < 4; i++) {
					swiperSlides.forEach((slide) => {
						const clone = slide.cloneNode(true);
						swiperWrapper.appendChild(clone);
					});
				}

				// Get swiper speed from data attribute or use default value
				let swiperSpeed = container.getAttribute("data-swiper-speed");
				swiperSpeed = swiperSpeed !== null ? Number(swiperSpeed) : 15000;

				// Initialize Swiper for the current container
				new Swiper(container, {
					loop: true,
					slidesPerView: "auto",
					speed: swiperSpeed,
					grabCursor: true,
					loopAdditionalSlides: 1,
					autoplay: {
						delay: 0.5,
						disableOnInteraction: false,
					},
					freeMode: {
						enabled: true,
					},
				});
			});
		};

		/* collabs - splide */
		distinct.anim.splide_logo_slider = function (myClass = ".splide.logo-slider_row") {
			if (!document.querySelector(myClass)) return; // if class exists on page, run this code

			let splides = document.querySelectorAll(myClass);
			distinct.splides.collabs = [];
			for (let i = 0; i < splides.length; i++) {
				/* set speed of each slider, based on its width, an 'default width' and speed from testing, and a weighting factor so we can have the sliders going different speeds.
				 */

				let defaultSpeed = 2.5;
				let splideSpeedWeighting = splides[i].getAttribute("data-splide-speed-weighting");
				let splideWidth = splides[i].offsetWidth;
				let splideSpeed = defaultSpeed * splideSpeedWeighting * (splideWidth / 3600);

				let splideOptions = {
					perMove: 1,
					autoWidth: true,
					gap: "0rem",
					focus: 0,
					arrows: false,
					pagination: false,
					speed: 600,
					dragAngleThreshold: 60,
					rewindSpeed: 400,
					waitForTransition: false,
					updateOnMove: true,
					trimSpace: "move",
					type: "loop",
					drag: true,
					autoplay: false,
					pauseOnHover: false,
					interval: 10000,
					autoScroll: {
						autoStart: true,
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: false,
						speed: splideSpeed,
					},
				};

				let splide = new Splide(splides[i], splideOptions); // create splide instance with these options

				splide.on("mounted", function () {
					Webflow.require("ix2").init(); // relaunch WF interactions for card anims
				});

				splide.mount(window.splide.Extensions); // add splide to page along with extensions

				distinct.splides.collabs.push(splide); // add this splide to distinct obj so we can access it in devtools

				// pause slider when out of view, and on mob
				// let mm = gsap.matchMedia();
				// mm.add("(min-width: 768px)", () => {
				// 	/* gsap scroll trigger to pause when out of viewport */
				// ScrollTrigger.create({
				// 	trigger: ".s-logo-slider",
				// 	start: "top bottom",
				// 	end: "bottom top",
				// 	onEnter: () => splide.Components.AutoScroll.play(),
				// 	onLeave: () => splide.Components.AutoScroll.pause(),
				// 	onEnterBack: () => splide.Components.AutoScroll.play(),
				// 	onLeaveBack: () => splide.Components.AutoScroll.pause(),
				// });

				// 	return () => {
				// 		// custom cleanup code here (runs when it STOPS matching)
				// 		splide.Components.AutoScroll.pause();
				// 	};
				// });
				// mm.add("(max-width: 767px)", () => {
				// 	splide.Components.AutoScroll.pause();
				// });

				/* add progress bar */
				// distinct.helpers.splide_progress(splide);
				// distinct.helpers.splide_hover_pause(splide); //pause on hover on track
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
					mediaQuery: "min" /* mobile first - so slider is destroyed for 768 and above */,
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
		distinct.anim.splide_home_hero = function (myClass = ".splide.is-home-hero") {
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
							if (video.paused && video.closest(".splide__slide").classList.contains("is-active")) {
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
						let targetSelector = gsap.utils.selector(target);

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

						tl_split
							.to(first_split.lines, {
								duration: 1,
								y: "0%",
								ease: "power2.out",
								stagger: 0.1,
							})
							.addLabel("slideDone", ">")
							.set(
								targetSelector(".split-line-outer"),
								{
									"overflow-y": "visible",
								},
								"slideDone"
							); // when anim done, get the ...-outer elements within this target and turn off the overflow, to avoid any clipping issues
					});
				}
				setupSplits_instant();

				function prepArrows(target) {
					var indentedAncestor = target.closest(".indent");
					if (indentedAncestor) {
						//if target is indented
						var arrow = indentedAncestor.querySelector(".indent_arrow"); // arrow to move
						var outerLine = target.querySelector(".split-line-outer:first-of-type "); // line to move arrow to
						var innerLine = outerLine.querySelector(".split-line-inner:first-of-type ");
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
				[".flexccordion_item:not(:nth-child(1)) :is(.flexccordion-bar, .flexccordion-bar_short)"],
				{
					height: 0,
				}
			);

			// Click event listener for flexccordion headers
			document.querySelectorAll(".flexccordion_item-header").forEach((header, index) => {
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
						gsap_flexccordion([".flexccordion-bar", ".flexccordion-bar_short"]),
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
			tl.set(".features_item:nth-child(1) :is(.feature_body, .feature_img, .feature-title)", {
				opacity: 1,
			});

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
					row.state = Flip.getState(row.logos, row.element);
					row.startingHeight = gsap.getProperty(row.element, "height");
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
				nextButton: document.querySelector(".splide__arrow--next#case-study-next"),
				previousButton: document.querySelector(".splide__arrow--prev#case-study-prev"),
				loop: true,
				progressElement: document.querySelector(".slider-progress_bar#case-study"),
			};

			(function getSlides() {
				const slideElements = caseStudies.component.querySelectorAll(".case-study"); // get all slides

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
				const percent = (caseStudies.currentSlideIndex / (caseStudies.slides.length - 1)) * 100;
				if (caseStudies.progressElement) {
					gsap.to(caseStudies.progressElement, {
						width: `${percent}%`,
						duration: 0.5,
					});
				}
			}

			// get next and previous slides
			function getPreviousAndNextIndexes(totalSlides, currentIndex, shouldLoop) {
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

				const tl_slide = gsap.timeline();
				const gsap_component = gsap.utils.selector(caseStudies.component);
				const gsap_slide = gsap.utils.selector(
					caseStudies.slides[caseStudies.currentSlideIndex].slide
				);
				tl_slide.to(
					gsap_component(".case-study_img-wrap, .case-study_body, .testimonial_caption"),
					{
						opacity: 0,
						duration: 0.35,
					}
				);
				tl_slide.to(gsap_slide(".case-study_img-wrap, .case-study_body, .testimonial_caption"), {
					opacity: 1,
					duration: 0.35,
				});

				updateProgress();
			}
		};

		distinct.anim.accordion = function () {
			if (!document.querySelector(".accordion_list")) return;

			let accordions = gsap.utils.toArray(".accordion_list");

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

			gsap.utils.toArray(document.querySelectorAll(".parallax")).forEach((parallax) => {
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
			const dateElements = document.querySelectorAll(".date:not([data-processed])");

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
						displayString = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
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

			subnavs.forEach((subnav) => {
				// Get subnav links and images within the current subnav
				const subnavLinks = subnav.querySelectorAll(".link-subgroup_item");
				const subnavImages = subnav.querySelectorAll(".subnav_img");
				let activeIndex = 0;
				let transitionTimeout = null; // For debouncing rapid events

				if (subnavImages.length === 0) return;

				// Initialize: Hide all images and show the default (first) image
				gsap.set(subnavImages, { autoAlpha: 0 });
				gsap.set(subnavImages[0], { autoAlpha: 1 });

				const showImage = (index) => {
					console.log("showImage", index);
					// Clear any pending transition to debounce rapid events
					if (transitionTimeout) clearTimeout(transitionTimeout);

					// Debounce the transition
					transitionTimeout = setTimeout(() => {
						if (activeIndex !== index) {
							const tl = gsap.timeline();
							let oldImage = subnavImages[activeIndex];
							let newImage = subnavImages[index];

							// Fade in the new image and fade out the old one with a slight offset
							tl.to(
								newImage,
								{
									autoAlpha: 1,
									duration: 0.7,
									ease: "power1.out",
									overwrite: "auto",
								},
								0
							);
							tl.to(
								oldImage,
								{
									autoAlpha: 0,
									duration: 0.6,
									ease: "power1.out",
									overwrite: "auto",
								},
								0.1
							);

							// Update data attributes and active index
							newImage.setAttribute("data-active", "true");
							oldImage.setAttribute("data-active", "false");
							activeIndex = index;
						} else {
							// In case the same index is re-triggered
							gsap.to(subnavImages[index], {
								autoAlpha: 1,
								duration: 0.3,
								overwrite: "auto",
							});
							subnavImages[index].setAttribute("data-active", "true");
						}
						transitionTimeout = null;
					}, 50); // 50ms debounce delay; adjust if needed
				};

				// Add event listeners for mouseenter events
				subnavLinks.forEach((link, index) => {
					link.addEventListener("mouseenter", () => showImage(index));
				});

				// Optionally, reset to the default image when the mouse leaves the subnav area
				subnav.addEventListener("mouseleave", () => showImage(0));
			});
		};

		// change header bg colour on page scroll
		distinct.anim.headerBg = function () {
			// Select the elements
			const header = document.querySelector(".header");
			if (!header) {
				console.warn("header not found.");
				return;
			}

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
				let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
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
						component.find("[tr-scroll-toggle='number-current']").text(activeIndex + 1);
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
							triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
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
							tl.to(childItem.find("[tr-item-animation='scale-to-1']"), { scale: 1 }, 0);
							tl.from(childItem.find("[tr-item-animation='scale-from-1']"), { scale: 1 }, 0);
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
							tl.to(childItem.find("[tr-item-animation='rotate-to-0']"), { rotation: 0 }, 0);
							tl.from(childItem.find("[tr-item-animation='rotate-from-0']"), { rotation: 0 }, 0);
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
					tl.to(component.find("[tr-section-animation='scale-to-1']"), { scale: 1 }, 0);
					tl.from(component.find("[tr-section-animation='scale-from-1']"), { scale: 1 }, 0);
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
					tl.to(component.find("[tr-section-animation='rotate-to-0']"), { rotation: 0 }, 0);
					tl.from(component.find("[tr-section-animation='rotate-from-0']"), { rotation: 0 }, 0);
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
						component.find("[tr-scroll-toggle='transform-y']").css("transform", "translateY(0%)");
						component.find("[tr-scroll-toggle='transform-x']").css("transform", "translateX(0%)");
						lists.each(function (index) {
							$(this).children().removeClass("is-active");
						});
					};
				});
			});
		};

		distinct.anim.brandScroll_v2 = function () {
			/* when brand scroll section not in viewport, stop scrolling */

			// Define your animation with GSAP
			const brandsAnimation = gsap.to(".brands_list", {
				y: "-100%", // Equivalent to translateY(-100%)
				ease: "none",
				duration: 10,
				paused: true, // Start paused so you can control playback with ScrollTrigger
				repeat: -1, // Infinite loop
			});

			// Create a ScrollTrigger instance for the .brands_list
			ScrollTrigger.create({
				trigger: ".home-brands",
				start: "top bottom", // Start the trigger when the top of '.brands_list' enters the bottom of the viewport
				end: "bottom top", // End the trigger when the bottom of '.brands_list' exits the top of the viewport
				onEnter: () => brandsAnimation.play(), // Play animation when entering the viewport
				onLeave: () => brandsAnimation.pause(), // Pause animation when leaving the viewport
				onEnterBack: () => brandsAnimation.play(), // Also play animation when entering the viewport from the bottom
				onLeaveBack: () => brandsAnimation.pause(), // Also pause animation when leaving the viewport to the bottom
			});
		};

		distinct.anim.nav = function () {
			const navLinks = document.querySelectorAll(".nav-link[distinct-nav-id]");
			const navDrawer = document.querySelector(".nav-drawer");
			const navContents = document.querySelectorAll(".nav-drawer_item");
			const nav = document.querySelector(".header_top");
			const header = document.querySelector(".header");
			const navTrigger = document.querySelector(".nav_button");
			let activeContent = null;
			let activeChevron = null;
			let isHovered = false;
			let isOpen = false;
			let nav_h = 0;
			let mm = gsap.matchMedia();
			const lottieURL =
				"https://cdn.prod.website-files.com/65b11cc99c263ddcf414574b/65f2dab23428c5bcb22ec9a2_distinct-nav.json";
			const lottieAnimation = lottie.loadAnimation({
				container: document.querySelector(".nav-button-lottie"),
				renderer: "svg",
				loop: false,
				autoplay: false,
				path: lottieURL,
			});
			let playhead = { frame: 0 };

			// Function to open the drawer and update content
			function openDrawer(targetContent) {
				if (activeContent !== targetContent) {
					let tl = gsap.timeline({
						paused: true,
						defaults: { ease: "power3.inOut" },
					});
					tl.to(
						navDrawer,
						{
							height: targetContent.scrollHeight + nav_h,
							autoAlpha: 1,
							// 		duration: 0.5,
							duration: 0.5,
							borderBottomRightRadius: "1.5rem",
							borderBottomLeftRadius: "1.5rem",
						},
						0
					);

					tl.to(activeContent, { autoAlpha: 0, duration: 0.5 }, 0);
					tl.to(targetContent, { autoAlpha: 1, duration: 0.5 }, 0);
					tl.play();

					activeContent = targetContent;
				}
			}

			function closeDrawer() {
				let tl = gsap.timeline({
					paused: true,
					defaults: { ease: "power3.inOut" },
				});
				tl.to(
					navDrawer,
					{
						height: nav_h,
						duration: 0.5,
						autoAlpha: 0,
						borderBottomRightRadius: 0,
						borderBottomLeftRadius: 0,
					},
					0
				);
				tl.to(navContents, { autoAlpha: 0 }, 0);
				tl.play();
				activeContent = null;
			}

			function expandItem(targetContent, targetChevron) {
				// if clicked on a different item, close current one and open new one
				if (activeContent !== targetContent) {
					let tl = gsap.timeline({
						paused: true,
						defaults: { ease: "power3.inOut" },
					});
					tl.to(
						targetContent,
						{
							height: targetContent.scrollHeight,
							autoAlpha: 1,
							duration: 0.5,
						},
						0
					);
					tl.to(targetChevron, { rotation: 180, duration: 0.35 }, 0);
					tl.to(activeContent, { autoAlpha: 0, duration: 0.5, height: 0 }, 0);
					tl.to(activeChevron, { rotation: 0, duration: 0.35 }, 0);

					tl.play();

					activeContent = targetContent;
					activeChevron = targetChevron;
				}
				// otherwise if we've clicked on the open item, close it
				else if (activeContent === targetContent) {
					let tl = gsap.timeline({
						paused: true,
						defaults: { ease: "power3.inOut" },
					});
					tl.to(
						targetContent,
						{
							height: 0,
							autoAlpha: 0,
							duration: 0.5,
						},
						0
					);
					tl.to(targetChevron, { rotation: 0, duration: 0.35 }, 0);

					tl.play();

					activeContent = null;
					activeChevron = null;
				}
			}

			function handleMouseEnter_link(event) {
				const link = event.currentTarget;
				const id = link.getAttribute("distinct-nav-id");
				if (!id) return;
				const targetContent = document.querySelector(`.nav-drawer_item[distinct-nav-id='${id}']`);
				if (!targetContent) return;
				openDrawer(targetContent);
				isHovered = true;
			}

			function handleMouseLeave_link() {
				isHovered = false;
				setTimeout(() => {
					if (!isHovered) {
						closeDrawer();
					}
				}, 100);
			}

			function handleClick_link(event) {
				const link = event.currentTarget;
				const id = link.getAttribute("distinct-nav-id");
				if (!id) return;
				const targetContent = document.querySelector(`.nav-drawer_item[distinct-nav-id='${id}']`);
				const targetChevron = link.querySelector(".nav-link_chevron");
				if (!targetContent) return;
				expandItem(targetContent, targetChevron);
			}

			function handleMouseEnter_content() {
				isHovered = true;
			}

			function handleMouseLeave_content() {
				isHovered = false;
				setTimeout(() => {
					if (!isHovered) {
						closeDrawer();
					}
				}, 100);
			}

			function handleTriggerClick() {
				let tl_open = gsap.timeline({
					paused: true,
					defaults: { ease: "power3.inOut" },
				});
				tl_open.to(header, { height: "100dvh", duration: 0.5 }, 0);
				tl_open.to(".nav_menu", { autoAlpha: 1, duration: 0.5 }, 0);
				tl_open.to(".nav_flex", { autoAlpha: 1, duration: 0.5 }, 0);
				// play lottie
				tl_open.to(
					playhead,
					{
						frame: 65,
						duration: 1.2,
						ease: "none",
						onUpdate: () => {
							lottieAnimation.goToAndStop(playhead.frame, true);
						},
					},
					0
				);

				let tl_close = gsap.timeline({
					paused: true,
					defaults: { ease: "power3.inOut" },
				});
				tl_close.to(header, { height: "4.5rem", duration: 0.5 }, 0);
				tl_close.to(".nav_menu", { autoAlpha: 0, duration: 0.5 }, 0);
				tl_close.to(".nav_flex", { autoAlpha: 0, duration: 0.5 }, 0);
				tl_close.to(
					playhead,
					{
						frame: lottieAnimation.totalFrames - 1,
						duration: 1.2,
						ease: "none",
						onUpdate: () => {
							lottieAnimation.goToAndStop(playhead.frame, true);
						},
					},
					0
				);

				if (isOpen) {
					tl_close.play();
					isOpen = false;
					header.classList.remove("is-open");
				} else {
					tl_open.play();
					isOpen = true;
					header.classList.add("is-open");
				}
			}

			// Run on desktop
			mm.add("(min-width: 768px)", () => {
				// Set initial states
				nav_h = nav.scrollHeight;
				gsap.set([navContents, navDrawer], { display: "block", autoAlpha: 0 });
				gsap.set([navDrawer], { height: nav_h });

				// Event listeners for nav links
				navLinks.forEach((link) => {
					link.addEventListener("mouseenter", handleMouseEnter_link);
					link.addEventListener("mouseleave", handleMouseLeave_link);
				});

				// Keep drawer open when hovering over it
				navContents.forEach((content) => {
					content.addEventListener("mouseenter", handleMouseEnter_content);
					content.addEventListener("mouseleave", handleMouseLeave_content);
				});

				return () => {
					// clean up desktop event listeners
					navLinks.forEach((link) => {
						link.removeEventListener("mouseenter", handleMouseEnter_link);
						link.removeEventListener("mouseleave", handleMouseLeave_link);
					});
					navContents.forEach((content) => {
						content.removeEventListener("mouseenter", handleMouseEnter_content);
						content.removeEventListener("mouseleave", handleMouseLeave_content);
					});

					// clear active content
					activeContent = null;
				};
			});

			// Run on mobile
			mm.add("(max-width: 767px)", () => {
				// set initial states for mob
				gsap.set(navContents, {
					display: "block",
					autoAlpha: 0,
					height: 0,
				});

				// Event listeners for nav links
				navLinks.forEach((link) => {
					link.addEventListener("click", handleClick_link);
				});

				// handle nav trigger click
				navTrigger.addEventListener("click", handleTriggerClick);

				return () => {
					// clean up mobile event listeners
					navLinks.forEach((link) => {
						link.removeEventListener("click", handleClick_link);
					});

					navTrigger.removeEventListener("click", handleTriggerClick);

					// ensure any hidden content is shown
					gsap.set([navContents, ".nav_menu", ".nav_flex"], {
						autoAlpha: 1,
					});

					// reset lottie
					lottieAnimation.goToAndStop(playhead.frame, false);

					header.classList.remove("is-open");
					isOpen = false;
				};
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
		console.error("Error executing distinct.anim.splide_home_services():", error);
	}

	try {
		distinct.anim.splide_sustainability_approach();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_sustainability_approach():", error);
	}

	try {
		distinct.anim.splide_home_testimonials();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_home_testimonials():", error);
	}

	try {
		distinct.anim.splide_about_ethos();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_about_ethos():", error);
	}

	try {
		distinct.anim.splide_logo_slider();
	} catch (error) {
		console.error("Error executing distinct.anim.splide_logo_slider():", error);
	}

	try {
		distinct.anim.swiper_logo_slider();
	} catch (error) {
		console.error("Error executing distinct.anim.swiper_logo_slider():", error);
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
		distinct.anim.brandScroll_v2();
	} catch (error) {
		console.error("Error executing distinct.anim.brandScroll_v2():", error);
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

	distinct.anim.nav();
}
