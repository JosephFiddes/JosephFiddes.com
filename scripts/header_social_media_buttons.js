let isMobile = (window.innerWidth < window.innerHeight);
let toRemove;

if (isMobile) {
	toRemove = document.getElementsByClassName("desktop-only");
} else {
	toRemove = document.getElementsByClassName("mobile-only");
}

Array.from(toRemove).forEach(element => element.style.display = 'none');