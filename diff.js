(diff = function() {
    "use strict";
    diffTree(document.getElementById("before"), document.getElementById("after")).forEach(setColor);

    function diffTree(beforeTree, afterTree) {
        var result = [];

        var diffLeafs = function(beforeLeaf, afterLeaf) {
            var count = Math.max(beforeLeaf.children.length, afterLeaf.children.length);

            for (var i = 0; i < count; ++i) {
                var tagBefore = beforeLeaf.children[i];
                var tagAfter = afterLeaf.children[i];

                if (tagBefore === undefined) {
                    result.push({type: "added", element: tagAfter});
                }
                else if (tagAfter === undefined) {
                    result.push({type: "removed", element: tagBefore});
                }
                else if (tagBefore.tagName !== tagAfter.tagName) {
                    result.push({type: "removed", element: tagBefore});
                    result.push({type: "added", element: tagAfter});
                }
                else if (tagBefore.innerHTML !== tagAfter.innerHTML) {
                    if (tagBefore.children.length === 0) {
                        result.push({type: "changed", beforeElement: tagBefore, afterElement: tagAfter, html: tagAfter.innerHTML});
                    }
                    else {
                        diffLeafs(tagBefore, tagAfter);
                    }
                }
            }

            return result;
        };

        return diffLeafs(beforeTree, afterTree);
    }

    function setColor(tag) {
        switch (tag.type) {
            case "added":
                tag.element.classList.add("added");
                break;
            case "removed":
                tag.element.classList.add("removed");
                break;
            case "changed":
                tag.beforeElement.classList.add("changed");
                tag.afterElement.classList.add("changed");
                break;
        }
    }
})();

