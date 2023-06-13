import { Image, ListGroup } from "react-bootstrap";

const Listgroup = ({ title, data, end }) => (
  <>
    <h5 className="text-center">{title}</h5>
    <ListGroup className="mb-5">
      {data.map(({ category, counts }, index) => (
        <ListGroup.Item key={index} action className="d-flex gap-3 py-3">
          <Image src="/rsystfip.svg" alt="twbs" width="32" height="27" />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">{category}</h6>
              <p className="mb-0 opacity-75">{counts}</p>
            </div>
            <small className="opacity-50 text-nowrap">{end}</small>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </>
);

export default Listgroup;
