import { ReactNode, useState } from "react";
import { TabsItem } from "./TabsItem";

type TabsItems<T> = {
  key: T;
  title: string;
  content: ReactNode;
};

export const Tabs = <T extends string>(props: {
  items: Array<TabsItems<T>>;
  initialTab: T;
}) => {
  const [activeTab, setActiveTab] = useState<T>(props.initialTab);
  return (
    <>
      <div className="tabs-items">
        {props.items.map(item => (
          <TabsItem 
            key={`tab-button-${item.key}`} 
            tabKey={item.key} 
            title={item.title} 
            active={item.key === activeTab}
            onClick={() => setActiveTab(item.key)}
          />
        ))}
      </div>
      <div className="tabs-contents">
        {props.items.filter(item => item.key === activeTab)[0]?.content}
      </div>
    </>
  )
}
