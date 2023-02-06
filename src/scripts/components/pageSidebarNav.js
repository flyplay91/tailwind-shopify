const dom = {};

const selectors = {
	sidenavToggle: "[data-sidenav-toggle]",
	sidenav: "[data-sidenav]",
};

const cacheDom = () => {
	dom.sidenavToggle = document.querySelector(selectors.sidenavToggle);
	dom.sidenav = document.querySelector(selectors.sidenav);
};

const toggleSidenav = () => {
	if (dom.sidenav.style.maxHeight) {
		dom.sidenav.style.maxHeight = null;
	} else {
		dom.sidenav.style.maxHeight = `${dom.sidenav.scrollHeight}px`;
	}
};

const bindEvents = () => {
	dom.sidenavToggle &&
		dom.sidenavToggle.addEventListener("click", () => {
			let icon = dom.sidenavToggle.querySelector("svg");
			icon.classList.toggle("rotate-180");
			toggleSidenav();
		});
};

const pageSidenav = {
	init() {
		cacheDom();
		bindEvents();
	},
};

export default pageSidenav;
