compileSelectors = function(arr, leaveHidden) {
	const self = this;
	const selectors = [];
	const buf = [];
	const hiddenSelectorRegexp = /^\s*\/?\$/;

	function interpolateParent(selector, buf) {
		let str = selector.val.replace(/^\//g, '').trim();
		if (buf.length) {
			for (let i = 0, len = buf.length; i < len; ++i) {
				if (~buf[i].indexOf('&') || buf[i].charAt(0) === '/') {
					str = buf[i]
						.replace(/&/g, str)
						.replace(/^\//g, '')
						.trim();
				} else {
					str += ` ${buf[i].trim()}`;
				}
			}
		}
		return str.trim();
	}

	function compile(arr, i) {
		if (i) {
			arr[i].forEach(selector => {
				if (!leaveHidden && selector.val.match(hiddenSelectorRegexp)) return;
				if (selector.inherits) {
					buf.unshift(selector.val);
					compile(arr, i - 1);
					buf.shift();
				} else {
					selectors.push(interpolateParent(selector, buf));
				}
			});
		} else {
			arr[0].forEach(selector => {
				if (!leaveHidden && selector.val.match(hiddenSelectorRegexp)) return;
				let str = interpolateParent(selector, buf);
				if (~str.indexOf('&')) str = str.replace(/&/g, '').trim();
				if (!str.length) return;
				selectors.push((self.indent || '') + str.trimRight());
			});
		}
	}

	compile(arr, arr.length - 1);

	// Return the list with unique selectors only
	return selectors.filter((value, index, self) => self.indexOf(value) === index);
};

const plugin = function() {
	return function(style) {
		style.define('root', function() {
			const stack = this.selectorStack;
			if (!stack.length) return '';
			return stack.length ? compileSelectors(stack.slice(0, 1)).join(',') : '&';
		});

		style.define('up', function(i) {
			let stack = this.selectorStack;
			const len = stack.length;
			var i;
			if (!stack.length) return '';
			i = parseInt(i, 10);
			if (!i) i = 1;
			if (i < 0) i = -i;
			i = i >= len ? len - 1 : i;
			stack = stack.slice(0, len - i);
			return compileSelectors(stack).join(',');
		});

		style.define('end', function() {
			const len = this.selectorStack.length;
			let selector = null;
			if (!len) return '';
			selector = compileSelectors(this.selectorStack).join(',');
			selector = selector.toString().split(' ');
			return selector[selector.length - 1];
		});
	};
};
module.exports = plugin;
