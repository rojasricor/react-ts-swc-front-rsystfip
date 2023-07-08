interface IProps {
    children: React.JSX.Element[];
}

export default function Responsive({ children }: IProps): React.JSX.Element {
    return <div className="table-responsive">{children}</div>;
}
