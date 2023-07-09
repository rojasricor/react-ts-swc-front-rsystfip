import { useState } from "react";
import { Button } from "react-bootstrap";
import { BiKey, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import { User } from "../features/admin/adminSlice";
import { IUserBase } from "../interfaces/IUserBase";
import { notify } from "../libs/toast";

interface IProps {
    user: User;
}

export default function UserRow({
    user: { id, email, role },
}: IProps): React.JSX.Element | undefined {
    const [deleted, setDeleted] = useState(false);

    const handleClick = async (roleId: IUserBase["id"]): Promise<void> => {
        if (!confirm("Seguro(a) de eliminar ese usuario?")) return;

        try {
            const { data } = await api.delete(`/users/${roleId}`);

            setDeleted(true);
            notify(data.ok, {
                type: "success",
                position: "top-left",
            });
        } catch (error: any) {
            notify(error.response.data.error, { type: "error" });
        }
    };

    if (deleted) return;

    return (
        <tr>
            <td>
                {email} (
                {role.substring(0, 1).toUpperCase().concat(role.substring(1))})
            </td>

            <td>
                <Link
                    to={`/users/manage/password/${id}/change`}
                    className="btn btn-light m-1"
                    title={`Change password for user ${email}`}
                >
                    <BiKey className="mb-1" />
                </Link>

                <Button
                    onClick={() => handleClick(id)}
                    variant="danger"
                    className={"m-1".concat(id !== 3 ? "" : " disabled")}
                    title={`Delete user ${email} (Requires confirmation)`}
                >
                    <BiTrash className="mb-1" />
                </Button>
            </td>
        </tr>
    );
}
