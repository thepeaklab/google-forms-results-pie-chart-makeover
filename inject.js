const colorsMap = {
  "#3366cc": "#3ADE70",
  "#dc3912": "#50DEDE",
  "#ff9900": "#5B96E9",
  "#109618": "#A753E2",
  "#990099": "#F38446",
  "#0099c6": "#F04C4C",
};

function replaceColorsInNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node instanceof SVGElement && node.getAttribute("fill")) {
      let oldColor = node.getAttribute("fill");
      if (oldColor in colorsMap) {
        node.style.transition = "fill 1s";
        node.setAttribute("fill", colorsMap[oldColor]);
      }
    }
    for (let i = 0; i < node.children.length; i++) {
      replaceColorsInNode(node.children[i]);
    }
  }
}

// Create an observer instance linked to the callback function
let observer = new MutationObserver(function (mutationsList, observer) {
  // Loop through all mutations that just occured
  for (let mutation of mutationsList) {
    // If the mutation added nodes, loop through them and replace colors
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        replaceColorsInNode(mutation.addedNodes[i]);
      }
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

replaceColorsInNode(document.body);
