import { DraggablePanel, DraggablePanelProps, ActionsBar, ChatListProps, EmojiPicker } from '@lobehub/ui';
import { ReactNode, use, useState } from 'react';
import { Icon } from "@iconify/react";
// import { ChatItem } from '@lobehub/ui';
import { ChatList, ChatMessage, ChatMessageList } from './chat-list';
import { ChatInputActionBar, ChatInputArea, ChatSendButton, TokenTag } from '@lobehub/ui/chat';
export enum MessageType {
    text = 'text',
    image = 'image',
    code = 'code',
    table = 'table',
    audio = 'audio',
    video = 'video',
    file = 'file',
    link = 'link',
    embed = 'embed',
    markdown = 'markdown',
    html = 'html',
    json = 'json',
    xml = 'xml',
    csv = 'csv',
    tsv = 'tsv',
}
const data: ChatMessageList[] = [
    {
        id: '22',
        date: '2025-4-11',
        chatList: [{
            content: 'dayjs 如何使用 fromNow',
            time: '2025-4-11 09:00:00',
            id: '1',
            avatar: 'https://paper-clip.space/images/avatar.png',
            role: 'oneself',
            type: MessageType.text,
            userId: '23'
        },
        {
            content: '这样使用...',
            time: '2025-4-11 09:00:00',
            id: '4',
            avatar: 'https://avatars.githubusercontent.com/u/17870709?v=4',
            role: 'other',
            type: MessageType.text,
            userId: '25'
        },
        {
            content: 'https://paper-clip.space/images/project/ai-greatwall.png',
            time: '2025-4-11 09:10:00',
            id: '7',
            avatar: 'https://paper-clip.space/images/avatar.png',
            role: 'oneself',
            type: MessageType.image,
            userId: '23'
        }, {
            content: '/public/1.mp3',
            time: '2025-4-11 09:10:00',
            id: '5',
            avatar: 'https://paper-clip.space/images/avatar.png',
            role: 'oneself',
            type: MessageType.audio,
            userId: '23'
        }],
    },
];
const ChatContent = (): ReactNode => {
    const [inputVal, setInputVal] = useState('');
    const [chatList, setChatList] = useState<ChatMessageList[]>(data)

    function handleSend() {
    }


    function handleDelete(message: ChatMessage) {
        const newList = chatList.map((item) => {
            return {
                ...item,
                chatList: item.chatList.filter((msg) => msg.id !== message.id),
            };
        });
        setChatList(newList);
    }
    function handleSelectEmoji(emoji: string) {
        setInputVal((val) => val + emoji);
    }
    return (
        <div className='flex flex-col h-full pt-[64px]'>
            <div className='flex-1 overflow-y-auto'>
                <ChatList
                    list={chatList}
                    onDelete={handleDelete}
                />
            </div>
            <DraggablePanel placement='bottom' maxHeight={300}>
                <ChatInputArea
                    className='!bg-[#292929]'
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    bottomAddons={<ChatSendButton onSend={handleSend} />}
                    topAddons={
                        <ChatInputActionBar
                            leftAddons={
                                <>
                                    <EmojiPicker lang='zh' size={32} className=' hover:!shadow-none' onChange={(emoji) => handleSelectEmoji(emoji)} />
                                    <Icon icon="icon-park:clear" onClick={() => setInputVal('')} className='cursor-pointer' fontSize={24} />
                                </>
                            }
                        />
                    }
                />
            </DraggablePanel>
        </div>
    )
}

export default ChatContent