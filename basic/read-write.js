const myModule = require('../modules/myModule.js');

console.log(myModule.getCurrentTime());
console.log(myModule.addition(10, 5));

// call module
const fs = require('fs');

// blocking
// dataSync = fs.readFileSync('files/input.txt', 'utf-8');
// console.log(dataSync);

// const outputText = `hello Node.js\n ${dataSync}\n ไฟล์ถูกเขียนเมื่อ ${new Date()}`;
// fs.writeFileSync("files/output.txt", outputText);
// console.log("เขียนไฟล์เรียบร้อยแล้ว")

// non-blocking
fs.readFile('files/input.txt', 'utf-8',(err,data)=>{
    if(err) return console.log("เกิดข้อผิดพลาด", err)
    const outputText = `hello Node.js\n${data}\nไฟล์นี้ถูกเขียนเมื่อ${new Date()} `
    fs.writeFile("files/output.txt", outputText, err=>{
        if(err) return console.log("เกิดข้อผิดพลาด", err)
        console.log('เขียนไฟล์เรียบร้อยแล้ว');
    });
});