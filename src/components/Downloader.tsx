import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { Button, FloatingLabel } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

interface IProps {
    pdf: TCreatedPdf;
}

export default function Downloader({ pdf }: IProps): React.JSX.Element {
    return (
        <FloatingLabel label="Descargar:">
            <Button
                variant="light"
                onClick={
                    () => pdf.open()
                    // pdf.download(`Rsystfip-Report-${formatTodaysDateTime()}.pdf`)
                }
                className="form-control border-0 bg-white"
                title="Reporte PDF"
            >
                PDF <BsDownload className="mb-1" />
            </Button>
        </FloatingLabel>
    );
}
