/**
 * Боковое меню
 * закрывается при клике по станице мимо самого меню
 * принимает callback, который будет выполняться при открытии меню
 *
 * Пример инита:
 * new SideMenu({}, function() {
 *   console.log(this); // В this будет лежать экземпляр класса
 * });
 */

export default class SideMenu {
	constructor(config, callback) {
		this.defaultConfig = {
			side: '.js-side',
			canvas: '.js-canvas',
			toggle: '.js-side-toggle',
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});
		this.callback = callback;
		this.side = document.querySelector(this.config.side);
		this.canvas = document.querySelector(this.config.canvas);
		this.toggles = document.querySelectorAll(this.config.toggle);
		this.bindcloseSideHandler = this.closeSideHandler.bind(this);

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

		this.init();
	}

	init() {
		for (const toggle of this.toggles) {
			toggle.addEventListener('click', () => this.toggleSide());
		}
	}

	toggleSide() {
		this.side.classList.toggle('open');
		this.canvas.classList.toggle('slide');

		document.documentElement.classList.add('overflow');
		document.body.classList.add('overflow');

		if (this.side.classList.contains('open')) {
			setTimeout(() => {
				this.canvas.addEventListener('click', this.bindcloseSideHandler);
			}, 10);

			if (this.callback && typeof this.callback === 'function') this.callback();
		}
	}

	closeSideHandler(e) {
		e.preventDefault();

		let parent = e.target;
		while (parent != document) {
			if (parent.matches(this.config.side)) {
				return;
			}
			parent = parent.parentNode;
		}

		this.side.classList.remove('open');
		this.canvas.classList.remove('slide');
		this.canvas.removeEventListener('click', this.bindcloseSideHandler);
		console.log('close');

		setTimeout(() => {
			document.documentElement.classList.remove('overflow');
			document.body.classList.remove('overflow');
		}, 300);

		return false;
	}
}
