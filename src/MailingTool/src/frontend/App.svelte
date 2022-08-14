<script lang="ts">
  import "./css/tailwind.pcss";
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";
  import DataPreview from "./Components/DataPreview.svelte";
  let electron = "-";
  globalThis.api.systemInfo.send("requestSystemInfo", null);
  globalThis.api.systemInfo.receive("getSystemInfo", (data) => {
    electron = data.electron;
  });
</script>

<svelte:head>
  <title>MEMENTO - Svelte, TailwindCSS, Electron and TypeScript</title>
</svelte:head>

<MainWithTitlebar>
  <section class="text-center space-y-6">
    <DataPreview />
  </section>
</MainWithTitlebar>
