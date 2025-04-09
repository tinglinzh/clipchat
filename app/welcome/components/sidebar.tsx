import type { ReactNode } from "react";
import { SearchBar, SearchBarProps } from '@lobehub/ui';
import { ActionIcon, Avatar, List, ListItemProps } from '@lobehub/ui';
const { Item } = List
// 保持函数组件形式，这样可以添加更多内容和逻辑
const Sidebar = (): ReactNode => {
    const items: ListItemProps[] = [
        {
            active: false,
            avatar: <Avatar size={40} avatar={'😊'} />,
            date: Date.now(),
            description: 'Description 1',
            title: 'Item 1',
        },
        {
            active: false,
            avatar: <Avatar size={40} avatar={'😊'} />,
            date: Date.now(),
            description: 'Description 2',
            title: 'Item 2',
        },
    ];
    return (
        <div className="p-4 h-[70vh] flex flex-col gap-4">
            <SearchBar className="w-full" type="block" placeholder="Search" enableShortKey spotlight />
            <div className="flex-1 flex-col">
                {items.map((item, index) => (
                    <Item className="rounded-lg !py-2" key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;