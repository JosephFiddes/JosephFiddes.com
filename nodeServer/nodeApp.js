import http from 'http'
import {PDFDocument, StandardFonts, rgb, PageSizes, breakTextIntoLines, PDFString} from 'pdf-lib'

const port = 2345;

const server = http.createServer(function(req, res) {
	res.write(generateCVPDF());
	res.end();
})

server.listen(port, function(error) {
	if (error) {
		console.log("something went wrong in nodeApp.js: ", error);
	} else {
		console.log("nodeApp.js server listening on port " + port);
	}
})

// TODO:
// - Handle lists.

// PDFLib comes from pdf-lib.js

const g_textColorR = 0;
const g_textColorG = 0.05;
const g_textColorB = 0.1;

const g_pageColorR = 1; //256/256;
const g_pageColorG = 1; //248/256;
const g_pageColorB = 1; //230/256;

const g_pageLRMargin = 50;
const g_pageTBMargin = 70;

const g_fontstrings = [
	StandardFonts.TimesRoman,
	StandardFonts.TimesRomanItalic,
	StandardFonts.TimesRomanBold,
];

var g_fonts = [];

window.onload=function() {
	var printCVButton = document.querySelector('button#print-cv-button');
	printCVButton.onclick = printCVFunc;
}

function getFontInfoFromNodeName(nodeName) {
	var fontInfo = {};
	switch (nodeName) {
		case "HEADER":
			fontInfo = {
				fontIndex: 0,
				fontSize: 8,
				lineGap: 3,
				sectionGap: 2,
				bHeading: false,
			};
			break;
		case "H1":
			fontInfo = {
				fontIndex: 0,
				fontSize: 20,
				lineGap: 3,
				sectionGap: 10,
				bHeading: true,
			};
			break;
		case "H2":
			fontInfo = {
				fontIndex: 0,
				fontSize: 18,
				lineGap: 3,
				sectionGap: 4,
				bHeading: true,
			};
			break;
		case "H3":
			fontInfo = {
				fontIndex: 1, // Italic
				fontSize: 14,
				lineGap: 3,
				sectionGap: 5,
				bHeading: true,
			};
			break;
		case "H4":
			fontInfo = {
				fontIndex: 2, // Bold
				fontSize: 12,
				lineGap: 3,
				sectionGap: 6,
				bHeading: true,
			};
			break;
		default:
			fontInfo = {
				fontIndex: 0,
				fontSize: 12,
				lineGap: 3,
				sectionGap: 6,
				bHeading: false,
			};
			break;
	}

	return fontInfo;
}

function lineWrap(lineGap, fontSize) {
	return lineGap + fontSize;
}

function newPage(doc) {
	var page = doc.addPage(PageSizes.A4);
	
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
		color: rgb(g_pageColorR, g_pageColorG, g_pageColorB),
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
				color: rgb(g_textColorR, g_textColorG, g_textColorB),
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

async function generateCVPDF() {


	console.log(['d', 'c', 'b', 'a'].sort(ascending));

	const CVElement = document.querySelector('div#CV');
	var CVElementArray = Array.from(CVElement.children);
	CVElementArray = CVElementArray.filter((element) => {
		return !element.classList.contains("dont-print");
	});

	//console.log(CVElementArray);

	const pdfDoc = await PDFDocument.create();

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
	console.log("done through node js");
	var elementHeight = 0;
	var numCVElements = CVElementArray.length;
	var CVElementsText = [];
	for (let n = 0; n < numCVElements; n++) {
		var nodeName = CVElementArray[n].nodeName;
		var fontInfo = getFontInfoFromNodeName(nodeName);
		var fontSize = fontInfo.fontSize;
		
		elementHeight += fontSize;

		// Long lines of text need to wrap.
		var textLines = breakTextIntoLines(CVElementArray[n].innerText, " ", textBBWidth, (text) => {
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
	var bNeedsNewPage = false;
	var elementOffset = 0;
	var newElementOffset = 0;
	for (let n = 0; n < numCVElements; n++) {
		// Test to make sure the text fits in the page.
		bNeedsNewPage = false;
		newElementOffset = elementOffset;
		var i = 0;
		while (n+i < numCVElements) {
			// If the element extends out of the bounding-box, then a new page is needed.
			newElementOffset += CVElementsText[n+i].height;
			if (newElementOffset > textBBHeight) {
				bNeedsNewPage = true;
				break;
			} 

			newElementOffset += CVElementsText[n+i].fontInfo.sectionGap;

			// Prevent orphaned headings by checking if the next element needs a page break.
			if (CVElementsText[n+i].fontInfo.bHeading == false) break;

			i += 1;
		}

		if (bNeedsNewPage) {
			// New page needed, reset elementOffset.
			page = newPage(pdfDoc);
			elementOffset = 0;
		}

		elementOffset += CVElementsText[n].fontInfo.fontSize;

		var bLink = CVElementsText[n].nodeName == "A";
		var link = bLink ? [CVElementArray[n].href] : false;

		var elementPos = {
			x: g_pageLRMargin,
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
	return pdfBytes;
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
        URI: PDFString.of(uri),
      },
    }),
  );