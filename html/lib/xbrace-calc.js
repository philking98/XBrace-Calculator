

function drawXBrace() {

	const canvas = document.getElementById("xbrace-diagram");
	const ctx = canvas.getContext("2d");

	const clientRect = canvas.getBoundingClientRect();
	const padding = clientRect.height * 0.05;

	const boundingWidth = clientRect.width - (2 * padding);
	const boundingHeight = clientRect.height - (2 * padding);
//	const boundingLeft = padding;
//	const boundingTop = padding;

	const numBraces = parseFloat(document.getElementById("number-xbraces").value);
	let braceRise = parseFloat(document.getElementById("xbrace-rise").value);

	// calculate scale to fit bay into canvas
	let bayWidth = parseInches(document.getElementById("bay-width").value);
	let bayHeight = parseInches(document.getElementById("bay-height").value);

	const scale = Math.min((boundingWidth / bayWidth), (boundingHeight / bayHeight));

	bayWidth *= scale;
	bayHeight *= scale;
	braceRise *= scale;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const bayLeft = padding + ((boundingWidth - bayWidth) / 2);
	const bayTop = padding + ((boundingHeight - bayHeight) / 2);

	ctx.fillStyle = "tan";
	ctx.strokeStyle = 'brown';

	let boxLeft = bayLeft;
	let boxTop = bayTop;
	let boxWidth = bayWidth;
	let boxHeight = bayHeight / numBraces;
	for (let nBrace = 0; nBrace < numBraces; nBrace++) {

		ctx.beginPath();
		ctx.moveTo(boxLeft, boxTop);
		ctx.lineTo(boxLeft + bayWidth, boxTop + braceRise);
		ctx.lineTo(boxLeft + bayWidth, boxTop + boxHeight);
		ctx.lineTo(boxLeft, boxTop + boxHeight - braceRise);
		ctx.lineTo(boxLeft, boxTop);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(boxLeft + bayWidth, boxTop);
		ctx.lineTo(boxLeft, boxTop + braceRise);
		ctx.lineTo(boxLeft, boxTop + boxHeight);
		ctx.lineTo(boxLeft + bayWidth, boxTop + boxHeight - braceRise);
		ctx.lineTo(boxLeft + bayWidth, boxTop);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		boxTop += boxHeight;
	}

	ctx.strokeStyle = 'black';
	
	ctx.beginPath();
	ctx.moveTo(bayLeft, bayTop);
	ctx.lineTo(bayLeft, bayTop+bayHeight);
	ctx.lineTo(bayLeft+bayWidth, bayTop+bayHeight);
	ctx.lineTo(bayLeft+bayWidth, bayTop);
	ctx.stroke();

}

function fillDimension() {

    document.getElementById('xbrace-width').value =
    	document.getElementById('lumber').value;

	calcXBrace();
}

function decimalToImperial(decimal) {

  const inches = Math.floor(decimal);
  const remainder = decimal - inches;

  // Round to nearest 1/32th
  let numerator = Math.round(remainder * 32);
  let denominator = 32;

  if (numerator === 0) {
    return `${inches}"`;
  } else if (numerator === 32) {
    return `${inches + 1}"`;
  } else {
    // Simplify fraction (basic)
    while (numerator % 2 === 0 && denominator % 2 === 0) {
      numerator /= 2;
      denominator /= 2;
    }
    return `${inches} ${numerator}/${denominator}"`;
  }
}

function parseInches(s) {

	s = s.replaceAll("”", '"');
	s = s.replaceAll("’", "'");

	let inches = parse.F(s);

	if (!isNaN(inches)) {
		inches *= 12.0;
	}

	return inches;
}

function calcXBrace() {

	const numberXbraces = parseFloat(document.getElementById("number-xbraces").value);
	const bayHeight = parseInches(document.getElementById("bay-height").value);
	const bayWidth = parseInches(document.getElementById("bay-width").value);
	const xBraceWidth = parseInches(document.getElementById("xbrace-width").value);

	const a = bayWidth;
	const b = (bayHeight / numberXbraces);
	const c = -xBraceWidth;
	const R = Math.sqrt(a * a + b * b);
	const phase = Math.atan(b / a);
	const t = Math.asin(c / R) + phase;

	const xBraceLength = bayWidth / Math.cos(t);
	const xBraceAngle = (t * 180.0) / Math.PI;
	const xBracePitch = Math.tan(t) * 12.0;

	document.getElementById("xbrace-length").value = decimalToImperial(xBraceLength);
	document.getElementById("xbrace-rise").value = Math.tan(t) * bayWidth;


	document.getElementById("xbrace-angle").value = xBraceAngle.toFixed(2) + "°";
	document.getElementById("xbrace-pitch").value = decimalToImperial(xBracePitch);

	drawXBrace();
}