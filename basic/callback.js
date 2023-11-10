const url1 = "http://ysrcoporation.co.th/file101";

function download(url, callback) {
    console.log(`downloading ${url}`);
    setTimeout(() => {
        callback();
    }, 3000);
}

function complete() {
    console.log("completed download.");
}

const action = download(url1, complete);