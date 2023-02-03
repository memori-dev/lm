import {Classes, default as jss} from "jss"
import {default as preset} from "jss-preset-default"

type inputOutput = {
    label: HTMLLabelElement
    input: HTMLInputElement
}

export const lm = {
    append(parent: HTMLElement, e: HTMLElement): HTMLElement {
        return parent.appendChild(e)
    },

    new(tag: string, ...classes: string[]): HTMLElement {
        const e = document.createElement(tag)
        if (classes.length > 0) e.classList.add(...classes)
        return e
    },

    newAttrs(tag: string, attrs: { [key: string | symbol]: any }, ...classes: string[]): HTMLElement {
        const e = document.createElement(tag)
        Object.assign(e, attrs)
        if (classes.length > 0) e.classList.add(...classes)
        return e
    },

    appendNew(parent: HTMLElement, tag: string, ...classes: string[]): HTMLElement {
        const e = lm.new(tag, ...classes)
        return lm.append(parent, e)
    },

    appendNewAttrs(parent: HTMLElement, tag: string, attrs: { [key: string | symbol]: any }, ...classes: string[]): HTMLElement {
        const e = lm.newAttrs(tag, attrs, ...classes)
        return lm.append(parent, e)
    },

    newSvg: (function () {
        // Closure parser
        const parser = new DOMParser();

        return function (data: string, ...classes: string[]): HTMLElement {
            const e = parser.parseFromString(data, "image/svg+xml").documentElement
            if (classes.length > 0) e.classList.add(...classes)
            return e
        }
    })(),

    appendNewSvg(parent: HTMLElement, data: string, ...classes: string[]): HTMLElement {
        const e = lm.newSvg(data, ...classes)
        return lm.append(parent, e)
    },

    newInput(type: string, id: string): inputOutput {
        const label = lm.new("label") as HTMLLabelElement
        label.htmlFor = id

        const input = lm.append(label, lm.new("input")) as HTMLInputElement
        input.id = id
        input.type = type

        return {
            label,
            input,
        }
    },

    appendNewInput(parent: HTMLElement, type: string, id: string): inputOutput {
        const input = lm.newInput(type, id)
        lm.append(parent, input.label)
        lm.append(parent, input.input)
        return input
    },

    createStyleSheet: (function () {
        jss.setup(preset())
        return function (styles: { [key: string]: any }): Classes {
            const {classes} = jss.createStyleSheet(styles).attach()
            return classes
        }
    })(),
}
