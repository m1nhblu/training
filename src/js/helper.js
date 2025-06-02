export function setBackgroundElement () {
	$("[setBackground]").each(function () {
		var background = $(this).attr("setBackground");
		$(this).css({
			"background-image": "url(" + background + ")",
			"background-size": "cover",
			"background-position": "center center",
		});
	});
}
export function detectCloseElement (ele, ele2, funcRemove) {
	// close
	$(document).on("click", function (e) {
		console.log();
		if (!$(e.target).closest(ele).length && !$(e.target).hasClass(ele2)) {
			funcRemove();
		}
	});
	// esc
	$(document).keyup(function (e) {
		if (e.key === "Escape") {
			funcRemove();
		}
	});
	// overlay-blur
}
export function buttonToTop () {
	let windowHeight = $(window).height();
	$(document).on("scroll", function () {
		let scrollTop = $(window).scrollTop();
		let documentHeight = $(document).height();
		if (scrollTop + windowHeight > documentHeight - windowHeight) {
			$(".button-to-top").addClass("active");
		} else {
			$(".button-to-top").removeClass("active");
		}
	});
	$(document).on("click", ".button-to-top", function () {
		$("html, body").animate({ scrollTop: 0 });
	});
}

export function ToggleItem () {
	const nodeParent = $(".wrap-item-toggle");
	const nodeItem = nodeParent.find(".item-toggle");
	const nodeTitle = nodeItem.find(".title");
	nodeTitle.on("click", function () {
		$(this).toggleClass("active").next().slideToggle().closest(".item-toggle").siblings().find(".title").removeClass("active").next().slideUp();
	});
}

/**
 * parent, children, item, button, initItem
 * @param { parent, children, item, button, initItem} listNode
 */
export function funcExpandContent (listNode) {
	const { parent, children, item, button, initItem, gap = 0 } = listNode;
	if (!$(parent).length) return;
	let itemHeight = $(item).outerHeight();
	let gapCalculate = gap ? Number($(parent).find(children).css("column-gap").slice(0, -2)) * gap : 0;
	let initHeight = itemHeight * initItem + gapCalculate;
	let originalHeight = $(parent).find(children).outerHeight();
	if (originalHeight < initHeight) {
		$(button).remove();
	} else {
		$(parent).css("height", initHeight);
	}
	$(button).on("click", function () {
		if ($(this).hasClass("expand")) {
			$(parent).css("height", initHeight);
			$(this).find("span").text("Xem thêm");
		} else {
			$(parent).css("height", originalHeight);
			// setTimeout(() => {
			// 	$(parent).css("height", "auto");
			// }, 1000);
			$(this).find("span").text("Rút gọn");
		}
		$(this).toggleClass("expand");
	});
}

export function clickScrollToDiv (nodeEle, heightSpacing = () => { }) {
	$(nodeEle).on("click", function (event) {
		let height = 0;
		$(this).addClass("active").siblings().removeClass("active");
		if (heightSpacing) {
			height = heightSpacing();
		} else {
			height = 0;
		}
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top - height,
				},
				800
			);
		}
	});
}

export function appendCaptchaASP () {
	if (!$("#ctl00_mainContent_ctl01_pnlFormWizard").length) return;
	// Select the div element you want to observe
	const myDiv = document.querySelector("#ctl00_mainContent_ctl01_pnlFormWizard");
	// Create a new MutationObserver object
	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			console.log("Run");
			appendCaptcha();
		});
	});
	// Configure the observer to listen for changes to the "class" attribute
	const config = { attributes: true, characterData: true, childList: true };
	// Start observing the target div element
	observer.observe(myDiv, config);
	function appendCaptcha () {
		$(".form-group.frm-captcha").appendTo(".wrap-form-submit");
		$(".form-group.frm-btnwrap").appendTo(".wrap-form-submit");
	}
	appendCaptcha();
}
export function replaceSvgImages () {
	$(".img-svg").each(function () {
		const $img = $(this);
		const imgURL = $img.attr("src");
		const imgClass = $img.attr("class");
		const imgWidth = $img.attr("width");
		const imgHeight = $img.attr("height");

		$.ajax({
			url: imgURL,
			dataType: "text",
			success: function (svgContent) {
				// Create a new div to hold the SVG content
				const $svgDiv = $("<div>").html(svgContent);
				const $svg = $svgDiv.find("svg");

				// Apply original image attributes to SVG
				if (imgClass) {
					$svg.addClass(imgClass);
				}

				// Replace the image with the SVG
				$img.replaceWith($svg);
			},
			error: function (error) {
				console.error("Error fetching SVG:", error);
			},
		});
	});
}
export function indicatorSlide () {
	if ($(".indicator-swipe").length > 0) {
		var callback = function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					setTimeout(function () {
						entry.target.classList.remove("active");
					}, 3000);
				}
			});
		};

		var observer = new IntersectionObserver(callback);
		var animationItems = document.querySelectorAll(".indicator-swipe");
		animationItems.forEach(function (item) {
			observer.observe(item);
		});
	}
}

export function countUpInit () {
	const countUpElements = document.querySelectorAll(".countup");
	let countUp;
	countUpElements.forEach((element) => {
		const targetNumber = element.getAttribute("data-number");
		// Check if number is decimal values
		const is_decimal = targetNumber?.includes(".");
		countUp = new CountUp(element, targetNumber, {
			duration: 4,
			separator: ".",
			decimal: ",",
			enableScrollSpy: true,
			decimalPlaces: is_decimal ? 2 : 0,
		});
		if (!countUp.error) {
			countUp.start();
		} else {
			console.error(countUp.error);
		}
	});
	return {
		reset: () => {
			countUp.reset();
		},
		start: () => {
			countUp.start();
		},
	};
}