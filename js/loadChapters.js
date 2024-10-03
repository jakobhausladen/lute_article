document.addEventListener("DOMContentLoaded", () => {
  // Fetch and insert the HTML for a chapter element
  function loadChapter(element) {
    const chapterNumber = element.getAttribute("data-chapter");
    fetch(`chapters/chapter${chapterNumber}.html`)
      .then((response) => response.text())
      .then((data) => {
        element.innerHTML = data;
        loadPlots(element);
      });
  }

  // Fetch JSON data for all plot elements in the container and initialize Plotly charts
  function loadPlots(container) {
    const plots = container.querySelectorAll(".plot");
    plots.forEach((plot) => {
      const fileName = plot.getAttribute("data-plot-url");
      fetch(`plots/${fileName}`)
        .then((response) => response.json())
        .then((plotData) => {
          if (fileName == "bubble_map.json") {
            Plotly.newPlot(plot, plotData);
          } else {
            const data = plotData["data"];
            const layout = plotData["layout"];
            const config = { displayModeBar: false };
            Plotly.newPlot(plot, data, layout, config);
          }
        });
    });
  }

  function generateWordCloud(file) {
    fetch(`plots/${file}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((words) => {
        $("#word-cloud").empty();
        // generate new word cloud
        $("#word-cloud").jQCloud(words, {
          width: 650,
          height: 450,
        });
      })
      .catch((error) => {
        console.error("Error loading wordsEn data:", error);
      });
  }

  // Plot wordcloud
  function initWordcloud(container) {
    const wordcloudDiv = container.querySelectorAll("#word-cloud");
    if (wordcloudDiv) {
      generateWordCloud('wordsEn.json');
    }
  }

  // Instantiate IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadChapter(entry.target);
          initWordcloud(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 100px 0px" }
  );

  // Add chapters to the IntersectionObserver
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    observer.observe(chapter);
  });
});
