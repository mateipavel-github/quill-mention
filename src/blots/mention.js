import Quill from "quill";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    const denotationChar = document.createElement("tag");
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
    node.addEventListener("click", function () {
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
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "tag";
// MentionBlot.className = "mention";

Quill.register(MentionBlot);
