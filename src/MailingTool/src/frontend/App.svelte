<script lang="ts">
  import "./css/tailwind.pcss";
  import MainWithTitlebar from "./Components/MainWithTitlebar.svelte";
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
    <div><span>送信元</span> kajidog@icraft.jp</div>
    <div><span>送信先</span>kajiwara.k@icraft.jp</div>
    <div><span>プレビュー</span></div>
    Electron
  <span class="version" data-testid="version-number-electron">{electron}</span>.
  </section>
</MainWithTitlebar>

