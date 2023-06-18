interface IProps {
  ctxRef: React.RefObject<HTMLCanvasElement>;
}

const Ctx = ({ ctxRef }: IProps): React.JSX.Element => (
  <canvas ref={ctxRef} width="700" height="400" />
);

export default Ctx;
