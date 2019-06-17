import textMask from 'vanilla-text-mask';

export default function MaskedInput(selector, mask, placeholder, pasteOnFocus, options) {
	for (const item of document.querySelectorAll(selector)) {
		textMask({
			inputElement: item,
			mask,
			...options,
		});

		if (placeholder) {
			item.setAttribute('placeholder', placeholder);
		}

		item.addEventListener('blur', function() {
			if (this.value.indexOf('_') > -1 || this.value.length !== mask.length) {
				this.value = '';
			}
		});

		if (pasteOnFocus) {
			['keydown', 'keypress', 'keyup', 'change', 'focus'].map(event => {
				item.addEventListener(event, function(e) {
					if (!this.value) {
						this.value = pasteOnFocus;
					}
				});
			});

			/** Не дает удалить pasteOnFocus */
			item.addEventListener('keydown', function(e) {
				if ((e.keyCode === 8 && this.value === pasteOnFocus) || (e.keyCode === 8 && this.value === placeholder)) {
					e.preventDefault();
					return false;
				}
			});
		}
	}
}
