// TODO:
// - Handle lists.
// - Refactor such that the header and regular text are drawn in the same function.

// PDFLib comes from pdf-lib.js
import "./pdf-lib.js"

const textColorR = 0;
const textColorG = 0.1;
const textColorB = 0.2;

const pageLRMargin = 50;
const pageTBMargin = 50;

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

function newPage(doc, headerFont) {
	var page = doc.addPage(PDFLib.PageSizes.A4);
	
	// Add header.
	const lines = [
		"Email: fiddj13@live.com.au",
		"Phone: 0434 497 420",
		"LinkedIn: https://www.linkedin.com/in/joseph-fiddes-320285198/"
	]

	const links = [
		"mailto:fiddj13@live.com.au",
		"",
		"https://www.linkedin.com/in/joseph-fiddes-320285198/"
	]

	const fontSize = 8;
	const lineGap = 3;
	const lineWrap = (fontSize) => { return lineGap + fontSize; };
	const distFromTop = 10;
	const pageHeight = page.getSize().height;
	var elementOffset = fontSize;

	for (var i=0; i<lines.length; i++) {
		page.drawText(lines[i], {
				x: pageLRMargin,
				y: pageHeight - distFromTop - elementOffset,
				size: fontSize,
				font: headerFont,
				color: PDFLib.rgb(textColorR, textColorG, textColorB),
			});

		if (links[i]) {
			var	link_width = headerFont.widthOfTextAtSize(lines[i], fontSize);
			createLink(page, links[i], {
				x: pageLRMargin,
				y: pageHeight - distFromTop - elementOffset - 5,
				w: link_width,
				h: fontSize + 5,
			});
		}

		elementOffset += lineWrap(fontSize);
	}

	return page;
}

async function printCVFunc() {
	const CVElement = document.querySelector('div#CV');
	var CVElementArray = Array.from(CVElement.children);
	CVElementArray = CVElementArray.filter((element) => {
		return !element.classList.contains("dont-print");
	});

	//console.log(CVElementArray);

	const pdfDoc = await PDFLib.PDFDocument.create();
	const font = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);

	const lineGap = 3;
	const lineWrap = (fontSize) => { return lineGap + fontSize; };
	
	var page = newPage(pdfDoc, font);
	const pageDimensions = page.getSize();
	const pageWidth = pageDimensions.width;
	const pageHeight = pageDimensions.height;

	
	const textBBWidth = pageWidth - 2 * pageLRMargin;
	const textBBHeight = pageHeight - 2 * pageTBMargin;

	// Initial loop to prepare text to be added to PDF.
	var elementHeight = 0;
	var numCVElements = CVElementArray.length;
	var CVElementsText = [];
	for (let n = 0; n < numCVElements; n++) {
		var nodeName = CVElementArray[n].nodeName;
		var fontInfo = getFontInfoFromNodeName(nodeName);
		var fontSize = fontInfo.fontSize;
		
		elementHeight += fontSize;

		// Long lines of text need to wrap.
		var textLines = PDFLib.breakTextIntoLines(CVElementArray[n].innerText, " ", textBBWidth, (text) => {
			return font.widthOfTextAtSize(text, fontInfo.fontSize);
		});

		elementHeight = fontSize + (textLines.length-1) * lineWrap(fontSize);

		// Cache various properties of element to be used later.
		CVElementsText.push({
			nodeName: nodeName,
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
			page = newPage(pdfDoc, font);
			elementOffset = 0;
		}

		elementOffset += CVElementsText[n].fontSize;
		var links = [];
		var total_lines_in_element = CVElementsText[n].textLines.length;
		// Draw the text
		for (let l = 0; l < total_lines_in_element; l++) {
			page.drawText(CVElementsText[n].textLines[l], {
				x: pageLRMargin,
				y: pageHeight - pageTBMargin - elementOffset,
				size: CVElementsText[n].fontSize,
				font: font,
				color: PDFLib.rgb(textColorR, textColorG, textColorB),
			});

			// Add line-wrap if line is not final in paragraph.
			if (l != total_lines_in_element - 1) {
				elementOffset += lineWrap(CVElementsText[n].fontSize);
			}
		}

		console.log(CVElementsText[n]);
		// Add hyperlink if element is link.
		if (CVElementsText[n].nodeName == "A") {
			if (total_lines_in_element > 1) {
				var link_width = textBBWidth;
			} else {
				var link_width = font.widthOfTextAtSize(CVElementsText[n].textLines[0], 
														CVElementsText[n].fontSize);
			}

			createLink(page, CVElementArray[n].href, {
				x: pageLRMargin,
				y: pageHeight - pageTBMargin - elementOffset - 5,
				w: link_width,
				h: CVElementsText[n].height + 5,
			});
		}

		elementOffset += CVElementsText[n].sectionGap;
	}

	const pdfBytes = await pdfDoc.save();

	download(pdfBytes, "CV.pdf", "application/pdf");
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