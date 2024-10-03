document.addEventListener("DOMContentLoaded", () => {
  // Get all the elements with class 'play-button-container'
  var elements = document.querySelectorAll(".play-button-container");
  var stickyElement = document.getElementById("button_1");
  var offsetMargin = 600;

  // Calculate the offset for switching sticky elements
  var offsets = Array.from(elements).map((element) => {
    return element.offsetTop;
  });

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    var scrollPosition = window.scrollY;

    // Find the index of the current sticky element
    var currentElementIndex = offsets.findIndex(function (offset, index) {
      var nextOffset = offsets[index + 1] || Infinity;
      return (
        scrollPosition + offsetMargin >= offset &&
        scrollPosition + offsetMargin < nextOffset
      );
    });

    // Set correct element as sticky
    if (currentElementIndex >= 0) {
      stickyElement.classList.remove("sticky");
      stickyElement = elements[currentElementIndex];
      stickyElement.classList.add("sticky");
    }
  });
});
