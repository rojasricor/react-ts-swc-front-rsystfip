import { FloatingLabel, Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

const Downloader = ({ pdf }) => (
  <FloatingLabel label="Descargar:">
    <Button
      variant="light"
      onClick={
        () => pdf.open()
        // pdf.download(`Rsystfip-Report-${formatTodaysDateTime()}.pdf`)
      }
      className="form-control"
      title="Reporte PDF"
    >
      PDF <BsDownload className="mb-1" />
    </Button>
  </FloatingLabel>
);

export default Downloader;
