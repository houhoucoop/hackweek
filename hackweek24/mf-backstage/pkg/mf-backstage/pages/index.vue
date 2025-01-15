<template>
  <div id="react-root"></div>
</template>

<script>
export default {
  name: "App",
  async mounted() {
    try {
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');

      const { default: ReactApp } = await import('backstageApp/App');

      ReactDOM.createRoot(document.getElementById("react-root")).render(React.createElement(ReactApp));
    } catch (error) {
      console.error('Error loading the React component:', error);
    }
  },
};
</script>
