(function setUp() {
	/* GSAP */
	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollSmoother);
	gsap.registerPlugin(SplitText);
	gsap.registerPlugin(Draggable);
	gsap.registerPlugin(InertiaPlugin);

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

/* homepage testimonials */
function mount_splide_home_testimonials(myClass) {
	let splides = document.querySelectorAll(myClass);
	for (let i = 0; i < splides.length; i++) {
		let splide = new Splide(splides[i], {
			perMove: 1,
			gap: "1rem",
			focus: 0,
			speed: 600,
			dragAngleThreshold: 60,
			perPage: 1,
			rewindSpeed: 400,
			waitForTransition: false,
			updateOnMove: true,
			trimSpace: "move",
			type: "loop",
			drag: true,
			snap: true,
			autoplay: false,
			arrows: true,
		});

		splide_progress(splide); /* add progress bar */
		splide.on("mounted", function () {
			Webflow.require("ix2").init();
		});
		splide.mount();
	}
}
mount_splide_home_testimonials(".splide.is-home-testimonials");

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

function brandScroll() {
	const brands_loop = verticalLoop(".brands_list-item", {
		repeat: -1,
		paused: false,
		center: true,
		draggable: true, // I'm just being fancy
		inertia: true, // even fancier
		speed: 1,
	});

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
				config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
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
						(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i]) * 100 +
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
			brandScroll();
		});
	};
});
