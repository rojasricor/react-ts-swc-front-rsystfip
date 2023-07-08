import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { People } from "../features/people/peopleSlice";

interface IProps {
    person: People;
}

export default function PersonRow({
    person: {
        id,
        name,
        description,
        ty_doc,
        document_number,
        category,
        facultie,
        come_asunt,
    },
}: IProps): React.JSX.Element {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td title={description}>
                {ty_doc} {document_number}
            </td>
            <td>{category}</td>
            <td>{facultie}</td>
            <td>{come_asunt}</td>
            <td>
                <Link
                    to={`/people/view/${id}/edit`}
                    className="btn btn-link link-fc"
                    title={`Edit personal data for person ${name}`}
                >
                    <FiEdit3 />
                </Link>
            </td>
        </tr>
    );
}
