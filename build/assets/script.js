const DEBUG = false;
// const DEBUG = true;
window.mobileAndTabletCheck = function () {
	let check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};
const SplitAnimation = (prod) => {
	let splitText = Splitting();
	if (!prod || splitText.length <= 0) {
		document.querySelector("#loading")?.remove?.();
		AOS?.init?.({ anchorPlacement: "top-bottom" });
		return;
	}
	splitText[0].words.forEach((e, idx) => {
		e.classList.add("overflow-hidden", "py-2", "hero-text");
	});
	splitText[0].chars.forEach((e, idx) => {
		e.dataset.aos = "fade-blur-up";
		e.dataset.aosEasing = "ease-out-back";
		e.style.transitionDelay = idx * 0.02 + "s";
	});
	splitText[1].lines.forEach((e, idx) => {
		e.forEach((ee, idx2) => {
			ee.dataset.aosAnchor = "#beranda";
			ee.dataset.aos = "fade-blur-up";
			ee.dataset.aosDelay = 500 + Math.floor(idx * 0.05 * 1000);
		});
	});
	splitText.slice(2).forEach((txt) => {
		txt.words.forEach((e, idx) => {
			e.dataset.aos = "fade-blur-up";
			e.dataset.aosEasing = "ease-out-back";
			e.style.transitionDelay = idx * 0.05 + "s";
		});
	});
	let frameTime = 0;
	splitText.forEach((e) => {
		frameTime += e.el.childElementCount;
	});
	frameTime *= 20;
	setTimeout(
		() => {
			document.querySelector("#loading")?.remove?.();
			AOS?.init?.({ anchorPlacement: "top-bottom" });
		},
		mobileAndTabletCheck() ? frameTime : frameTime / 2
	);
};
const AnimationFunction = () => {
	const sectionArray = document.querySelectorAll("[aria-label='content']");
	const sectionPosition = {};
	const offset = document.querySelector(".navbar").offsetHeight;
	sectionArray.forEach((section) => (sectionPosition[section.id] = section.offsetTop - offset));
	const updateNav = () => {
		let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
		for (id in sectionPosition) {
			if (sectionPosition[id] <= scrollPosition) {
				document.querySelectorAll("a[class*='-links'],a[class^='-links']").forEach((e) => {
					e.ariaSelected = false;
				});
				document.querySelectorAll(`a[class*='-links'][href='#${id}']`).forEach((e) => {
					e.ariaSelected = true;
				});
			}
		}
	};
	updateNav();
	window.onscroll = updateNav;
};
document.addEventListener("DOMContentLoaded", (e) => {
	new InfiniteMarquee({
		element: ".marquee-container",
		speed: 7500,
		smoothEdges: true,
		direction: "right",
		spaceBetween: "20px",
		duplicateCount: 5,
		on: {
			beforeInit: () => {
				console.log("Not Yet Initialized");
			},

			afterInit: () => {
				console.log("Initialized");
			},
		},
	});

	SplitAnimation(true);
	document.querySelectorAll(".splide").forEach((e) => {
		var splide = new Splide(e, {
			type: "loop",
			autoplay: true,
			resetProgress: false,
			drag: "free",
			snap: true,
			perPage: 1,
		});

		splide.mount();
	});
	if (window.scrollY > 0) {
		document.querySelector(".navbar").classList.add("py-4", "shadow-md");
	} else {
		document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
	}
	document.querySelector("#sidebar-nav").addEventListener("change", (e) => {
		if (e.target.checked) {
			document.querySelector(".navbar").classList.add("py-4", "shadow-md");
		} else {
			document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
		}
	});
	let addScrollEvent = (element) => {
		element.addEventListener("click", function (e) {
			e.preventDefault();
			window.location.replace(this.getAttribute("href"));
			const targetId = this.getAttribute("href").substring(1);
			const targetElement = document.getElementById(targetId);
			let offset = document.querySelector(".navbar").offsetHeight;
			// console.f(offset, (targetElement ?? document.body).offsetTop - offset);
			document.querySelector("#sidebar-nav").checked = false;
			window.scrollTo({
				top: (targetElement ?? document.body).offsetTop - offset,
				behavior: "smooth",
			});
		});
	};
	document.querySelectorAll("[aria-label='nav-link']").forEach((el) => {
		let li = document.createElement("li");
		let link = el.cloneNode(true);
		link.removeAttribute("class");
		link.classList.add("drawer-links");
		link.ariaLabe = "drawer-links";
		addScrollEvent(link);
		li.appendChild(link);
		document.querySelector(".drawer-side > ul").appendChild(li);
	});
	// Smooth scrolling for anchor links in navbar
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		addScrollEvent(anchor);
	});
	if (!window.localStorage.getItem("theme")) {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			window.localStorage.setItem("theme", "dark");
			document.documentElement.dataset.theme = "dark";
		} else {
			window.localStorage.setItem("theme", "lightdim");
			document.documentElement.dataset.theme = "lightdim";
		}
	}
	if (window.localStorage.getItem("theme") != "lightdim") {
		document.querySelector("[data-toggle-theme]").checked = true;
	}
	document.querySelector(`a[href="${window.location.hash}"`) && (document.querySelector(`a[href="${window.location.hash}"`).ariaSelected = true);
	AnimationFunction();
});

// Scroll up function
document.addEventListener("scroll", (e) => {
	if (window.scrollY > 0) {
		document.querySelector(".navbar").classList.add("py-4", "shadow-md");
	} else {
		document.querySelector(".navbar").classList.remove("py-4", "shadow-md");
	}
	if (window.scrollY > 200) {
		document.querySelector(".floating")?.classList?.remove?.("d-none");
	} else {
		document.querySelector(".floating")?.classList?.add?.("d-none");
	}
});

function closeSidebar() {
	document.querySelector("#sidebar-nav").checked = false;
}
