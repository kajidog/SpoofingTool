<script lang="ts">
  export let state: number;
</script>

<div class={"square square_" + state} />

<style lang="css">
  div.square {
    display: inline-block;
    color: red;
    width: 10px;
    height: 10px;
  }
  .square_0 {
    background-color: grey;
  }
  .square_1 {
    background-color: green;
  }
  .square_2 {
    background-color: blue;
  }
  .square_3 {
    background-color: red;
  }
</style>
