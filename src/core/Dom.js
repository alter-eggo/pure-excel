class Dom {
  constructor(selector) {
    // #app
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === "string") {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html("");
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  removeListener(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node.$el);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((item) => {
      this.$el.style[item] = styles[item];
    });
  }

  get data() {
    return this.$el.dataset;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }
}

// event.target
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};