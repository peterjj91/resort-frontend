/**
 * Табы
 * поддерживают вложенность
 * принимает callback, который будет выполняться при открытии вкладки (выпоняется также при ините)
 *
 * Пример инита:
 * new Tabs({}, function() {
 *   console.log(this); // В this будет лежать экземпляр класса
 * });
 *
 * В containerElement.tabs доступны container, tabs, toggles, callback
 */

import { getParent } from './util/selectors';

export default class Tabs {
	constructor(config, callback) {
		this.defaultConfig = {
			container: '.js-tabs',
			toggle: '.js-tabs-toggle',
			tab: '.js-tabs-tab',
			openClass: 'active',
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});
		this.callback = callback;
		this.init();
	}

	init() {
		for (const container of document.querySelectorAll(this.config.container)) {
			container.tabs = new Tab(container, this.config, this.callback);
		}
	}
}

export class Tab {
	constructor(container, config, callback) {
		this.config = config;
		this.container = container;
		this.toggles = [];
		this.tabs = [];
		this.callback = callback;

		this.init();
	}

	init() {
		for (const toggle of this.container.querySelectorAll(this.config.toggle)) {
			if (getParent(toggle, this.config.container) != this.container) continue;
			this.toggles.push(toggle);
		}
		for (const tab of this.container.querySelectorAll(this.config.tab)) {
			if (getParent(tab, this.config.container) != this.container) continue;
			this.tabs.push(tab);
		}

		if (this.toggles.length === 0 || this.tabs.length === 0) {
			console.warn('toggles or tabs not found');
			return;
		}
		if (this.toggles.length !== this.tabs.length) {
			console.warn("toggles' length is not equal tabs' length");
			return;
		}

		this.toggles.map(toggle => {
			toggle.addEventListener('click', () => this.open(toggle));
		});

		let activeIndex = 0;

		for (let i = 0; i < this.toggles.length; i++) {
			const toggle = this.toggles[i];
			if (toggle.classList.contains(this.config.openClass)) {
				activeIndex = i;
				break;
			}
		}

		this.open(this.toggles[activeIndex]);
	}

	open(toggle) {
		const index = this.toggles.indexOf(toggle);

		this.toggles.map(toggle => {
			toggle.classList.remove(this.config.openClass);
		});
		this.tabs.map(tab => {
			tab.classList.remove(this.config.openClass);
		});

		toggle.classList.add(this.config.openClass);
		this.tabs[index].classList.add(this.config.openClass);

		if (this.callback && typeof this.callback === 'function') this.callback();
	}
}
