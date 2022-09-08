<script lang="ts">
  // メイン画面

  import SvelteTable from "svelte-table";
  import { createTableData, mapCSVToArray } from "../utils/csv";
  import MailBodyPreview from "./MailBodyPreview.svelte";
  import Progress from "./Progress.svelte";
  let table = {
    rows: [], // テーブルのデータ（行）
    columns: [] as any, // テーブルの設定（列）
  }; // csvデータ
  let mailTo = undefined; // メール送信元
  let bodyText = undefined; // メール本文
  let subject = undefined; // メールの件名
  let filepath = undefined; // CSVのファイルのパス
  let url = undefined; // アクセスログを取得するサーバー
  let eventname = undefined; // 取得するアクセスログの種類
  let progressFlg = false; // Trueでメールを送信
  let log = undefined; // アクセスログ

  // 設定再読み込み
  function ReloadData() {
    globalThis.api.storeInfo.send("requestConfig", null);
  }

  // CSV選択画面を起動
  function ImportData() {
    globalThis.api.storeInfo.send("selectConfig", null);
  }

  // 設定を保存
  function SaveData() {
    globalThis.api.storeInfo.send("saveConfig", {
      mailTo,
      bodyText,
      subject,
      url,
      eventname,
    });
  }

  // 設定読み込みリクエスト
  globalThis.api.storeInfo.send("requestConfig");

  // 設定受信
  globalThis.api.storeInfo.receive("getConfig", (data) => {
    if (data.csv && data.filepath) {
      // Tableを表示用の変数にぶち込み
      table = createTableData(mapCSVToArray(data.csv));
    }

    mailTo = data.mailTo || mailTo || "";
    bodyText = data.bodyText || bodyText || "";
    subject = data.subject || subject || "";
    filepath = data.filepath || filepath || "";
    url = data.url || url || "";
    eventname = data.eventname || eventname || "";
    log = data.log || log || "";
  });

  async function sendMail() {
    progressFlg = true;
    return;
  }

  function close() {
    progressFlg = false;
  }
</script>

<div class="main">
  <div class="paper head">
    <h1>MailingTool</h1>
    <button on:click={SaveData}>設定保存</button>
    <button on:click={ReloadData}>リロード</button>
    <button on:click={sendMail}>メール送信</button>
  </div>

  <div class="mail-block paper">
    <h2>メール</h2>
    <div>
      <span>送信元</span>
      <input type="text" bind:value={mailTo} />
    </div>
    <div>
      <span>件名</span>
      <input type="text" bind:value={subject} />
    </div>
    <div>
      <span>本文</span>
      <textarea bind:value={bodyText} />
    </div>
    <MailBodyPreview rows={table.rows} config={table.columns} text={bodyText} />
  </div>

  <div class="paper">
    <h2>データソース</h2>
    <div>{filepath}</div>
    <button on:click={ImportData}>ファイル選択</button>
    <div class="table">
      <SvelteTable columns={table.columns} rows={table.rows} />
    </div>
  </div>

  {#if progressFlg}
    <Progress {table} {mailTo} {subject} {bodyText} {close} />
  {/if}

  <div class="mail-block paper">
    <h2>spoofing_website</h2>

    <div>
      <span>URL</span>
      <input type="text" bind:value={url} placeholder="http://localhost:3000" />
    </div>

    <div>
      <span>イベント名</span> <input type="text" bind:value={eventname} />
    </div>

    <div class="preview">
      <span>アクセスログ</span>
      <div>
        {log}
      </div>
    </div>

    <button on:click={SaveData}>設定保存</button>
    <button on:click={ReloadData}>リロード</button>
  </div>
</div>

<style>
  h1 {
    padding: 1.5rem 0.5rem;
    display: block;
    font-size: 1.75rem;
    margin: 0;
  }
  button {
    padding: 0.3rem 0.5rem;
    margin: 0.5rem;
    border-radius: 0.75rem;
    transition: 0.2s;
    border: 1px solid #dedede;
    background-color: #fff;
  }
  button:hover {
    background-color: rgb(167, 216, 216);
    color: #fff;
    cursor: pointer;
  }
  textarea,
  input {
    max-width: 1000px;
    width: 85%;
    padding: 0.5rem;
    border-radius: 0.35rem;
  }
  textarea {
    height: 500px;
  }
  .table {
    border-color: #eee;
  }

  .paper {
    width: 85%;
    max-width: 1000px;
    background-color: rgba(255, 255, 255, 0.767);
    border-radius: 0.5rem;
    box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.089);
    padding: 0.75rem 1.5rem;
    margin: 1.5rem auto 0;
  }
  .mail-block > div {
    display: flex;
  }
  .mail-block > div > span {
    padding: 0.5rem;
    flex-basis: 5rem;
    text-align: center;
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
    width: 85%;
    padding: 0.5rem;
    border-radius: 0.35rem;
    background-color: #fff;
  }
  .main {
    background: #0a263a;
    padding: 1rem;
    margin: 0;
  }
</style>
