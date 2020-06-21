export const updateAttr = (oldVnode, vnode) => {
    if (oldVnode.props && !oldVnode.props.attrs && vnode.props && !vnode.props.attrs) {
        return
    }
    let key, cur, old
    const elm = vnode.elm
    const oldAttrs = oldVnode.props && oldVnode.props.attrs || {}
    let attrs = vnode.props && vnode.props.attrs || {}

    for (key in attrs) {
        cur = attrs[key]
        old = oldAttrs[key]
        if (old !== cur) {
          setAttr(elm, key, cur)
        }
    }
    for (key in oldAttrs) {
        if (!attrs[key]) {
          elm.removeAttribute(key)
        }
    }
}

function setAttr(el, key, value){
    if (!value) {
        el.removeAttribute(key)
    } else {
        el.setAttribute(key, value)
    }
}

export const updateDOMProps = (oldVnode, vnode) => {
    if (oldVnode.props && !oldVnode.props.domProps && vnode.props && !vnode.props.domProps) {
        return
    }
    let key, cur
    const elm = vnode.elm
    const oldProps = oldVnode.props && oldVnode.props.domProps || {}
    let props = vnode.props && vnode.props.domProps || {}
    for (key in oldProps) {
        if (!(key in props)) {
             elm[key] = ''
        }
    }
    for (key in props) {
        cur = props[key]
        if (key === 'value' && elm.tagName !== 'PROGRESS') {
          const strCur = !(cur) ? '' : String(cur)
          elm.value = strCur
        }
    }
}