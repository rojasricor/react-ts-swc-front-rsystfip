import { AuthState } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export default function UserLoggedInfo(): React.JSX.Element {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  return (
    <h1 className="h3">
      {`${authState.user.role === "secretaria" ? "Bienvenida" : "Bienvenido"} ${
        authState.user.role
      }: ${authState.user.name}`}
    </h1>
  );
}
