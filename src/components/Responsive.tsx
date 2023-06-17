interface Props {
  children: React.JSX.Element[];
}

const Responsive = ({ children }: Props) => (
  <div className="table-responsive">{children}</div>
);

export default Responsive;
