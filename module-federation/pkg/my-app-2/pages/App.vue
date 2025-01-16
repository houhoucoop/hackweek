<template>
  <div id="root"></div>
</template>

<script>

export default {
  name: "App",
  async mounted() {
    try {
      const remoteApp = await import('longhornUI/App');

      if (remoteApp && remoteApp.default) {
        const ReactApp = remoteApp.default;
        ReactApp(document.getElementById('root'));
      } else {
        console.error('Failed to load the React app');
      }
    } catch (error) {
      console.error('Error loading the remote React app:', error);
    }
  },
};
</script>
