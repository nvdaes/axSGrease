// ==UserScript==
// @name           Trello Accessibility Fixes
// @namespace      http://axSgrease.nvaccess.org/
// @description    Improves the accessibility of Trello.
// @author         James Teh <jamie@nvaccess.org>
// @copyright 2017 NV Access Limited
// @license GNU General Public License version 2.0
// @version        2017.1
// @grant GM_log
// @include https://trello.com/*
// ==/UserScript==

// Used when we need to generate ids for ARIA.
var idCounter = 0;
// Get a node's id. If it doesn't have one, make and set one first.
function getAriaId(elem) {
	if (elem.id) {
		return elem.id;
	}
	elem.setAttribute("id", "axsg-" + idCounter++);
	return elem.id;
}

function makeHeading(elem, level) {
	elem.setAttribute("role", "heading");
	elem.setAttribute("aria-level", level);
}

function tweakCard(card) {
	// Make this a focusable list item.
	card.setAttribute("tabindex", "-1");
	card.setAttribute("role", "listitem");
}

// Make checklists accessible.
function tweakCheckItem(checkItem, isNew) {
	var checkbox = checkItem.querySelector(".checklist-item-checkbox-check");
	if (isNew) {
		checkbox.setAttribute("role", "checkbox");
		checkbox.setAttribute("tabindex", "-1");
		var checkLabel = checkItem.querySelector(".checklist-item-details-text");
		if (checkLabel) {
			checkbox.setAttribute("aria-labelledby", getAriaId(checkLabel));
		}
	}
	var complete = checkItem.classList.contains("checklist-item-state-complete");
	checkbox.setAttribute("aria-checked", complete ? "true" : "false");
}

function tweakDueDateComplete(completeBadge, isNew) {
	var checkbox = completeBadge.querySelector(".card-detail-badge-due-date-complete-box");
	if (isNew) {
		checkbox.setAttribute("role", "checkbox");
		checkbox.setAttribute("tabindex", "-1");
		checkbox.setAttribute("aria-label", "Complete");
	}
	var complete = completeBadge.classList.contains("is-due-complete");
	checkbox.setAttribute("aria-checked", complete ? "true" : "false");
}

function onNodeAdded(target) {
	if (target.classList.contains("list-card")) {
		// A card just got added.
		tweakCard(target);
		return;
	}
	if (target.classList.contains("badge")) {
		// Label badges.
		var label = target.getAttribute("title");
		// Include the badge count (if any) in the label.
		label += target.textContent;
		target.setAttribute("aria-label", label);
		return;
	}
	if (target.id == "clipboard") {
		// Pressing control focuses a contentEditable div for clipboard stuff,
		// but this causes screen reader users to lose their position.
		target.blur();
		return;
	}
	if (target.classList.contains("checklist-item")) {
		// A checklist item just got added.
		tweakCheckItem(target, true);
		return;
	}
	for (var list of target.querySelectorAll(".list")) {
		list.setAttribute("role", "list");
		var header = list.querySelector(".list-header-name");
		if (header) {
			// Label the list with its header.
			list.setAttribute("aria-labelledby", getAriaId(header));
			// Make the header's container into a heading.
			makeHeading(header, 2);
		}
	}
	for (var card of target.querySelectorAll(".list-card")) {
		tweakCard(card);
	}
	for (var activityCreator of target.querySelectorAll(".phenom-creator")) {
		// Make the creator of an activity item into a heading
		// to facilitate quick jumping between activity items.
		makeHeading(activityCreator, 4);
	}
	for (var checkItem of target.querySelectorAll(".checklist-item")) {
		tweakCheckItem(checkItem, true);
	}
	for (var dueComplete of target.querySelectorAll(".card-detail-due-date-badge")) {
		tweakDueDateComplete(dueComplete, true);
	}
}

function onClassModified(target) {
	var classes = target.classList;
	if (!classes)
		return;
	if (classes.contains("active-card")) {
		// When the active card changes, focus it.
		target.focus();
	} else if (classes.contains("checklist-item")) {
		tweakCheckItem(target, false);
	} else if (classes.contains("card-detail-due-date-badge")) {
		tweakDueDateComplete(target, false);
	}
}

var observer = new MutationObserver(function(mutations) {
	for (var mutation of mutations) {
		try {
			if (mutation.type === "childList") {
				for (var node of mutation.addedNodes) {
					if (node.nodeType != Node.ELEMENT_NODE)
						continue;
					onNodeAdded(node);
				}
			} else if (mutation.type === "attributes") {
				if (mutation.attributeName == "class")
					onClassModified(mutation.target);
			}
		} catch (e) {
			// Catch exceptions for individual mutations so other mutations are still handled.
			GM_log("Exception while handling mutation: " + e);
		}
	}
});
observer.observe(document, {childList: true, attributes: true,
	subtree: true, attributeFilter: ["class"]});

function moveCard() {
	// Open the quick editor.
	var op = document.querySelector(".active-card .list-card-operation");
	if (!op) {
		return;
	}
	op.click();
	// Click the Move button.
	var move = document.querySelector(".js-move-card");
	if (!move) {
		return;
	}
	move.click();
	// Focus the list selector.
	// This doesn't work if we don't delay it. Not quite sure why.
	setTimeout(function() {
		var sel = document.querySelector(".js-select-list");
		if (!sel) {
			return;
		}
		sel.focus();
	}, 50);
}

// Add some keyboard shortcuts.
document.addEventListener("keydown", function(evt) {
	if (document.activeElement.nodeName == "INPUT" || document.activeElement.nodeName == "TEXTAREA" || document.activeElement.isContentEditable) {
		return false;
	}
	if (evt.key == "M") {
		moveCard();
	}
});
