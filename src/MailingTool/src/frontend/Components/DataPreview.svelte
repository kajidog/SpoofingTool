<script lang="ts">
  import SvelteTable from "svelte-table";
  import { createTableData, mapCSVToArray } from "../utils/csv";
  import { replaceCSV_Text } from "../utils/text";
  let table = {
    rows: [],
    columns: [] as any,
  };

  let mailTo = undefined;
  let serverURL = undefined;
  let bodyText = undefined;
  let subject = undefined;
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
    const parse = createTableData(mapCSVToArray(data.csv));
    mailTo = data.mailTo || "";
    serverURL = data.server || "";
    bodyText = data.bodyText || "";
    subject = data.subject || "";

    // 設定が登録されていない場合
    if (!parse) {
      // ファイル選択画面を表示
      globalThis.api.storeInfo.send("selectConfig", null);
      return;
    }

    // Tableを表示用の変数にぶち込み
    table = parse;
  });

  function sendMail() {
    table.rows.forEach((row) => {
      globalThis.api.mailControls.send("sendMail", {
        to: row[MAIL_ADDRESS_COL],
        from: mailTo,
        text: replaceCSV_Text(bodyText, row, table.columns),
        subject,
      });
    });
  }
</script>

<div>
  <button on:click={SaveData}>設定保存</button>

  <div>
    <h2>送信元</h2>
    <div><span /> <input type="text" bind:value={mailTo} /></div>
  </div>
  <div>
    <h2>メール</h2>
    <div>
      <span>件名</span><br /><input type="text" bind:value={subject} />
    </div>
    <div>
      <span>本文</span><br />
      <textarea name="" id="" cols="30" rows="10" bind:value={bodyText} />
    </div>
  </div>
  <div>
    <h2>ソース</h2>
    <button on:click={ImportData}>ファイル選択</button>
    <button on:click={ReloadData}>リロード</button>
    <SvelteTable columns={table.columns} rows={table.rows} />
  </div>
  <button on:click={sendMail}>メール送信</button>
</div>

<style>
  button {
    padding: 0.3rem 0.5rem;
    margin: 0.5rem;
    box-shadow: 0px 1px 2px 1px #c9c9c9c0;
    border-radius: 0.75rem;
    transition: 0.2s;
  }
  button:hover {
    background-color: rgb(3, 51, 51);
    color: #fff;
  }
</style>
