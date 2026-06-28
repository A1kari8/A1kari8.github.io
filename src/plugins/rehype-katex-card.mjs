function findAnnotationText(node) {
  if (!node || node.type !== "element") return "";
  if (
    node.tagName === "annotation" &&
    node.properties?.encoding === "application/x-tex"
  ) {
    const textNode = node.children?.[0];
    if (textNode?.type === "text" || textNode?.type === "raw") {
      return textNode.value;
    }
    return "";
  }
  for (const child of node.children || []) {
    const result = findAnnotationText(child);
    if (result) return result;
  }
  return "";
}

function el(tagName, properties, children) {
  return { type: "element", tagName, properties: properties || {}, children: children || [] };
}

function copyIcon(d, cls) {
  return el("svg", {
    viewBox: "0 -960 960 960",
    xmlns: "http://www.w3.org/2000/svg",
    class: cls,
  }, [el("path", { d }, [])]);
}

export default function rehypeKatexCard() {
  return (tree) => {
    if (!tree?.children) return;
    for (let i = tree.children.length - 1; i >= 0; i--) {
      walk(tree.children[i]);
    }
  };
}

function walk(node) {
  if (node?.type !== "element" || !node.children) return;
  for (let i = node.children.length - 1; i >= 0; i--) {
    const child = node.children[i];
    if (
      child.type === "element" &&
      child.properties?.className?.includes("katex-display")
    ) {
      const latex = findAnnotationText(child);

      const copyBtn = el("button", {
        class: "katex-copy-btn",
        "aria-label": "Copy LaTeX source",
        "data-latex": latex,
      }, [
        el("div", { class: "katex-copy-icon" }, [
          copyIcon(
            "M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z",
            "katex-copy-svg",
          ),
          copyIcon(
            "m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z",
            "katex-check-svg",
          ),
        ]),
      ]);

      const container = el("div", {
        class: "katex-display-container",
        "data-language": "LaTeX",
      }, [child, copyBtn]);

      const card = el("figure", { class: "katex-card" }, [container]);
      node.children[i] = card;
    } else {
      walk(child);
    }
  }
}
