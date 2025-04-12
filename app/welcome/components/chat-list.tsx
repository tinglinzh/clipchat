import { ReactNode } from 'react';
import { MessageType } from './chat-content';
import ChatItem from './chat-item';
import Divider from '~/components/divider';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react'; // 修正 motion 引入
import { useRightClickMenu } from '~/hooks/useRightClickMenu';

export type ChatMessage = {
    id: string;
    avatar: string;
    content: string;
    userId: string;
    time: string;
    type: MessageType;
    role: 'oneself' | 'other';
};

export type ChatMessageList = {
    id: string;
    date: string;
    chatList: ChatMessage[];
};

export const ChatList = ({
    list,
    onDelete,
}: {
    list: ChatMessageList[];
    onDelete: (message: ChatMessage) => void;
}): ReactNode => {
    const { contextMenuRender, bindContextMenu } = useRightClickMenu<ChatMessage>({
        menuItems: (msg) => [
            {
                key: 'delete',
                icon: <Icon icon="ri:delete-bin-5-line" />,
                label: '删除',
                onClick: () => onDelete(msg)
                ,
            },
        ],
    });

    return (
        <div className="relative">
            {list.map((item) => (
                <div className="p-4" key={item.id}>
                    <Divider text={item.date} />
                    <AnimatePresence>
                        {item.chatList.map((chatItem) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.25 }}
                                key={chatItem.id}
                                {...bindContextMenu(chatItem)}
                            >
                                <ChatItem {...chatItem} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ))}

            {/* 右键菜单放最后统一渲染 */}
            {contextMenuRender}
        </div>
    );
};
