import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { FloatingLabel, Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

interface IProps {
  pdf: TCreatedPdf;
}

const Downloader = ({ pdf }: IProps): React.JSX.Element => (
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

export default Downloader;
