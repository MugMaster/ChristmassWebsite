var printOut = true;
var fastOut = false;

const timer = setInterval(function () {
  shiftColour(getComputedStyle(document.getElementById("ttl")));
}, 1);

let rDir = 1;
let bDir = 1;

function shiftColour(label) {
  const MAX_VALUE = 255;
  const MIN_VALUE = 80;
  const MOD_VALUE = 3;

  // Ensure label is not null or undefined
  if (label == null) {
    print("err: label is null");
    return;
  }

  // Get the current background color
  let currentColour = label.backgroundColor;

  // If background color is not set (could happen if there's no background-color rule)
  if (!currentColour) {
    print("err: label bg is null or not set");
    return;
  }

  // Parse the current RGB values
  let rgbValues = currentColour.match(/\d+/g);  // Extract digits (r, g, b)

  if (rgbValues.length >= 3) {
    let [r, g, b] = rgbValues.map(Number);

    // Modifiy the RGB values to create a color shift
    r = (r + random(MOD_VALUE) * rDir);
    b = (b + random(MOD_VALUE) * bDir);

    // If a componet is out of range reverse direction and re-asing the value
    if (r > MAX_VALUE || r < MIN_VALUE) {
      rDir = rDir * - 1;
      r = (r + random(5) * rDir);
    }
    if (b > MAX_VALUE || b < MIN_VALUE) {
      bDir = bDir * - 1;
      b = (b + random(5) * bDir);
    }

    // Create the new color string
    let newColour = `rgb(${r}, ${g}, ${b})`;

    printFast(newColour);

    // Change the actual element's background color
    document.getElementById("ttl").style.backgroundColor = newColour;
  } else {
    print("err: invalid background color format");
  }
}

// Util functions

function print(output) {
  if (printOut == true) console.log(output);
}

function printFast(output) {
  if (fastOut == true) console.log(output);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function random(number) {
  return Math.floor(Math.random() * number)
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}