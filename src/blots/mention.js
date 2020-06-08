import Quill from "quill";
import Parchment from "parchment";

// const Embed = Quill.import("blots/embed");

class MentionBlot extends Parchment.inline {
  static create(data) {
    const node = super.create();
    const denotationChar = document.createElement("span");
    denotationChar.className = "ql-mention-denotation-char";
    denotationChar.innerHTML = data.denotationChar;
    node.appendChild(denotationChar);
    node.innerHTML += data.value;
    node.classList.add("mention");

    if ("type" in data) {
      node.classList.add("mention-" + data.type);
    }

    var tagClickEvent = new CustomEvent("tagClick", {
      detail: {
        node: node,
        data: data
      }
    });
    node.addEventListener("click", function (e) {
      document.dispatchEvent(tagClickEvent);
    });

    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach(key => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }

  static formats(domNode) {
    return domNode.dataset || true;
  }

  format(name, value) {
    if (name === "mention" && value) {
      const keys = Object.keys(value);
      keys.forEach(k => {
        this.domNode.dataset[k] = value[k];
      });
    } else {
      super.format(name, value);
    }
  }

  formats() {
    let formats = super.formats();
    formats["mention"] = MentionBlot.formats(this.domNode);
    return formats;
  }
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
// MentionBlot.className = "mention";

Quill.register(MentionBlot);
Parchment.register(MentionBlot);
