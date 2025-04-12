import { useState, useCallback, useEffect, useRef } from 'react';
import { ContextMenu } from '@lobehub/ui';

type MenuItem = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
};

type UseRightClickMenuOptions<T> = {
    menuItems: (data: T) => MenuItem[];
};

export function useRightClickMenu<T>(options: UseRightClickMenuOptions<T>) {
    const [menuData, setMenuData] = useState<{ x: number; y: number; data: T } | null>(null);

    const bindContextMenu = useCallback((data: T) => {
        return {
            onContextMenu: (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuData({
                    x: e.clientX,
                    y: e.clientY,
                    data,
                });
            },
        };
    }, []);

    const closeMenu = () => setMenuData(null);

    useEffect(() => {
        if (!menuData) return;

        const handleClickOutside = (e: MouseEvent) => {
            let dom = document.querySelector('.clip-chat-context-menu')
            if (!dom?.contains(e.target as Node)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuData]);

    const contextMenuRender = menuData ? (
        <div
            className="fixed z-50"
            style={{ top: menuData.y, left: menuData.x }}
            onClick={(e) => e.stopPropagation()}
        >
            <ContextMenu
                open={true}
                rootClassName='clip-chat-context-menu'
                menu={{
                    items: options.menuItems(menuData.data),
                    onClick: closeMenu,
                }}
            />
        </div>
    ) : null;

    return {
        contextMenuRender,
        bindContextMenu,
        closeMenu,
    };
}
