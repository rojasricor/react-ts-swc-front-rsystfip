interface IProps {
  children: React.JSX.Element[];
}

const Responsive = ({ children }: IProps): React.JSX.Element => (
  <div className="table-responsive">{children}</div>
);

export default Responsive;
