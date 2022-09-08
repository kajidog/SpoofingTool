<script lang="ts">
  import { replaceCSV_Text } from "../utils/text";

  export let config: any;
  export let rows: any;
  export let text: any;

  let rowIndex = 0;

  $: preview = replaceCSV_Text(text, rows[rowIndex], config);

  function rowIndexUp() {
    if (rows.length - 1 > rowIndex) {
      rowIndex += 1;
    }
  }
  function rowIndexDown() {
    if (rowIndex > 0) {
      rowIndex -= 1;
    }
  }
</script>

<div class="preview">
  <span
    >PV<br /><button on:click={rowIndexDown}>前</button><button
      on:click={rowIndexUp}>次</button
    ></span
  >
  <div>
    {preview}
  </div>
</div>

<style lang="css">
  .preview {
    display: flex;
  }
  .preview > div {
    display: flex;
    flex-direction: column;
  }
  .preview > div {
    border: 1px solid #ddd;
    word-wrap: break-word;
    white-space: pre-line;
    max-width: 1000px;
    width: 90%;
    padding: 0.5rem;
    border-radius: 0.35rem;
  }
  span {
    padding: 0.5rem;
    flex-basis: 5rem;
    text-align: center;
  }
</style>
