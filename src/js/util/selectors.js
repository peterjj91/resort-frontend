/**
 * Возвращает родителя для target
 * вернет null или ближайший элемент-родитель, соответствует css-селектору parentSelector
 */
export function getParent(target, parentSelector) {
	let parent = target;
	while (parent != document.body) {
		if (parent.matches(parentSelector)) {
			return parent;
		}
		parent = parent.parentNode;
	}
	return null;
}
