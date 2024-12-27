<template>
  <div id="react-container"></div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ReactComponentWrapper',
  mounted() {
    this.loadReactComponent();
  },
  methods: {
    async loadReactComponent() {
      try {
        const searchGroupProps = {
          size: 'large',
          select: true,
          selectOptions: [{ value: 'name', name: 'Name' }, { value: 'image', name: 'image' }],
          selectProps: {
            defaultValue: 'name',
          },
        }
        const chartProps = {
          title: 5,
          subTitle: "Volumes",
          colors: ["#27AE5F", "#F1C40F", "#78C9CF", "#F15354", "#dee1e3"],
          data: [
            { key: "healthy", name: "Healthy", value: 3 },
            { key: "degraded", name: "Degraded", value: 1 },
            { key: "inProgress", name: "In Progress", value: 0 },
            { key: "faulted", name: "Faulted", value: 0 },
            { key: "detached", name: "Detached", value: 1 }
          ],
          loading: false,
          clickable: true,
          empty: "No Volume",
          activeIndex: -1,
          width: 263
        };
        const detailProps = {
          data: [
            {
              key: "healthy",
              name: "Healthy",
              value: 3,
              color: "#27AE5F"
            },
            {
              key: "degraded",
              name: "Degraded",
              value: 1,
              color: "#F1C40F"
            },
            {
              key: "inProgress",
              name: "In Progress",
              value: 0,
              color: "#78C9CF"
            },
            {
              key: "faulted",
              name: "Fault",
              value: 0,
              color: "#F15354"
            },
            {
              key: "detached",
              name: "Detached",
              value: 0,
              color: "#dee1e3"
            }
          ],
          total: {
            name: "Total",
            value: 4
          },
          clickable: true,
          width: 263
        }

        const { Search } = await import('longhornUI/Components');
        const { ResourceChart, ResourceDetail } = await import('longhornUI/DashboardComponents');

        const container = document.getElementById('react-container');
        if (container) {
          const React = await import('react');
          const ReactDOM = await import('react-dom');

          ReactDOM.render(
            <div>
              <Search {...searchGroupProps} />
              <ResourceChart {...chartProps} />
              <ResourceDetail {...detailProps} />
            </div>
          , container);
        } else {
          console.error('React container element not found');
        }
      } catch (error) {
        console.error('Error loading React component:', error);
      }
    }
  }
};
</script>
