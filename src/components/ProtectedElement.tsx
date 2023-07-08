import { IPropsProtected } from "../interfaces/IPropsProtected";

export default function ProtectedElement({
    children,
    isAllowed,
}: IPropsProtected): React.JSX.Element | undefined {
    return isAllowed ? children : undefined;
}
