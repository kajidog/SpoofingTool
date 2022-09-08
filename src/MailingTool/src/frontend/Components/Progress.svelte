<script lang="ts">
  import { onMount } from "svelte";
  import { replaceCSV_Text } from "../utils/text";
  import Square from "./Square.svelte";

  const MAIL_ADDRESS_COL = "メールアドレス";
  export let table: any;
  export let mailTo: any;
  export let bodyText: any;
  export let subject: any;
  export let close: () => void;
  let finFlg = false;
  let cancelFlg = false;
  let states = [];
  let codes = {
    "-1": "不明",
    0: "waiting",
    1: "sending...",
    2: "Success!",
    3: "Failed",
  };
  onMount(async () => {
    initState();
    sendMail(0);
  });

  // メールの送信結果をリッスン
  globalThis.api.mailControls.receive("progress", (data) => {
    // 結果格納
    states[data.index] = {
      ...states[data.index],
      state: data.state || -1,
    };

    // 終了判定
    if (data.index >= table.rows.length - 1) {
      finFlg = true;
      return;
    }

    // cancelされていない場合、次を実行
    !cancelFlg && sendMail(data.index + 1);
  });

  // 初期化
  function initState() {
    table.rows.forEach((mailAddress) => {
      states = [
        ...states,
        {
          state: 0,
          label: mailAddress[MAIL_ADDRESS_COL],
        },
      ];
    });
  }

  // メール送信
  function sendMail(index) {
    states[index] = {
      ...states[index],
      state: 1,
    };
    const row = table.rows[index];
    globalThis.api.mailControls.send("sendMail", {
      to: row[MAIL_ADDRESS_COL],
      from: mailTo,
      text: replaceCSV_Text(bodyText, row, table.columns),
      subject,
      index,
    });
  }

  function cancel() {
    finFlg = true;
    cancelFlg = true;
  }
</script>

<div class="wrap_progress">
  <div class="progress">
    <p>実行結果</p>
    <div>
      {#each states as row}
        <div><Square state={row.state} /> {row.label} : {codes[row.state]}</div>
      {/each}
    </div>
    {#if finFlg}
      <button on:click={close}>close</button>
    {/if}
    {#if !finFlg}
      <button on:click={cancel}>cancel</button>
    {/if}
  </div>
</div>

<style lang="css">
  P {
    margin: 0;
    font-weight: bold;
  }

  .wrap_progress {
    background-color: rgba(68, 68, 68, 0.205);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .progress {
    padding: 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    -ms-overflow-style: none;
  }
  .progress > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 600px;
    max-height: 500px;
    padding: 1rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .progress > div::-webkit-scrollbar {
    display: none;
  }
</style>
