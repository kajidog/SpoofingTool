<script lang="ts">
  import SvelteTable from "svelte-table";
  import { createTableData, mapCSVToArray } from "../utils/csv";
  import { replaceCSV_Text } from "../utils/text";
  import MailBodyPreview from "./MailBodyPreview.svelte";
  import Progress from "./Progress.svelte";
  let table = {
    rows: [],
    columns: [] as any,
  };
  let mailTo = undefined;
  let serverURL = undefined;
  let bodyText = undefined;
  let subject = undefined;
  let filepath = undefined;
  let progressFlg = false;

  const MAIL_ADDRESS_COL = "メールアドレス";

  // 設定再読み込み
  async function ReloadData() {
    globalThis.api.storeInfo.send("requestConfig");
  }

  // CSV選択画面を起動
  async function ImportData() {
    globalThis.api.storeInfo.send("selectConfig", null);
  }

  // 設定を保存
  async function SaveData() {
    globalThis.api.storeInfo.send("saveConfig", {
      mailTo,
      serverURL,
      bodyText,
      subject,
    });
  }

  // 設定読み込みリクエスト
  globalThis.api.storeInfo.send("requestConfig");

  // 設定受信
  globalThis.api.storeInfo.receive("getConfig", async (data) => {
    // 取得したデータを2次元配列にして、Table用の変数に成形
    if (data.csv) {
      const parse = createTableData(mapCSVToArray(data.csv));
      // 設定が登録されていない場合
      if (!parse) {
        // ファイル選択画面を表示
        globalThis.api.storeInfo.send("selectConfig", null);
        return;
      }

      // Tableを表示用の変数にぶち込み
      table = parse;
    }

    mailTo = data.mailTo || mailTo;
    serverURL = data.server || serverURL || "";
    bodyText = data.bodyText || bodyText || "";
    subject = data.subject || subject || "";
    filepath = data.filepath || filepath || "";
  });

  async function sendMail() {
    progressFlg = true;
    return;
  }

  function close() {
    progressFlg = false;
  }
</script>

<div>
  <button on:click={SaveData}>設定保存</button>
  <button on:click={ReloadData}>リロード</button>

  <div class="mail-block">
    <h2>メール</h2>
    <div><span>送信元</span> <input type="text" bind:value={mailTo} /></div>
    <div>
      <span>件名</span> <input type="text" bind:value={subject} />
    </div>
    <div>
      <span>本文</span>
      <textarea name="" id="" cols="30" rows="10" bind:value={bodyText} />
    </div>
    <MailBodyPreview rows={table.rows} config={table.columns} text={bodyText} />
  </div>
  <div>
    <h2>データソース</h2>
    <div>{filepath || ""}</div>
    <button on:click={ImportData}>ファイル選択</button>
    <div class="table">
      <SvelteTable columns={table.columns} rows={table.rows} />
    </div>
  </div>
  {#if progressFlg}
    <Progress {table} {mailTo} {subject} {bodyText} {close} />
  {/if}
  <button on:click={sendMail}>メール送信</button>
</div>

<style>
  button {
    padding: 0.3rem 0.5rem;
    margin: 0.5rem;
    border-radius: 0.75rem;
    transition: 0.2s;
    border: 1px solid #ddd;
  }
  button:hover {
    background-color: rgb(140, 199, 199);
    color: #fff;
    cursor: pointer;
  }
  textarea,
  input {
    max-width: 1000px;
    width: 90%;
    padding: 0.5rem;
    border-radius: 0.35rem;
  }
  textarea {
    height: 500px;
  }
  .table {
    border-color: #eee;
  }
  .mail-block > div {
    display: flex;
  }
  .mail-block > div > span {
    padding: 0.5rem;
    flex-basis: 5rem;
    text-align: center;
  }
</style>
