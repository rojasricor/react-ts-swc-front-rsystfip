import { Content, StyleDictionary, TFontDictionary } from "pdfmake/interfaces";

export const createHeader = (
    image: string,
    startDate: string,
    endDate: string
): Content => ({
    columns: [
        {
            image,
            width: 70,
            height: 70,
            margin: [23, 14],
            link: "https://www.itfip.edu.co",
        },
        {
            text: `Rsystfip / Report between ${startDate} and ${endDate}.`,
            fontSize: 8,
            alignment: "center",
            marginTop: 37,
            marginLeft: -73,
        },
    ],
});

export const footer = (currentPage: number, pageCount: number): Content => ({
    text: `Page ${currentPage}/${pageCount} - Rsystfip`,
    alignment: "center",
    fontSize: 8,
    italics: true,
    marginTop: 45,
});

export const styles: StyleDictionary = {
    header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
    subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
    tableHeader: { bold: true, fontSize: 13, color: "black" },
    grayColor: { fillColor: "#f9f9f9" },
};

export const myFonts: TFontDictionary = {
    Roboto: {
        normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
            "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
};
