<script lang="ts">

  let outerW = globalThis.outerWidth - 8;
</script>

<svelte:window bind:outerWidth={outerW} />

<main>
  <div class="page">
    <slot />
  </div>
</main>

<style lang="postcss">
  main {
    @apply w-full;
    --background-color: theme("colors.gray.50");
    --text-color: theme("colors.red.900");
  }
  .page {
    height: 100%;
  }

  .page::-webkit-scrollbar {
    @apply w-4;
  }

  .page::-webkit-scrollbar-track {
    @apply border-2 border-solid;
    background-color: var(--background-color);
    border-color: var(--text-color);
  }
  .page::-webkit-scrollbar-thumb {
    background-color: var(--text-color);
  }
</style>
