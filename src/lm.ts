export type LabeledInput = {
    input: HTMLInputElement
    label: HTMLLabelElement
}

interface ElementMap {
    "a": HTMLAnchorElement
    "button": HTMLButtonElement
    "div": HTMLDivElement
    "form": HTMLFormElement
    "h1": HTMLHeadingElement
    "h2": HTMLHeadingElement
    "h3": HTMLHeadingElement
    "img": HTMLImageElement
    "input": HTMLInputElement
    "label": HTMLLabelElement
    "main": HTMLElement
    "nav": HTMLElement
    "p": HTMLParagraphElement
    "span": HTMLSpanElement
}

type Tag = keyof ElementMap

export const lm = {
    append<T extends Tag>(parent: HTMLElement, e: ElementMap[T]): ElementMap[T] {
        return parent.appendChild(e)
    },

    new<T extends Tag>(tag: T, ...classes: string[]): ElementMap[T] {
        const e = document.createElement(tag)
        if (classes.length > 0) e.classList.add(...classes)
        return e
    },

    newAttrs<T extends Tag>(tag: T, attrs: { [key: string | symbol]: any }, ...classes: string[]): ElementMap[T] {
        const e = document.createElement(tag)
        Object.assign(e, attrs)
        if (classes.length > 0) e.classList.add(...classes)
        return e
    },

    appendNew<T extends Tag>(parent: HTMLElement, tag: T, ...classes: string[]): ElementMap[T] {
        const e = lm.new(tag, ...classes)
        return lm.append(parent, e)
    },

    appendNewAttrs<T extends Tag>(parent: HTMLElement, tag: T, attrs: { [key: string | symbol]: any }, ...classes: string[]): ElementMap[T] {
        const e = lm.newAttrs(tag, attrs, ...classes)
        return lm.append(parent, e)
    },

    newSvg: (function () {
        // Closure parser
        const parser = new DOMParser();

        return function (data: string, ...classes: string[]): SVGSVGElement {
            // TODO testing
            const e = parser.parseFromString(data, "image/svg+xml").documentElement as unknown as SVGSVGElement
            if (classes.length > 0) e.classList.add(...classes)
            return e
        }
    })(),

    appendNewSvg(parent: HTMLElement, data: string, ...classes: string[]): SVGSVGElement {
        const e = lm.newSvg(data, ...classes)
        parent.appendChild(e)
        return e
    },

    newInput(type: string, id: string): LabeledInput {
        const label = lm.new("label") as HTMLLabelElement
        label.htmlFor = id

        const input = lm.appendNew(label, "input") as HTMLInputElement
        input.id = id
        input.type = type

        return {
            input,
            label,
        }
    },

    appendNewInput(parent: HTMLElement, type: string, id: string): LabeledInput {
        const input = lm.newInput(type, id)
        lm.append(parent, input.label)
        lm.append(parent, input.input)
        return input
    },
}
