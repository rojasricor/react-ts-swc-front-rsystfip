const ProtectedElement = ({ children, isAllowed }) =>
  isAllowed ? children : undefined;

export default ProtectedElement;
