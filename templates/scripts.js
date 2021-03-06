module.exports = (items, id) => `
  <script src="/lib/react.development.js"></script>
  <script src="/lib/react-dom.development.js"></script>

  ${items.map(item => `<script src="/microservices/${item}.js"></script>`).join('\n')}

  <script>
    ${items.map(item => `ReactDOM.hydrate(
        React.createElement(${item}, { id: ${id} }),
        document.getElementById('${item}')
      );`).join('\n')}
  </script>
`;
