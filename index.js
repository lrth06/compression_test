const fs = require("fs");

const file = `cp.html`;

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  recurse(data);
});

function recurse(str) {
  console.time("Conversion to Binary");

  console.log(`Test Started at `, Date());
  try {
    const binaryArr = [];
    const arr = str.split("");
    console.log("Input String :", "|", str.length, "|");
    arr.forEach((char) => {
      const binary = char.charCodeAt().toString(2);
      binaryArr.push(binary);
    });
    const binaryString = binaryArr.join("");

    console.log("Binary String:", "|", binaryString.length, "|");
    console.timeEnd("Conversion to Binary");

    let tempArr = binaryString.split("");
    let letters = [];
    let count = 1;
    console.time("Compression Time");

    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === tempArr[i + 1]) {
        count++;
      } else {
        if (tempArr[i] == 0) {
          char = "a";
        } else {
          char = "b";
        }
        let value = `${char}${count}`;
        letters = [...letters, value];
        count = 1;
      }
    }
    const final = letters.join("");
    console.log("Compressed String:", "|", final.length, "|");
    console.timeEnd("Compression Time");
    fs.writeFile("output.txt", final, function (err) {
      if (err) throw err;
    });
    return final;
  } catch (e) {
    console.log(e);
  }
}
