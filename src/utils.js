const isObject = (obj) => {
  return obj === Object(obj)
}

const formatArgs = (attributes, children) => {
  if (Array.isArray(attributes) && children === undefined) {
    return {
      attributes: {},
      children: attributes
    }
  }

  if (isObject(attributes) && Array.isArray(children)) {
    return {
      attributes,
      children
    }
  }

  return {
    attributes: {},
    children: []
  }
}


const h = (tag, ...args) => {
  const { attributes, children } = formatArgs(...args)

  return (document) => {
    const element = document.createElement(tag)
    const properties = Object.entries(attributes)

    properties.forEach(([key, value]) => {
      if (typeof value === 'function') {
        element[key] = value
        return element
      }

      element.setAttribute(key, value)
      return element
    })

    children.forEach(child => {
      element.appendChild(child(document))
    })

    return element
  }
}

const text = (string) => {
  return (document) => {
    return document.createTextNode(string)
  }
}

export { h, text }
