import classNames from "classnames";

export const TabsItem = (props: {
  title: string;
  tabKey: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <a href={`#${props.tabKey}`} className={classNames('tabs-item', { active: props.active })} onClick={props.onClick}>
      {props.title}
    </a>
  )
}
