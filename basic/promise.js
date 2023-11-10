// สร้าง Promise

const connection = true;
const myUrl = "http://ysrcoporation.co.th/file101";
const myUrl2 = "http://ysrcoporation.co.th/file102";

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

download(myUrl).then((result) => {
    console.log(result);
    return download(myUrl2);
}).catch((result) => {
    console.log(result);
}).then((result)=>{
    console.log(result);
}).catch((result) => {
    console.log(result);
}).finally(()=>{
    console.log("จบการดาวน์โหลด")
})

// .then() => เก็บ resolve [true]
// .catch() => เก็บ reject [false]
// .finally() => ไม่ว่าจะเกิดอะไรขึ้นจะทำงานตอนสุดท้าย

// download(myUrl).then((result)=>{
//     console.log(result);
//     return download(myUrl2);
// }).then((result)=>{
//     console.log(result);
// })