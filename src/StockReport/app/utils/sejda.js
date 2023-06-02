import { saveAs } from "file-saver"
export const downloadPdf = () => {
    
    let options = {
        url: `https://1b94a2aea8c4.internetofapp.com${window.location.pathname}`,
        // url: window.location.href,
        viewportWidth: 1440,
        usePrintMedia: true,
        pageSize: 'a4',
        mode: 'no-cors',
        pageMargin: 0 
    }
    fetch("https://api.sejda.com/v2/html-pdf", {
        body: JSON.stringify(options),
        headers: {
            "Authorization": "Token: api_public_6d25ce275c9740699c66784aa4022b7a",
            "Content-Type": "application/json"
        },
        method: "POST",
        responseType : "arraybuffer"
    }).then(response => {
        return response.arrayBuffer()
    }).then(res => {
        var blob = new Blob([res], {type: "text/pdf"});
        saveAs(blob, "report.pdf");
    }).catch(err => {
        console.log('err', err)
    })
}