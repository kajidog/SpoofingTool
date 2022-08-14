export const replaceCSV_Text = (text: string, row: any, columns: any) => {
    let mailText = text
    columns.forEach(column => {
        mailText = mailText.replace(`<#${column.key}>`, row[column.key])
    })
    return mailText
}