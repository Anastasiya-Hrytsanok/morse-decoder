const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
};

const splitToParts = (stringToSplit, partLength) => {
  let pattern = `.{1,${partLength}}`;
  let regex = new RegExp(pattern, "g");
  return stringToSplit.match(regex);
};

function decode(expr) {
  let numberArr = splitToParts(expr, 10).map((el) =>
    el === "**********" ? el : splitToParts(Number(el).toString(), 2)
  );

  return numberArr
    .map((el) => {
      if (Array.isArray(el)) {
        let morseCode = el.map((num) => (num === "10" ? "." : "-")).join("");
        let convertedValue = MORSE_TABLE[morseCode];
        if (!convertedValue) {
          throw new Error(`Unable to parse from morse code '${morseCode}'`);
        }

        return convertedValue;
      }
      return " ";
    })
    .join("");
}

module.exports = {
  decode,
};
