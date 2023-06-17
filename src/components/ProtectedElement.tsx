import { PropsProtected } from "../interfaces/PropsProtected";

const ProtectedElement = ({
  children,
  isAllowed,
}: PropsProtected): React.JSX.Element | undefined =>
  isAllowed ? children : undefined;

export default ProtectedElement;
