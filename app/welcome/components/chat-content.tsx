import { DraggablePanel, DraggablePanelProps, ActionsBar, ChatListProps, EmojiPicker } from '@lobehub/ui';
import { ReactNode, useState } from 'react';
import ChatItem from './chat-item';
// import { ChatItem } from '@lobehub/ui';
import { ChatList, ChatMessageList } from './chat-list';
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
        id: '1',
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
            id: '1',
            avatar: 'https://avatars.githubusercontent.com/u/17870709?v=4',
            role: 'other',
            type: MessageType.text,
            userId: '25'
        },
        {
            content: 'https://paper-clip.space/images/project/ai-greatwall.png',
            time: '2025-4-11 09:10:00',
            id: '1',
            avatar: 'https://paper-clip.space/images/avatar.png',
            role: 'oneself',
            type: MessageType.image,
            userId: '23'
        },],
    },
];
const ChatContent = (): ReactNode => {
    const [inputVal, setInputVal] = useState('');

    function handleSend() {
    }
    function handleSelectEmoji(emoji: string) {
        setInputVal(inputVal + emoji);
    }
    return (
        <div className='flex flex-col h-full pt-[64px]'>
            <div className='flex-1 overflow-y-auto'>
                <ChatList
                    list={data}
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
                                    <EmojiPicker size={32} className=' hover:!shadow-none' onChange={(emoji) => handleSelectEmoji(emoji)} />
                                    <TokenTag maxValue={5000} value={1000} />
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