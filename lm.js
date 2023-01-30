const {default: jss} = require("jss");
const {default: preset} = require("jss-preset-default");

jss.setup(preset())

const lm = {}

lm.append = function (parent, e) {
    return parent.appendChild(e)
}

lm.new = function (tag, ...classes) {
    const e = document.createElement(tag)
    if (classes.length > 0) e.classList.add(...classes)
    return e
}

lm.newAttrs = function (tag, attrs, ...classes) {
    const e = document.createElement(tag)
    Object.assign(e, attrs)
    if (classes.length > 0) e.classList.add(...classes)
    return e
}

lm.appendNew = function (parent, tag, ...classes) {
    const e = lm.new(tag, ...classes)
    return lm.append(parent, e)
}

lm.appendNewAttrs = function (parent, tag, attrs, ...classes) {
    const e = lm.newAttrs(tag, attrs, ...classes)
    return lm.append(parent, e)
}

lm.newSvg = (function () {
    // Closure parser
    const parser = new DOMParser();

    return function (data, ...classes) {
        const e = parser.parseFromString(data, "image/svg+xml").documentElement
        if (classes.length > 0) e.classList.add(...classes)
        return e
    }
})()

lm.appendNewSvg = function (parent, data, ...classes) {
    const e = lm.newSvg(data, ...classes)
    return lm.append(parent, e)
}

lm.newInput = function (type, id) {
    const label = lm.new("label")
    label.for = id
    label.type = type

    const input = lm.append(label, lm.new("input"))
    input.id = id
    input.type = type

    return {
        label,
        input,
    }
}

lm.appendNewInput = function (parent, type, id) {
    const input = lm.newInput(type, id)
    lm.append(parent, input.label)
    lm.append(parent, input.input)
    return input
}

lm.createStyleSheet = function(styles) {
    const {classes} = jss.createStyleSheet(styles).attach()
    return classes
}

module.exports = {
    lm,
}
