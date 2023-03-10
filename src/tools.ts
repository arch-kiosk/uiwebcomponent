import {UIInputData} from "./uischema";

export function replaceData(template: string|null|undefined, data: UIInputData) {
    if (!template) return ""
    console.log("value:", template)
    const regex = new RegExp(String.raw`\$\{(.*?)\}`,"g")
    let result = template
    result = result.replace(regex, (_match, p1) => {
        try {
            let v =data[p1]
            if (v) return (v)
        } catch {
        }
        return ""
    })

    return result
}

