import { useAppSelector } from "../hooks";

const UserLoggedInfo = (): React.JSX.Element => {
  const authState = useAppSelector(({ auth }) => auth);

  return (
    <h1 className="h3">
      {`${authState.user.role === "secretaria" ? "Bienvenida" : "Bienvenido"} ${
        authState.user.role
      }: ${authState.user.name}`}
    </h1>
  );
};

export default UserLoggedInfo;
