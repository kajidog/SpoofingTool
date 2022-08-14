// Blobを文字に変換する関数
export function readFileAsText(file: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error);
        reader.onload = () => resolve((reader.result as string) || '');
        reader.readAsText(file);
    });
}

// 文字を２次元配列に変換
export function mapCSVToArray(csv: string): string[][] {
    return csv.split('\n').map((row) => row.replace("\r6", "").split(','));
}


// ２次元配列のCSVデータをTableデータに変更する
export function createTableData(csvData: string[][]) {
    const columns = csvData.shift().map((raw) => {
        return ({
            key: raw,
            title: raw,
            value: (v) => v[raw],
            sortable: true,
        })
    })
    csvData.pop()
    const rows = csvData.map((rows) => {
        let data: any = {}
        rows.forEach((row, index) => {
            data[columns[index].key] = row
        })
        return data
    })
    return {
        columns, rows
    }
}