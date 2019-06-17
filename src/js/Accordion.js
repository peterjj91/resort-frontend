/**
 * Аккордеон
 * поддерживает вложенность
 * принимает callback, который будет выполняться при открытии аккордеона
 *
 * Пример инита:
 * new Accordion({}, function() {
 *   console.log(this); // В this будет лежать экземпляр класса
 * });
 *
 * В containerElement.accordion доступны container, items, toggles, callback
 */

import { getParent } from './util/selectors';

export default class Accordion {
	constructor(config, callback) {
		this.defaultConfig = {
			container: '.js-accordion',
			item: '.js-accordion-item',
			toggle: '.js-accordion-toggle',
			openClass: 'active',
			/** Закрывать остальные аккордеоны при открытии */
			singleOpen: true,
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});
		this.callback = callback;

		this.init();
	}

	init() {
		for (const container of document.querySelectorAll(this.config.container)) {
			container.accordion = new AccordionInit(container, this.config, this.callback);
		}
	}
}

export class AccordionInit {
	constructor(container, config, callback) {
		this.config = config;
		this.container = container;
		this.callback = callback;
		this.toggles = [];
		this.items = [];

		this.init();
	}

	init() {
		for (const toggle of this.container.querySelectorAll(this.config.toggle)) {
			if (getParent(toggle, this.config.container) != this.container) continue;
			this.toggles.push(toggle);
		}
		for (const item of this.container.querySelectorAll(this.config.item)) {
			if (getParent(item, this.config.container) != this.container) continue;
			this.items.push(item);
		}

		if (this.toggles.length === 0 || this.items.length === 0) {
			console.warn('toggles or items not found');
			return;
		}
		if (this.toggles.length !== this.items.length) {
			console.warn("toggles' length is not equal items' length");
			return;
		}

		this.toggles.map(toggle => {
			toggle.addEventListener('click', () => this.open(toggle));
		});
	}

	open(toggle) {
		const index = this.toggles.indexOf(toggle);

		const parent = this.items[index];
		if (!parent) return;
		const parentActive = parent.classList.contains(this.config.openClass);

		this.items.map(item => {
			item.classList.remove(this.config.openClass);
		});

		if (!parentActive) {
			parent.classList.add(this.config.openClass);
		}

		if (this.callback && typeof this.callback === 'function') this.callback();
	}
}
