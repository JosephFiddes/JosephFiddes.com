// TODO:
// - Handle lists.
// - Handle links.

// PDFLib comes from pdf-lib.js
import "./pdf-lib.js"

window.onload=function() {
	var printCVButton = document.querySelector('button#print-cv-button');
	printCVButton.onclick = printCVFunc;
}

function getFontInfoFromNodeName(nodeName) {
	var fontInfo = {};
	switch (nodeName) {
		case "H1":
			fontInfo = {
				fontSize: 20,
				sectionGap: 10,
				bHeading: true,
			};
			break;
		case "H2":
			fontInfo = {
				fontSize: 18,
				sectionGap: 4,
				bHeading: true,
			};
			break;
		case "H3":
			fontInfo = {
				fontSize: 14,
				sectionGap: 5,
				bHeading: true,
			};
			break;
		default:
			fontInfo = {
				fontSize: 12,
				sectionGap: 6,
				bHeading: false,
			};
			break;
	}

	return fontInfo;
}

async function printCVFunc() {
	const CVElement = document.querySelector('div#CV');
	var CVElementArray = Array.from(CVElement.children);
	CVElementArray = CVElementArray.filter((element) => {
		return !element.classList.contains("dont-print");
	});

	console.log(CVElementArray);

	const pdfDoc = await PDFLib.PDFDocument.create();
	const font = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);

	const lineGap = 3;
	const lineWrap = (fontSize) => { return lineGap + fontSize; };
	
	var page = pdfDoc.addPage(PDFLib.PageSizes.A4);
	const pageDimensions = page.getSize();
	const pageWidth = pageDimensions.width;
	const pageHeight = pageDimensions.height;

	const pageLRMargin = 50;
	const pageTBMargin = 50;
	const textBBWidth = pageWidth - 2 * pageLRMargin;
	const textBBHeight = pageHeight - 2 * pageTBMargin;

	// Initial loop to prepare text to be added to PDF.
	var elementHeight = 0;
	var numCVElements = CVElementArray.length;
	var CVElementsText = [];
	for (let n = 0; n < numCVElements; n++) {
		var fontInfo = getFontInfoFromNodeName(CVElementArray[n].nodeName);
		var fontSize = fontInfo.fontSize;
		
		elementHeight += fontSize;

		// Long lines of text need to wrap.
		var textLines = PDFLib.breakTextIntoLines(CVElementArray[n].innerText, " ", textBBWidth, (text) => {
			return font.widthOfTextAtSize(text, fontInfo.fontSize);
		});

		elementHeight = fontSize + (textLines.length-1) * lineWrap(fontSize);

		// Cache various properties of element to be used later.
		CVElementsText.push({
			fontSize: fontSize,
			sectionGap: fontInfo.sectionGap,
			bHeading: fontInfo.bHeading,
			height: elementHeight,
			textLines: textLines,
		});
	}

	// Print to PDF
	var bNewPage = false;
	var elementOffset = 0;
	var newElementOffset = 0;
	for (let n = 0; n < numCVElements; n++) {
		// Test to make sure the text fits in the page.
		bNewPage = false;
		newElementOffset = elementOffset;
		var i = 0;
		while (n+i < numCVElements) {
			// If the element extends out of the bounding-box, then a new page is needed.
			newElementOffset += CVElementsText[n+i].height;
			if (newElementOffset > textBBHeight) {
				bNewPage = true;
				break;
			} 

			newElementOffset += CVElementsText[n+i].sectionGap;

			// Prevent orphaned headings by checking if the next element needs a page break.
			if (CVElementsText[n+i].bHeading == false) break;

			i += 1;
		}

		if (bNewPage) {
			// New page needed, reset elementOffset.
			page = pdfDoc.addPage(PDFLib.PageSizes.A4);
			elementOffset = 0;
		}

		elementOffset += CVElementsText[n].fontSize;
		// Draw the text
		for (let l = 0; l < CVElementsText[n].textLines.length; l++) {
			page.drawText(CVElementsText[n].textLines[l], {
				x: pageLRMargin,
				y: pageHeight - pageTBMargin - elementOffset,
				size: CVElementsText[n].fontSize,
				font: font,
				color: PDFLib.rgb(0, 0.1, 0.2),
			});

			if (l != CVElementsText[n].textLines.length - 1) {
				elementOffset += lineWrap(CVElementsText[n].fontSize);
			}
		}

		elementOffset += CVElementsText[n].sectionGap;
	}

	const pdfBytes = await pdfDoc.save();

	download(pdfBytes, "CV.pdf", "application/pdf");
}

// Function to download data to a file
// Source: Kanchu on StackOverflow
// https://stackoverflow.com/questions/13405129
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}