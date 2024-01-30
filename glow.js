document.querySelectorAll(".glow").forEach((glowUp) => {
	// const gradientElem = document.createElement("div");
	// gradientElem.classList.add("gradient");
	// button.appendChild(gradientElem);

	glowUp.addEventListener("pointermove", (e) => {
		const rect = glowUp.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		gsap.to(glowUp, {
			"--pointer-x": `${x}px`,
			"--pointer-y": `${y}px`,
		});

		gsap.to(glowUp, {
			"--button-glow": chroma
				.mix(
					getComputedStyle(glowUp)
						.getPropertyValue("--button-glow-start")
						.trim(),
					getComputedStyle(glowUp).getPropertyValue("--button-glow-end").trim(),
					x / rect.width
				)
				.hex(),
			duration: 0.2,
		});
	});
});
