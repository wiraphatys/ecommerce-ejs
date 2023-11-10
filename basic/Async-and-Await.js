// การใช้ Async & Await

// สร้าง Promise

const connection = true;
const myUrl1 = "http://ysrcoporation.co.th/file101";
const myUrl2 = "http://ysrcoporation.co.th/file102";
const myUrl3 = "http://ysrcoporation.co.th/file103";
const myUrl4 = "http://ysrcoporation.co.th/file104";
const myUrl5 = "http://ysrcoporation.co.th/file105";

function download(url){
    return new Promise((resolve, reject) => {
        console.log(`downloading data from ${url}`); 
        setTimeout(() => {
            if (connection) {
                resolve(`ดาวน์โหลด ${url} สำเร็จแล้ว`);
            } else {
                reject("เกิดข้อผิดพลาด");
        }        
        }, 3000);
     })
}

// Async & Await
async function start(){
    console.log(await download(myUrl1));
    console.log(await download(myUrl2));
    console.log(await download(myUrl3));
    console.log(await download(myUrl4));
    console.log(await download(myUrl5));
}

start();

// API ภาพสินค้า (backend) => แสดงภาพสินค้า (frontend)

// API (promise) => (pending) => รอข้อมูลมาให้ครบ (await) => (รอ)แสดงภาพ

// loading page (ระหว่างรอแสดงผล)