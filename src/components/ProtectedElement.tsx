import { IPropsProtected } from "../interfaces/IPropsProtected";

const ProtectedElement = ({
  children,
  isAllowed,
}: IPropsProtected): React.JSX.Element | undefined =>
  isAllowed ? children : undefined;

export default ProtectedElement;
