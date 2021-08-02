import { maybe, io, show, foldMap, partition, memoize } from "sibilisp/prelude";
const _eArg1_ = " expects argument 1 to be a ";
const _eArg2_ = " expects argument 2 to be a ";
const _eventMap_ = {
  animationend: AnimationEvent,
  animationstart: AnimationEvent,
  animationiteration: AnimationEvent,
  transitionstart: TransitionEvent,
  transitionend: TransitionEvent,
  keydown: KeyboardEvent,
  keypress: KeyboardEvent,
  keyup: KeyboardEvent,
  pointerover: PointerEvent,
  pointerenter: PointerEvent,
  pointerleave: PointerEvent,
  pointerout: PointerEvent,
  pointerdown: PointerEvent,
  pointerup: PointerEvent,
  pointermove: PointerEvent,
  pointercancel: PointerEvent,
  gotpointercapture: PointerEvent,
  lostpointercapture: PointerEvent,
  input: InputEvent,
  click: MouseEvent,
  dblclick: MouseEvent,
  mousedown: MouseEvent,
  mousemove: MouseEvent,
  mouseup: MouseEvent,
  mouseover: MouseEvent,
  mouseout: MouseEvent,
  mouseenter: MouseEvent,
  mouseleave: MouseEvent,
  touchstart: TouchEvent,
  touchmove: TouchEvent,
  touchend: TouchEvent,
  touchcancel: TouchEvent,
  focus: FocusEvent,
  blur: FocusEvent,
  change: Event,
  scroll: Event
};
export const DOM = (function() {
    function type$1(stack) {
    let self$1 = Object.create(type$1.prototype);
    let argCount$1 = arguments.length;
    (function() {
      if (!(argCount$1 === 1)) {
        return (function() {
          throw (new Error(("" + "DOM" + " received invalid number of arguments.")))
        }).call(this);
      }
    }).call(this);
    self$1.stack = stack;
    return self$1;
  };
  type$1.is = (function(x$1) {
      
    return x$1 instanceof type$1;
  });
  return type$1;
}).call(this);
DOM.of = (function(els) {
    var els = Array.prototype.slice.call(arguments, 0);

  return DOM(io.of(els));
});
DOM.lift = (function(els) {
    var els = Array.prototype.slice.call(arguments, 0);

  return DOM(io.of(foldMap(els, (function(el) {
      
    return (((!(el == null) && el instanceof Node) || (!(el == null) && el instanceof HTMLElement))
      ? [ el ]
      : Array.isArray(el)
      ? el
      : ((!(null == el) && el.constructor === NodeList) || (!(null == el) && el.constructor === HTMLCollection))
      ? Array.from(el)
      : []);
  }))));
});
DOM.empty = (function() {
    return DOM(io.of([]));
});
DOM.prototype.run = (function(args) {
    var args = Array.prototype.slice.call(arguments, 0);

  return this.stack.runIo(args);
});
DOM.prototype.toIo = (function() {
    return this.stack;
});
DOM.prototype.concat = (function(tDom) {
    return (!(tDom instanceof DOM)
    ? (function() {
    throw (new Error(("" + "(DOM.concat)" + _eArg1_ + "DOM, got " + show(tDom))))
  }).call(this)
    : (function(s1, s2) {
      
    return DOM(s2.flatMap((function(els1) {
          
      return s2.map((function(els2) {
              
        return els1.concat(els2);
      }));
    })));
  })(this.stack, tDom.stack));
});
DOM.prototype.map = (function(fn) {
    return (!(typeof fn === "function")
    ? (function() {
    throw (new Error(("" + "(DOM.map)" + _eArg1_ + "function, got " + show(fn))))
  }).call(this)
    : DOM(this.stack.flatMap((function(els) {
      
    return els.map(fn);
  }))));
});
DOM.prototype.flatMap = (function(fn) {
    return (!(typeof fn === "function")
    ? (function() {
    throw (new Error(("" + "(DOM.flat-map/.chain)" + _eArg1_ + "function, got " + show(fn))))
  }).call(this)
    : DOM(this.stack.map((function(els) {
      
    return els.reduce((function(acc, el) {
          
      return acc.concat(fn(el).run(el));
    }), []);
  }))));
});
DOM.prototype.chain = DOM.prototype.flatMap;
DOM.prototype.filter = (function(fn) {
    return (!(typeof fn === "function")
    ? (function() {
    throw (new Error(("" + "(DOM.filter)" + _eArg1_ + "function, got " + show(fn))))
  }).call(this)
    : DOM(this.stack.map((function(els) {
      
    return els.filter(fn);
  }))));
});
DOM.prototype.alt = (function(tDom) {
    return (!(tDom instanceof DOM)
    ? (function() {
    throw (new Error(("" + "(DOM.alt)" + _eArg1_ + "DOM, got " + show(tDom))))
  }).call(this)
    : (function(s1, s2) {
      
    return DOM(s1.flatMap((function(els1) {
          
      return (function() {
        if (els1.length > 0) {
          return DOM.lift(els1);
        } else {
          return tDom;
        }
      }).call(this);
    })));
  })(this.stack, tDom.stack));
});
DOM.prototype.reduce = (function(fn, seed) {
    return (!(typeof fn === "function")
    ? (function() {
    throw (new Error(("" + "(DOM.reduce)" + _eArg1_ + "function, got " + show(fn))))
  }).call(this)
    : DOM(this.stack.map((function(els) {
      
    let r = els.reduce(fn, seed);
    return (Array.isArray(r)) ? r : [ r ];
  }))));
});
export const of = (function(els) {
    var els = Array.prototype.slice.call(arguments, 0);

  return DOM.of.apply(this, els);
});
export const lift = (function(els) {
    var els = Array.prototype.slice.call(arguments, 0);

  return DOM.lift.apply(this, els);
});
export const empty = (function() {
    return DOM.empty();
});
export const create = (function(tagname, props, children) {
    var children = Array.prototype.slice.call(arguments, 2);

  return (function(el, ps) {
      
    ps.forEach((function(key_value$1) {
          
      var key = key_value$1[0],
          value = key_value$1[1];
    
      return (function() {
        if (key === "class") {
          return el.className = value;
        } else if (key === "style") {
          return Object.entries(value).forEach((function(sprop_sval$1) {
                      
            var sprop = sprop_sval$1[0],
                sval = sprop_sval$1[1];
          
            return el.style[sprop] = sval;
          }));
        } else if (key === "for") {
          return el.htmlFor = value;
        } else {
          return el[key] = value;
        }
      }).call(this);
    }));
    children.forEach((function(child) {
          
      return (function() {
        if (!((typeof child === "string" || (!(child == null) && child instanceof Node)))) {
          return child;
        } else if (typeof child === "string") {
          return el.appendChild(document.createTextNode(child));
        } else {
          return el.appendChild(child);
        }
      }).call(this);
    }));
    return el;
  })(document.createElement(tagname), Object.entries(props));
});
export const getWin = (function() {
    return DOM.of(window);
});
export const getDoc = (function() {
    return DOM.of(document);
});
export const getDocRoot = (function() {
    return getDoc().map((function() {
      
    return arguments[0].documentElement;
  }));
});
export const getDocHead = (function() {
    return getDoc().map((function() {
      
    return arguments[0].querySelector("head");
  }));
});
export const getDocBody = (function() {
    return getDoc().map((function() {
      
    return arguments[0].querySelector("body");
  }));
});
export const getDocScrollEl = (function() {
    return getDoc().map((function(el) {
      
    return (el.scrollingElement || getDocRoot());
  }));
});
export const setProp__BANG = (function(prop, value) {
    (function() {
    if (!(typeof prop === "string")) {
      return (function() {
        throw (new Error(("" + "(dom::set-prop)" + _eArg1_ + "string, got " + show(prop))))
      }).call(this);
    }
  }).call(this);
  return (function(el) {
      
    el[prop] = ((false === value || value === null || typeof value === "undefined" || Number.isNaN(value))) ? null : value;
    return el;
  });
});
export const getProp = (function(prop) {
    return (function(el) {
      
    return el[prop];
  });
});
export const setText__BANG = (function(value) {
    return setProp("textContent", String(value));
});
export const getText = (function(el) {
    return getProp("textContent")(el);
});
export const setHtml__BANG = (function(value) {
    return setProp("innerHTML", String(value));
});
export const getHtml = (function(el) {
    return getProp("innerHTML")(el);
});
export const setValue__BANG = (function(value) {
    return (function(el) {
      
    return (function(tname, ttype) {
          
      return (function() {
        if (tname === "textarea") {
          el.textContent = String(value);
          return el;
        } else if (tname === "select") {
          return (function(opts, val) {
                      
            opts.forEach((function(opt) {
                          
              return opt.selected = (val === opt.value) ? true : null;
            }));
            return el;
          })(Array.from(el.querySelectorAll(("option"))), String(value));
        } else if (!(tname === "input")) {
          return el;
        } else if (ttype === "radio") {
          return (function() {
                      
            let selct = el.name;
            let radis = Array.from(document.querySelectorAll("[name=\"", selct, "\"]"));
            return (function() {
                          
              radis.forEach((function(rad) {
                              
                return rad.checked = (value === rad.value) ? true : null;
              }));
              return el;
            })();
          }).call(this);
        } else {
          el.value = value;
          return el;
        }
      }).call(this);
    })(el.nodeName.toLowerCase(), el.type.toLowerCase());
  });
});
export const getValue = (function(el) {
    return el.value;
});
export const hasClass__QUERY = (function(classn) {
    return (function(el) {
      
    return el.classList.contains(String(classn));
  });
});
export const addClass__BANG = (function(classn) {
    return (function(el) {
      
    el.classList.add(String(classn));
    return el;
  });
});
export const removeClass__BANG = (function(classn) {
    return (function(el) {
      
    el.classList.remove(String(classn));
    return el;
  });
});
export const toggleClass__BANG = (function(classn, force) {
    return (function(el) {
      
    el.classList.toggle(String(classn), force);
    return el;
  });
});
export const setData__BANG = (function(propsAndValues) {
    var propsAndValues = Array.prototype.slice.call(arguments, 0);

  return (function(pairs) {
      
    return (function(el) {
          
      pairs.forEach((function(prop_value$1) {
              
        var prop = prop_value$1[0],
            value = prop_value$1[1];
      
        return el.dataset[prop] = String(value);
      }));
      return el;
    });
  })(partition(propsAndValues, 2));
});
export const getData = (function(props) {
    var props = Array.prototype.slice.call(arguments, 0);

  return (function(acc) {
      
    return (function(el) {
          
      props.forEach((function(prop) {
              
        return acc[prop] = el.dataset[prop];
      }));
      return acc;
    });
  })({  });
});
export const getRect = (function(props) {
    var props = Array.prototype.slice.call(arguments, 0);

  return (function(ps) {
      
    return (function(el) {
          
      return (function(rect) {
              
        return ((!!(ps))
          ? ps.reduce((function(acc, prop) {
                  
          return (function() {
            if ((prop in rect)) {
              acc[prop] = rect[prop];
              return acc;
            } else {
              return acc;
            }
          }).call(this);
        }), Object.create(null))
          : rect);
      })(el.getBoundingClientRect());
    });
  })((props.length > 0) ? props : null);
});
export const getSize = (function(props) {
    var props = Array.prototype.slice.call(arguments, 0);

  return (function(ps) {
      
    return (function(el) {
          
      return ps.reduce((function(acc, prop) {
              
        return (function() {
          if ((prop in el)) {
            acc[prop] = el[prop];
            return acc;
          } else {
            return acc;
          }
        }).call(this);
      }), Object.create(null));
    });
  })((props.length > 0) ? props : getSize.__defaults__);
});
Object.defineProperties(getSize, { "__defaults__": {
  enumerable: true,
  writable: false,
  configurable: false,
  value: [ "offsetWidth", "offsetHeight" ]
} });
export const getOuterSize = (function(el) {
    return getSize("offsetWidth", "offsetHeight")(el);
});
export const getInnerSize = (function(el) {
    return getSize("clientWidth", "clientHeight")(el);
});
export const getScrollSize = (function(el) {
    return getSize("scrollWidth", "scrollHeight")(el);
});
export const getChild = (function(selector) {
    return (function(el) {
      
    return (function(child) {
          
      return DOM.lift(child);
    })(el.querySelector(selector));
  });
});
export const getChilds = (function(selector) {
    return (function(el) {
      
    return (function(childs) {
          
      return DOM.lift.apply(this, childs);
    })(Array.from(el.querySelectorAll(selector)));
  });
});
export const getParent = (function(selector) {
    return (function(el) {
      
    return (function() {
      if (!(typeof selector === "string")) {
        return (function(node) {
                  
          return (!(node == null)
            ? DOM.lift(node)
            : DOM.empty());
        })(el.parentNode);
      } else {
        return (function(node) {
                  
          return ((!(node == null) && node.matches(selector))
            ? DOM.lift(node)
            : (null == node || Number.isNaN(node))
            ? DOM.empty()
            : (function() {
                      
            return (function(step, args) {
                          
              var args = Array.prototype.slice.call(arguments, 1);
            
              var looprecReturn$1 = step.apply(null, args);
              while ((typeof looprecReturn$1 === "function" && looprecReturn$1.__sibilispRecur__)) {
                looprecReturn$1 = looprecReturn$1();
              };
              return looprecReturn$1;
            })(function looprecStep(n) {
              return ((null == n || Number.isNaN(n))
                ? DOM.empty()
                : n.matches(selector)
                ? DOM.lift(n)
                : (function() {
                              
                const jump$1 = (function() {
                                  
                  return looprecStep(n.parentNode);
                });
                return Object.defineProperties(jump$1, { "__sibilispRecur__": {
                  enumerable: true,
                  writable: false,
                  configurable: false,
                  value: true
                } });
              }).call(this));
            }, node.parentNode);
          }).call(this));
        })(el.parentNode);
      }
    }).call(this);
  });
});
export const getPrevious = (function(selector) {
    return (function(el) {
      
    return (function() {
      if (!(typeof selector === "string")) {
        return (function(node) {
                  
          return (!(node == null)
            ? DOM.lift(node)
            : DOM.empty());
        })(el.previousElementSibling);
      } else {
        return (function(node) {
                  
          return ((!(node == null) && node.matches(selector))
            ? DOM.lift(node)
            : (null == node || Number.isNaN(node))
            ? DOM.empty()
            : (function() {
                      
            return (function(step, args) {
                          
              var args = Array.prototype.slice.call(arguments, 1);
            
              var looprecReturn$2 = step.apply(null, args);
              while ((typeof looprecReturn$2 === "function" && looprecReturn$2.__sibilispRecur__)) {
                looprecReturn$2 = looprecReturn$2();
              };
              return looprecReturn$2;
            })(function looprecStep(n) {
              return ((null == n || Number.isNaN(n))
                ? DOM.empty()
                : n.matches(selector)
                ? DOM.lift(n)
                : (function() {
                              
                const jump$2 = (function() {
                                  
                  return looprecStep(n.previousElementSibling);
                });
                return Object.defineProperties(jump$2, { "__sibilispRecur__": {
                  enumerable: true,
                  writable: false,
                  configurable: false,
                  value: true
                } });
              }).call(this));
            }, node.previousElementSibling);
          }).call(this));
        })(el.previousElementSibling);
      }
    }).call(this);
  });
});
export const getNext = (function(selector) {
    return (function(el) {
      
    return (function() {
      if (!(typeof selector === "string")) {
        return (function(node) {
                  
          return (!(node == null)
            ? DOM.lift(node)
            : DOM.empty());
        })(el.nextElementSibling);
      } else {
        return (function(node) {
                  
          return ((!(node == null) && node.matches(selector))
            ? DOM.lift(node)
            : (null == node || Number.isNaN(node))
            ? DOM.empty()
            : (function() {
                      
            return (function(step, args) {
                          
              var args = Array.prototype.slice.call(arguments, 1);
            
              var looprecReturn$3 = step.apply(null, args);
              while ((typeof looprecReturn$3 === "function" && looprecReturn$3.__sibilispRecur__)) {
                looprecReturn$3 = looprecReturn$3();
              };
              return looprecReturn$3;
            })(function looprecStep(n) {
              return ((null == n || Number.isNaN(n))
                ? DOM.empty()
                : n.matches(selector)
                ? DOM.lift(n)
                : (function() {
                              
                const jump$3 = (function() {
                                  
                  return looprecStep(n.nextElementSibling);
                });
                return Object.defineProperties(jump$3, { "__sibilispRecur__": {
                  enumerable: true,
                  writable: false,
                  configurable: false,
                  value: true
                } });
              }).call(this));
            }, node.nextElementSibling);
          }).call(this));
        })(el.nextElementSibling);
      }
    }).call(this);
  });
});
export const insertAt__BANG = (function(index, child) {
    return (function(el) {
      
    return (function(childs) {
          
      (function() {
        if (index < 1) {
          return el.insertBefore(child, el.firstElementChild);
        } else if (index >= childs.length) {
          return el.appendChild(child);
        } else {
          return (function(rchild) {
                      
            return el.insertBefore(child, rchild);
          })(childs[index]);
        }
      }).call(this);
      return el;
    })(el.children);
  });
});
export const prepend__BANG = (function(child) {
    return insertAt__BANG(0, child);
});
export const append__BANG = (function(child) {
    return insertAt__BANG(Infinity, child);
});
export const getCss = (function(props) {
    return (function(el) {
      
    return (function(miss, pmap) {
          
      props.forEach((function(prop) {
              
        return (function(value) {
                  
          return (function() {
            if (!(value == null)) {
              pmap[prop] = value;
              return matches += 1;
            } else {
              return miss.push(prop);
            }
          }).call(this);
        })(el.style[prop]);
      }));
      (function() {
        if (0 < miss.length) {
          return (function(stylemap) {
                      
            return miss.forEach((function(prop) {
                          
              return pmap[prop] = stylemap.getPropertyValue(asStylemapProperty(prop));
            }));
          })(getComputedStyle(el, null));
        }
      }).call(this);
      return pmap;
    })([], Object.create(null));
  });
});
export const setCss__BANG = (function(propValuePairs) {
    return (function(el) {
      
    propValuePairs.forEach((function(prop_value$2) {
          
      var prop = prop_value$2[0],
          value = prop_value$2[1];
    
      return el.style[prop] = value;
    }));
    return el;
  });
});
const asStylemapProperty = (function(prop) {
    return prop.replace((new RegExp("\\w\\W", "g")), (function(match) {
      
    return (match.charAt(0) + "-" + match.charAt(1).toLowerCase());
  }));
});
export const onEvent = (function(event, handler, bubbles) {
    bubbles = (typeof bubbles !== "undefined") ? bubbles : false;
  return (function(el) {
      
    el.addEventListener(event, handler, bubbles);
    return el;
  });
});
export const offEvent = (function(event, handler, bubbles) {
    bubbles = (typeof bubbles !== "undefined") ? bubbles : false;
  return (function(el) {
      
    el.removeEventListener(event, handler, bubbles);
    return el;
  });
});
export const fireEvent = (function(event, config) {
    return (function(el) {
      
    el.dispatchEvent(createEvent(event, config));
    return el;
  });
});
const createEvent = (function(etype, config) {
    return (function(ctor) {
      
    return (typeof ctor === "function"
      ? (new ctor(etype, config))
      : (new CustomEvent(etype, config)));
  })(_eventMap_[etype]);
});