<script lang="ts">
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";
  import DataPreview from "./Components/Main.svelte";
</script>

<svelte:head>
  <title>SpoofingTool - MailingTool</title>
</svelte:head>

<MainWithTitlebar>
  <section class="text-center space-y-6">
    <DataPreview />
  </section>
</MainWithTitlebar>
