const validTags = [
	"a",
	"button",
	"dialogue",
	"div",
	"form",
	"h1", "h2", "h3",
	"img",
	"input",
	"label",
	"main",
	"nav",
	"p",
	"span",
	"table", "th", "tr",
];

function validateTag(tag) {
	if (!validTags.includes(tag)) throw new SyntaxError(`lm: unknown tag ${tag}`);
}

function validateClasses(classes) {
	if (classes === null) return;
	if (!(classes instanceof Array)) throw new Error(`lm: classes is expected to be an array of strings or null`);
	if (classes instanceof Array) classes.forEach(function(e) {
		if (!(typeof e === "string")) throw new Error(`lm: classes expected each element to be a string`);
	})
}

function validateAttrs(attrs) {
	if (attrs === null) return;
	if (attrs instanceof Array) throw new Error(`lm: attrs is expeceted to be an object; received an array`);
	if (typeof attrs !== "object") throw new Error(`lm: attrs is expected to be an object`);
}

export default {
	new: function(tag, classes, attrs) {
		validateTag(tag);
		validateClasses(classes);
		validateAttrs(attrs);

		let e = document.createElement(tag);
		Object.assign(e, attrs)
		if (classes !== null && classes.length > 0) e.classList.add(...classes);
		return e
	},

	appendNew: function(parent, tag, classes, attrs) {
		let e = this.new(tag, classes, attrs);
		parent.appendChild(e);
		return e;
	},

	prependNew: function(parent, tag, classes, attrs) {
		let e = this.new(tag, classes, attrs);
		parent.prepend(e);
		return e;		
	},

	newSvg: (function() {
		// Closure parser
		const parser = new DOMParser();

		return function (data, classes) {
			validateClasses(classes);
			
			// TODO testing
			const e = parser.parseFromString(data, "image/svg+xml").documentElement;
			if (classes !== null && classes.length > 0) e.classList.add(...classes);
			return e
		}
	})(),

	newInput: function(type, id) {
		let label = new("label");
		label.htmlFor = id;

		let input = lm.appendNew(label, "input");
		input.id = id;
		input.type = type;

		return {
			input,
			label,
		}
	},
	
	getById: function(id) {
		return document.getElementById(id);
	},
};
