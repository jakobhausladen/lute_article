let networkData = {};

function loadNetworkPlot(network) {
  const data = networkData[network];
  if (data) {
    const networkDiv = document.getElementById("network");
    Plotly.newPlot(networkDiv, data.data, data.layout);
  } else {
    console.error("Plot data not found for network:", network);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const networks = [
    "network_graph_nationality",
    "network_graph_date",
    "network_graph_community",
  ];
  networks.forEach((network) => {
    fetch(`plots/${network}.json`)
      .then((response) => response.json())
      .then((data) => {
        networkData[network] = data;
      })
      .catch((error) => {
        console.error("Error fetching plot data for", network, ":", error);
      });
  });
});
