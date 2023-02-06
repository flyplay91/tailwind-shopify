const dom = {};

const selectors = {
	form: ".form",
	submitBtn: ".form-submit",
};

const cacheDom = () => {
	dom.forms = document.querySelectorAll(selectors.form);
};

const bindEvents = () => {
	dom.forms.forEach((form) => {
		let submitBtn = form.querySelector(selectors.submitBtn);
		let fields = form.querySelectorAll("input, select, textarea");
		submitBtn &&
			submitBtn.addEventListener("click", (e) => {
				let valid = true;
				fields.forEach((field) => {
					if (field.required) valid &= validateField(field);
				});
				if (valid) form.submit();
			});
		fields.forEach((field) => {
			// field.addEventListener('keyup', e => validateField(field))
			field.addEventListener("change", (e) => validateField(field));
			field.addEventListener("invalid", (e) => validateField(field));
		});
		form.addEventListener("keypress", (e) => {
			if (e.key == "Enter") submitBtn.click();
		});
	});
};

const validateField = (field) => {
	let form = field.closest(selectors.form);
	let tag = field.tagName.toLowerCase();
	let value = field.value.trim();
	let type = field.type;
	let valid = true;
	if (tag == "select") {
		valid = value != "";
	} else if (tag == "textarea") {
		valid = value != "";
	} else if (tag == "input") {
		if (type == "email") {
			// if email is not matched w/ email pattern
			if (
				value.length <= 0 ||
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					value
				) === false
			) {
				valid = false;
			}
		} else if (type == "tel") {
			if (
				!value.length ||
				/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
					value
				) == false
			) {
				valid = false;
			}
		} else if (
			type == "password" &&
			field.classList.contains("password-confirmation")
		) {
			let passwordEl = form.querySelector(".password");
			valid = value == passwordEl.value;
		} else {
			valid = value != "";
		}
	}
	field.classList.toggle("has-error", !valid);
	return valid;
};

const initSelect = () => {
	[...dom.forms].forEach((form) => {
		[...form.querySelectorAll("select")].forEach((dropdown) => {
			dropdown.addEventListener("change", (e) => {
				dropdown.classList.toggle("selected", dropdown.value != "");
				if (dropdown.classList.contains("account-country")) {
					let provinceSelect = dropdown
						.closest("form")
						.querySelector(".account-province");
					if (provinceSelect && dropdown.selectedIndex >= 0) {
						let provinceData = JSON.parse(
							dropdown.options[dropdown.selectedIndex].dataset.provinces
						);
						provinceSelect.innerHTML = '<option value="">Selet State</option>';
						provinceData.forEach(
							(province) =>
								(provinceSelect.innerHTML += `<option value="${province[0]}">${province[1]}</option>`)
						);
						if (!provinceData.length) {
							provinceSelect.classList.remove("selected");
						} else {
							provinceSelect.value = provinceSelect.dataset.default;
							provinceSelect.classList.toggle(
								"selected",
								provinceSelect.value != ""
							);
						}
					}
				}
			});
			if (dropdown.classList.contains("account-country")) {
				Array.from(dropdown.options).forEach((option) => {
					if (option.value == "---") {
						option.value = "";
						option.text = "";
					}
				});
				dropdown.value = dropdown.dataset.default;
				if (dropdown.dataset.default)
					dropdown.dispatchEvent(new Event("change"));
			}
		});
	});
};

const form = {
	init() {
		cacheDom();
		bindEvents();
		initSelect();
	},
};

export default form;
