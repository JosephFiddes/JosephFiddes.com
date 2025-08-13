// TODO:
// - Handle lists.

// PDFLib comes from pdf-lib.js
import "./pdf-lib.js"

const g_textColorR = 0;
const g_textColorG = 0.05;
const g_textColorB = 0.1;

const g_pageColorR = 1; //256/256;
const g_pageColorG = 1; //248/256;
const g_pageColorB = 1; //230/256;

const g_pageLRMargin = 50;
const g_pageTBMargin = 70;

const g_fontstrings = [
	PDFLib.StandardFonts.TimesRoman,
	PDFLib.StandardFonts.TimesRomanItalic,
	PDFLib.StandardFonts.TimesRomanBold,
];

var g_fonts = [];

window.onload=function() {
	var printCVButton = document.querySelector('button#print-cv-button');
	printCVButton.onclick = printCVFunc;
}

function getFontInfoFromNodeName(nodeName) {
	var fontInfo = {};
	switch (nodeName) {
		// Header text at top of page.
		case "HEADER":
			fontInfo = {
				fontIndex: 0,
				fontSize: 8,
				lineGap: 3,
				sectionGap: 2,
				bHeading: false,
				xMargin: 0,
				prefix: "",
				suffix: "",
			};
			break;
		// Title
		case "H1":
			fontInfo = {
				fontIndex: 0,
				fontSize: 20,
				lineGap: 3,
				sectionGap: 10,
				bHeading: true,
				xMargin: 0,
				prefix: "",
				suffix: "",
			};
			break;
		// Large section header (e.g. "Tertiary Education", "Employment History", etc.)
		case "H2":
			fontInfo = {
				fontIndex: 2,
				fontSize: 18,
				lineGap: 3,
				sectionGap: 4,
				bHeading: true,
				xMargin: 10,
				prefix: "",
				suffix: "",
			};
			break;
		// Minor header (e.g. individual jobs/degrees)
		case "H3":
			fontInfo = {
				fontIndex: 1, // Italic
				fontSize: 14,
				lineGap: 3,
				sectionGap: 5,
				bHeading: true,
				xMargin: 6,
				prefix: "",
				suffix: "",
			};
			break;
		// Very minor header
		case "H4":
			fontInfo = {
				fontIndex: 2, // Bold
				fontSize: 12,
				lineGap: 3,
				sectionGap: 6,
				bHeading: true,
				xMargin: 0,
				prefix: "",
				suffix: "",
			};
			break;
		// Element in list
		case "LI":
			fontInfo = {
				fontIndex: 0,
				fontSize: 12,
				lineGap: 3,
				sectionGap: 6,
				bHeading: false,
				xMargin: 20,
				prefix: "- ",
				suffix: "",
			};
			break;
		default:
			fontInfo = {
				fontIndex: 0,
				fontSize: 12,
				lineGap: 3,
				sectionGap: 6,
				bHeading: false,
				xMargin: 0,
				prefix: "",
				suffix: "",
			};
			break;
	}

	return fontInfo;
}

function lineWrap(lineGap, fontSize) {
	return lineGap + fontSize;
}

function newPage(doc) {
	var page = doc.addPage(PDFLib.PageSizes.A4);
	
	// Add header.
	const lines = [
		"Email: fiddj13@live.com.au",
		"Phone: 0434 497 420",
		"LinkedIn: https://www.linkedin.com/in/joseph-fiddes-320285198/",
		"Website: https://www.josephfiddes.com"
	]

	const links = [
		"mailto:fiddj13@live.com.au",
		"",
		"https://www.linkedin.com/in/joseph-fiddes-320285198/",
		"https://www.josephfiddes.com"
	]

	const pageDimensions = page.getSize();
	const pageHeight = pageDimensions.height;
	const pageWidth = pageDimensions.width;

	page.drawRectangle({
		x: 0,
		y: 0,
		width: pageWidth,
		height: pageHeight,
		color: PDFLib.rgb(g_pageColorR, g_pageColorG, g_pageColorB),
	})

	const distFromTop = 10;
	const fontInfo = getFontInfoFromNodeName("HEADER");

	drawText(page, lines, {
			x: g_pageLRMargin,
			y: pageHeight - distFromTop - fontInfo.fontSize,
		}, 
		true, fontInfo, links);

	return page;
}

/**
 * Draws text.
 * @param page       The page on which the text is drawn.
 * @param lines      The text, as an array of strings (each string is a line).
 * @param elementPos The position the text is written (bottom-left of first line).
 * 					 After running, elementPos.y is at the bottom-left of the final line.
 * @param bLinks     Boolean value which expresses if there are hyperlinks to add.
 * @param fontInfo   Various info about the font (see getFontInfoFromNodeName)
 * @param links      The links that each line leads to when clicked.
 * */
function drawText(page, lines, elementPos, bLinks, fontInfo, links) {
	// x: pageLRMargin,
	// y: pageHeight - distFromTop - elementOffset

	for (var i=0; i<lines.length; i++) {
		page.drawText(lines[i], {
				x: elementPos.x,
				y: elementPos.y,
				size: fontInfo.fontSize,
				font: g_fonts[fontInfo.fontIndex],
				color: PDFLib.rgb(g_textColorR, g_textColorG, g_textColorB),
			});

		if (bLinks && links[i]) {
			var	link_width = (g_fonts[fontInfo.fontIndex]).widthOfTextAtSize(lines[i], fontInfo.fontSize);
			createLink(page, links[i], {
				x: elementPos.x,
				y: elementPos.y - 5,
				w: link_width,
				h: fontInfo.fontSize + 5,
			});
		}

		// Add line-wrap if line is not final in paragraph.
		if (i != lines.length - 1) {
			elementPos.y -= lineWrap(fontInfo.lineGap, fontInfo.fontSize);
		}
	}
}

async function printCVFunc() {
	// Get array of HTML elements in CV.
	const CVElement = document.querySelector('div#CV');
	var CVElementArray_pre = Array.from(CVElement.children);
	CVElementArray_pre = CVElementArray_pre.filter((element) => {
		return !element.classList.contains("dont-print");
	});

	// Extract list items from lists.
	var CVElementArray = [];
	CVElementArray_pre.forEach((item) => {
		if (item.nodeName === "UL") {
			Array.from(item.children).forEach((child) => {
				CVElementArray.push(child);
			});
		} else {
			CVElementArray.push(item);
		}
	});

	const pdfDoc = await PDFLib.PDFDocument.create();

	for (var i=0; i<g_fontstrings.length; i++) {
		var embeddedFont = await pdfDoc.embedFont(g_fontstrings[i]);
		g_fonts.push(embeddedFont);
	}

	var page = newPage(pdfDoc);
	const pageDimensions = page.getSize();
	const pageWidth = pageDimensions.width;
	const pageHeight = pageDimensions.height;

	
	const textBBWidth = pageWidth - 2 * g_pageLRMargin;
	const textBBHeight = pageHeight - 2 * g_pageTBMargin;

	// Initial loop to prepare text to be added to PDF.
	// This loop divides long lines into paragraphs, and caches their heights.
	var elementHeight = 0;
	var numCVElements = CVElementArray.length;
	var CVElementsText = [];
	for (let n = 0; n < numCVElements; n++) {
		var nodeName = CVElementArray[n].nodeName;
		var fontInfo = getFontInfoFromNodeName(nodeName);
		var fontSize = fontInfo.fontSize;
		
		elementHeight += fontSize;

		var totalText = fontInfo.prefix + CVElementArray[n].innerText + fontInfo.suffix;
		var elementWidth = textBBWidth - fontInfo.xMargin;

		// Long lines of text need to wrap.
		var textLines = PDFLib.breakTextIntoLines(totalText, " ", elementWidth, (text) => {
			return (g_fonts[fontInfo.fontIndex]).widthOfTextAtSize(text, fontInfo.fontSize);
		});

		elementHeight = fontSize + (textLines.length-1) * lineWrap(fontInfo.lineGap, fontSize);

		// Cache various properties of element to be used later.
		CVElementsText.push({
			nodeName: nodeName,
			fontInfo: fontInfo,
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

			newElementOffset += CVElementsText[n+i].fontInfo.sectionGap;

			// Prevent orphaned headings by checking if the next element needs a page break.
			if (CVElementsText[n+i].fontInfo.bHeading == false) break;

			i += 1;
		}

		if (bNewPage) {
			// New page needed, reset elementOffset.
			page = newPage(pdfDoc);
			elementOffset = 0;
		}

		elementOffset += CVElementsText[n].fontInfo.fontSize;

		var bLink = CVElementsText[n].nodeName == "A";
		var link = bLink ? [CVElementArray[n].href] : false;

		var elementPos = {
			x: g_pageLRMargin + CVElementsText[n].fontInfo.xMargin,
			y: pageHeight - g_pageTBMargin - elementOffset,
		};

		var orig_y = elementPos.y;
		drawText(page, CVElementsText[n].textLines,
			elementPos, bLink, CVElementsText[n].fontInfo, link);

		// Prepare elementOffset for next draw.
		elementOffset += -(elementPos.y - orig_y);
		elementOffset += CVElementsText[n].fontInfo.sectionGap;
	}

	const pdfBytes = await pdfDoc.save();
	const d = new Date();
	const pdfName = "CV " + d.getFullYear().toString().padStart(4, "0")  + 
		"-" + (d.getMonth() + 1).toString().padStart(2, "0") + 
		"-" + d.getDate().toString().padStart(2, "0") + ".pdf";

	download(pdfBytes, pdfName, "application/pdf");
}

function createLink(page, uri, pageLinkOptions) {
	var link = createPageLinkAnnotation(page, uri, pageLinkOptions);
	page.node.addAnnot(link);
}

// Function to create links
// https://github.com/Hopding/pdf-lib/issues/555#issuecomment-670241308
const createPageLinkAnnotation = (page, uri, pageLinkOptions) =>
  page.doc.context.register(
    page.doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [pageLinkOptions.x,
      		 pageLinkOptions.y,
      		 pageLinkOptions.x + pageLinkOptions.w,
      		 pageLinkOptions.y + pageLinkOptions.h],
      // Border: [0, 0, 2],
      // C: [0, 0, 1],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFLib.PDFString.of(uri),
      },
    }),
  );

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