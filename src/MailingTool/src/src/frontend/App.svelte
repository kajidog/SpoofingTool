<script lang="ts">
  import "./css/tailwind.pcss";
  import Version from "./Components/Version.svelte";
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";

  export let name: string;
</script>

<svelte:head>
  <title>SpoofingTool - MailingTool</title>
</svelte:head>

<MainWithTitlebar title="SpoofingTool - MailingTool">
  <section class="text-center space-y-6">
    <Version />
  </section>
</MainWithTitlebar>

