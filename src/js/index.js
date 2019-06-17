import 'jquery';
import './util/modernizr'; // for sticky footer with flex in ie10
import Tabs from './Tabs';
import Popup from './Popup';
import Accordion from './Accordion';
import SideMenu from './SideMenu';
import MaskedInput from './MaskedInput';
import { Inputs, InputPassword, InputFile, Select } from './Inputs';

/* eslint-disable no-unused-expressions */
/** matches polyfill */
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
/* eslint-enable no-unused-expressions */

/* eslint-disable no-new */
/**
 * Открытие бокового меню
 * принимает конфиг и callback
 */
new SideMenu({}, function() {});

/** Навешивает на все инпуты класс focus, если value не пустое */
new Inputs();

/** Добавляет переключаетль показать/скрыть пароль */
new InputPassword();

/** Кастомный input[type="file"] */
new InputFile();

/** Кастомный select */
new Select();

/**
 * Popup
 * загружает контент через http request
 * закрывается по нажатию Esc, клику на крестик, клику вне popup
 * принимает конфиг и callback
 */
new Popup({}, function() {});

/**
 * Табы
 * поддерживают вложенность
 * принимает конфиг и callback
 */
new Tabs({}, function() {});

/**
 * Аккордеон
 * поддерживают вложенность
 * принимает конфиг и callback
 */
new Accordion({}, function() {});

/* eslint-enable no-new */

/** input с маской */
MaskedInput(
	'.js-inputmask-phone input',
	['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/],
	'+7 (___) ___ __-__',
	'+7 ('
);

/** input с маской */
(() => {
	const tooltipList = $('.js-tooltip');

	function setTooltipBehavior(tooltipEl) {
		if (!tooltipEl) return;
		const tooltip = tooltipEl;
		tooltip.style.transform = '';
		const rect = tooltip.getBoundingClientRect();
		const pageWidth = document.body.clientWidth;
		let offset = 0;

		if (rect.left < 0) {
			offset = -rect.left + 10;
		} else if (rect.right > pageWidth) {
			offset = pageWidth - rect.right - 10;
		} else {
			return;
		}
		tooltip.style.transform = `translateX(${offset}px)`;
	}

	function setTooltip(tooltip) {
		if (!tooltip) return;
		setTimeout(() => {
			// fix a reload page bug
			setTooltipBehavior(tooltip);
		}, 10);
		window.addEventListener('resize', setTooltipBehavior.bind(null, tooltip));
	}

	tooltipList.map(tooltip => setTooltip(tooltipList[tooltip]));
})();

/** Копирует ссылку страницы в списке страниц */
(() => {
	const qualifyURL = url => {
		const elem = document.createElement('div');
		elem.innerHTML = `<a href="${url}">x</a>`;
		return elem.firstChild.href;
	};

	$('.js-copy-link').click(function(e) {
		e.stopPropagation();
		const link = $(this)
			.parents('a')
			.attr('href');

		if (link) {
			let responseText;

			try {
				const textCopyContainer = $('<input>');
				$('body').append(textCopyContainer);

				textCopyContainer.val(qualifyURL(link)).select();
				document.execCommand('copy');
				textCopyContainer.remove();

				if (global.screen.width > 600) responseText = 'Ссылка скопирована';
				else responseText = 'Скопировано';
			} catch (e) {
				responseText = 'Неудача';
			}

			const response = $(`<div class="response">${responseText}</div>`);

			$(this).append(response);
			response.fadeOut(1500, () => {
				response.remove();
			});
		}

		return false;
	});
})();

// for favourite icon
$(document).ready(function() {
	$('.favourite-icons li').click(function() {
		$(this)
			.find('.icon')
			.toggleClass('icon--full');
	});
});
