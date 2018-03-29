module.exports = (Photos, Overview, Recommendations) => `
  <div id="container">
    <div id="Photos">${Photos}</div>
    <div id="middle">
      <div id="Overview">${Overview}</div>
      <div id="Sidebar"></div>
    </div>
    <div id="recommendations-app">
      <div id="Recommendations">${Recommendations}</div>
    </div>
  </div>
  `;
  
  // <div id="Overview">${Overview}</div>
  // <div id="Sidebar">${Sidebar}</div>
