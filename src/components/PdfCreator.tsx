import Downloader from "./Downloader";
import pdfMake from "pdfmake/build/pdfmake.min";
import * as pdfConf from "../config/pdfmake.config";
import { useSelector } from "react-redux";

const PdfCreator = () => {
  const pngBase64State = useSelector(({ reports }) => reports.pngBase64);
  const reportsState = useSelector(({ reports }) => reports.reports);
  const queryDataState = useSelector(({ reports }) => reports.queryData);
  const peopleState = useSelector(({ people }) => people.people);
  const reportsCountOnRangeState = useSelector(
    ({ reports }) => reports.reportsCountOnRange
  );
  const reportsCountAllTimeState = useSelector(
    ({ reports }) => reports.reportsCountAllTime
  );

  const pdf = pdfMake.createPdf({
    pageMargins: [28, 90],
    header: pdfConf.createHeader(
      pngBase64State,
      queryDataState.startDate,
      queryDataState.endDate
    ),
    footer: pdfConf.footer,
    content: [
      {
        text: `Total personas agendadas: (${peopleState.length})`,
        style: "header",
        alignment: "center",
        marginBottom: 30,
      },
      peopleState.length !== 0
        ? {
            layout: "lightHorizontalLines",
            alignment: "center",
            table: {
              dontBreakRows: true,
              headerRows: 1,
              body: [
                [
                  { text: "No.", style: "tableHeader" },
                  { text: "Nombre completo", style: "tableHeader" },
                  { text: "Categoría", style: "tableHeader" },
                  { text: "Facultad", style: "tableHeader" },
                  {
                    text: "Asunto visita rectoría",
                    style: "tableHeader",
                  },
                ],
                ...peopleState.map(
                  ({ id, name, category, facultie, come_asunt }) => [
                    id,
                    name,
                    category,
                    facultie,
                    come_asunt,
                  ]
                ),
              ],
            },
          }
        : {},
      {
        text: `Reportes entre el rango de fecha: (${reportsState.length})`,
        style: "header",
        alignment: "center",
        marginBottom: 30,
        pageBreak: "before",
      },
      reportsState.length !== 0
        ? {
            layout: "lightHorizontalLines",
            alignment: "center",
            table: {
              dontBreakRows: true,
              headerRows: 1,
              body: [
                [
                  { text: "Nombre completo", style: "tableHeader" },
                  {
                    text: "Fecha y hora agendamiento",
                    style: "tableHeader",
                  },
                  { text: "Agendamiento diario", style: "tableHeader" },
                  { text: "Agendamiento programado", style: "tableHeader" },
                  { text: "Cetegoría persona", style: "tableHeader" },
                ],
                ...reportsState.map(
                  ({ name, date, scheduling_count, daily_count, category }) => [
                    name,
                    date,
                    scheduling_count,
                    daily_count,
                    category,
                  ]
                ),
              ],
            },
          }
        : {},
      {
        text: "Cantidad agendado(a)s:",
        style: "header",
        alignment: "center",
        marginBottom: 30,
        pageBreak: reportsState.length !== 0 ? "before" : false,
      },
      {
        columns: [
          {
            text: `Rango de fecha${
              reportsCountOnRangeState.length !== 0 ? "" : " (0)"
            }`,
            style: "subheader",
            alignment: "center",
            marginBottom: 10,
          },
          {
            text: `Cantidad total${
              reportsCountAllTimeState.length !== 0 ? "" : " (0)"
            }`,
            style: "subheader",
            alignment: "center",
            marginBottom: 10,
          },
        ],
      },
      {
        columns: [
          reportsCountOnRangeState.length !== 0
            ? {
                layout: "headerLineOnly",
                alignment: "center",
                marginBottom: 30,
                style: "grayColor",
                table: {
                  dontBreakRows: true,
                  headerRows: 1,
                  body: [
                    [
                      { text: "Categoría de persona", style: "tableHeader" },
                      { text: "Cantidad personas", style: "tableHeader" },
                    ],
                    ...reportsCountOnRangeState.map(({ category, counts }) => [
                      category,
                      counts,
                    ]),
                  ],
                },
              }
            : {},
          reportsCountAllTimeState.length !== 0
            ? {
                layout: "headerLineOnly",
                alignment: "center",
                marginBottom: 30,
                style: "grayColor",
                table: {
                  dontBreakRows: true,
                  headerRows: 1,
                  body: [
                    [
                      { text: "Categoría de persona", style: "tableHeader" },
                      { text: "Cantidad personas", style: "tableHeader" },
                    ],
                    ...reportsCountAllTimeState.map(({ category, counts }) => [
                      category,
                      counts,
                    ]),
                  ],
                },
              }
            : {},
        ],
      },
    ],
    styles: pdfConf.styles,
  });

  pdf.fonts = pdfConf.myFonts;

  return <Downloader pdf={pdf} />;
};

export default PdfCreator;
