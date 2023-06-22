import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiTrash, BiKey } from "react-icons/bi";
import { IUserBase } from "../interfaces/IUserBase";
import { User } from "../features/admin/adminSlice";
import { api } from "../api/axios";

interface IProps {
  user: User;
}

const UserRow = ({
  user: { id, email, role },
}: IProps): React.JSX.Element | undefined => {
  const [deleted, setDeleted] = useState(false);

  const handleClick = async (roleId: IUserBase["id"]): Promise<void> => {
    if (!confirm("Seguro(a) de eliminar ese usuario?")) return;

    try {
      const { data } = await api.delete("/user", {
        headers: { "Content-Type": "application/json" },
        data: { roleId },
      });

      if (!data) {
        toast.error("Error al eliminar");
        return;
      }

      setDeleted(true);
      toast.success("Usuario eliminado exitosamente", {
        position: "top-left",
      });
    } catch ({ message }: any) {
      toast.error(message);
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
};

export default UserRow;
