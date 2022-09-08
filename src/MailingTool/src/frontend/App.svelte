<script lang="ts">
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";
  import DataPreview from "./Components/Main.svelte";
  let electron = "-";
  globalThis.api.systemInfo.send("requestSystemInfo", null);
  globalThis.api.systemInfo.receive("getSystemInfo", (data) => {
    electron = data.electron;
  });
</script>

<svelte:head>
  <title>SpoofingTool - MailingTool</title>
</svelte:head>

<MainWithTitlebar>
  <section class="text-center space-y-6">
    <DataPreview />
  </section>
</MainWithTitlebar>
