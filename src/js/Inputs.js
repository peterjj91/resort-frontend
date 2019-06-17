export class Inputs {
	constructor(config) {
		this.init();
	}

	init() {
		for (const input of document.querySelectorAll('input')) {
			input.addEventListener('blur', this.addFocus);
		}
		this.addFocus();
	}

	addFocus() {
		for (const input of document.querySelectorAll('input')) {
			if (input.value) {
				input.classList.add('focus');
			} else {
				input.classList.remove('focus');
			}
		}
	}
}
export class InputPassword {
	constructor(config) {
		this.defaultConfig = {
			selector: '.js-input-password',
			toggleSelector: '.js-input-password-toggle',
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});
		this.init();
	}

	init() {
		for (const wrapper of document.querySelectorAll(this.config.selector)) {
			const input = wrapper.querySelector('input');
			const toggle = wrapper.querySelector(this.config.toggleSelector);

			if (toggle) {
				toggle.addEventListener('click', () => this.togglePassword(toggle, input));
			}
		}
	}

	togglePassword(toggle, input) {
		toggle.classList.toggle('show');

		if (input.type === 'password') {
			input.type = 'text';
			input.classList.add('showed');
		} else {
			input.type = 'password';
			input.classList.remove('showed');
		}
	}
}

// TODO: multiple
export class InputFile {
	constructor(config) {
		this.defaultConfig = {
			wrapperSelector: '.js-input-file',
			fakeSelector: '.js-input-file-fake',
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});
		this.init();
	}

	init() {
		for (const wrapper of document.querySelectorAll(this.config.wrapperSelector)) {
			for (const input of wrapper.querySelectorAll('input')) {
				input.addEventListener('change', () => this.setInputFile(input, wrapper));
			}
		}
	}

	setInputFile(input, wrapper) {
		const fakeInput = wrapper.querySelector(this.config.fakeSelector);
		const defaultText = fakeInput.innerText;
		let fileName = '';

		fakeInput.setAttribute('data-inputfile-text', defaultText);

		if (input.files && input.files.length > 1) {
			fileName = (input.getAttribute('data-multiple-caption') || '').replace('{count}', input.files.length);
		} else {
			fileName = input.value.split('\\').pop();
		}

		if (fileName) {
			fakeInput.innerText = fileName;
			wrapper.classList.add('loaded');
			wrapper.classList.add('focus');
		} else {
			fakeInput.innerText = defaultText;
			wrapper.classList.remove('loaded');
			wrapper.classList.remove('focus');
		}
	}
}

// TODO: multiple
export class Select {
	constructor(config) {
		this.defaultConfig = {
			selectSelector: '.js-select',
			selectTextSelector: '.js-select-selected',
			selectListSelector: '.js-select-list',
			selectListItemSelector: '.js-select-list-item',
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});

		// matches polyfill
		(function(e) {
			e.matches ||
				(e.matches =
					e.matchesSelector ||
					function(selector) {
						const matches = document.querySelectorAll(selector);
						const th = this;
						return Array.prototype.some.call(matches, function(e) {
							return e === th;
						});
					});
		})(Element.prototype);

		this.bindedCloseList = this.closeList.bind(this);
		this.init();
	}

	init() {
		for (const select of document.querySelectorAll(this.config.selectSelector)) {
			const text = select.querySelector(this.config.selectTextSelector);
			text.addEventListener('click', () => this.toggleList(select));
		}

		for (const select of document.querySelectorAll(this.config.selectSelector)) {
			const options = select.querySelectorAll(this.config.selectListItemSelector);
			for (let i = 0; i < options.length; i++) {
				options[i].addEventListener('click', () => this.checkOption(options[i], i, select));
			}
		}
	}

	toggleList(select) {
		const isOpen = select.classList.contains('open');
		for (const item of document.querySelectorAll(this.config.selectSelector)) {
			item.classList.remove('open');
		}
		if (isOpen) {
			select.classList.remove('open');
		} else {
			select.classList.add('open');
		}

		if (!isOpen) {
			setTimeout(() => {
				document.addEventListener('click', this.bindedCloseList);
			}, 10);
		} else {
			document.removeEventListener('click', this.bindedCloseList);
		}
	}

	closeList(e) {
		let parent = e.target;
		let isParent = false;
		while (parent != document) {
			if (parent.matches(this.config.selectSelector)) {
				isParent = true;
				break;
			}
			parent = parent.parentNode;
		}
		if (!isParent) {
			for (const select of document.querySelectorAll(this.config.selectSelector)) {
				select.classList.remove('open');
			}
		}
		document.removeEventListener('click', this.bindedCloseList);
	}

	checkOption(fakeOption, index, selectContainer) {
		const selectText = selectContainer.querySelector(this.config.selectTextSelector);

		selectContainer.querySelector('select').selectedIndex = index;
		selectText.innerText = fakeOption.innerText;
		selectContainer.classList.remove('open');
	}
}
