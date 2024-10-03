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
