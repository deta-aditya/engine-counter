export const Counter = (props: {
  className?: string;
  title: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => {
  return (
    <div className={`counter${props.className ? ` ${props.className}` : ''}`}>
      {props.title}
      <div className="value">{props.value}</div>
      <div className="button-container">
        <button onClick={props.onDecrement}>-</button>
        <button onClick={props.onIncrement}>+</button>
      </div>
    </div>
  )
}
