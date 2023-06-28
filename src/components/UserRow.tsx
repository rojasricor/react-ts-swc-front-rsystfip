import { useState } from "react";
import { Button } from "react-bootstrap";
import { BiKey, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import { User } from "../features/admin/adminSlice";
import { IUserBase } from "../interfaces/IUserBase";

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
      const {
        data: { ok, error },
      } = await api.delete("/user", {
        headers: { "Content-Type": "application/json" },
        data: { roleId },
      });

      if (error || !ok) {
        toast.warn(error);
        return;
      }

      setDeleted(true);
      toast.success(ok, { position: "top-left" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (deleted) return;

  return (
    <tr>
      <td>
        {email} ({role.substring(0, 1).toUpperCase().concat(role.substring(1))})
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
