import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { Button, FloatingLabel } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

interface IProps {
    pdf: TCreatedPdf;
    errorReports: boolean;
}

export default function Downloader({
    pdf,
    errorReports,
}: IProps): React.JSX.Element {
    return (
        <FloatingLabel label="Descargar:">
            <Button
                variant="light"
                onClick={
                    () => pdf.open()
                    // pdf.download(`Rsystfip-Report-${formatTodaysDateTime()}.pdf`)
                }
                className={`form-control border-0 bg-white ${
                    errorReports ? " disabled" : ""
                }`}
                title="Reporte PDF"
            >
                PDF <BsDownload className="mb-1" />
            </Button>
        </FloatingLabel>
    );
}
