<script lang="ts">
  import { replaceCSV_Text } from "../utils/text";

  export let config: any;
  export let row: any;
  export let text: any;
  $: preview = replaceCSV_Text(text, row, config);
</script>

<div>
  <h2>プレビュー</h2>
  <div>
    {preview}
  </div>
</div>

<style lang="postcss">
</style>
