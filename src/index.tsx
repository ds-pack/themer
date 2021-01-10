let tokenRegex = new RegExp(/\$([^\s,)]+)/, 'g')

export function get(theme: object, path: string): string | number {
  let route = path.split('.')
  let res = theme
  let idx = 0
  while (idx < route.length) {
    if (res === undefined) {
      break
    }
    if (res !== undefined) {
      let key: string | number = route[idx]
      // @ts-ignore
      if (key == Number(key)) {
        key = Number(key)
      }
      res = res[key]
    }
    idx++
  }
  if (res === theme) {
    return undefined
  }
  // @ts-ignore
  return res
}

export default function themer(baseTheme) {
  return Object.entries(baseTheme).reduce((theme, [key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value) && value != null) {
      return {
        ...theme,
        [key]: themer(value),
      }
    } else if (typeof value === 'string') {
      let match = [...value.matchAll(tokenRegex)]
      if (match.length) {
        let result = value
        match.forEach(([original, capture]) => {
          let val = get(theme, capture)
          // if we can't process the value, or the value returns undefined, just forward it as-is
          // We may want to return undefined here though 🤔
          if (val !== undefined) {
            result = result.replace(original, val.toString())
          }
        })
        return {
          ...theme,
          [key]: result,
        }
      }
    } else if (Array.isArray(value)) {
      return {
        ...theme,
        [key]: value.map((val) => {
          if (typeof val === 'string') {
            let match = [...val.matchAll(tokenRegex)]
            if (match.length) {
              let result = val
              match.forEach(([original, capture]) => {
                let val = get(theme, capture)
                // if we can't process the value, or the value returns undefined, just forward it as-is
                // We may want to return undefined here though 🤔
                if (val !== undefined) {
                  result = result.replace(original, val.toString())
                }
              })
              return result
            }
            return val
          }
          return val
        }),
      }
    }
    return {
      ...theme,
      [key]: value,
    }
  }, {})
}
