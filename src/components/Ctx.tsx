interface IProps {
    ctxRef: React.RefObject<HTMLCanvasElement>;
}

export default function Ctx({ ctxRef }: IProps): React.JSX.Element {
    return <canvas ref={ctxRef} width="700" height="400" />;
}
