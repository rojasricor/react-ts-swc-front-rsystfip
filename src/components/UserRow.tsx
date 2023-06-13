import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { API_ROUTE } from "../constants";
import { BiTrash, BiKey } from "react-icons/bi";

const UserRow = ({ user: { id, email } }) => {
  const [deleted, setDeleted] = useState(false);

  const deleteUser = async (role) => {
    if (!confirm("Seguro(a) de eliminar ese usuario?")) return;

    try {
      const { data } = await axios.delete(`${API_ROUTE}/user`, {
        headers: { "Content-Type": "application/json" },
        data: { role },
      });

      if (!data) return toast.error("Error al eliminar");

      setDeleted(true);
      toast.success("Usuario eliminado exitosamente", {
        position: "top-left",
      });
    } catch ({ message }) {
      toast.error(message);
    }
  };

  if (deleted) return null;

  return (
    <tr>
      <td>
        {email} {id === 3 && "(Admin)"}
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
          onClick={() => deleteUser(id)}
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
