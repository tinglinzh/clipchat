import { ReactNode } from 'react';
import { MessageType } from './chat-content';
import ChatItem from './chat-item';
import Divider from '~/components/divider';
export type ChatMessage = {
    id: string,
    avatar: string,
    content: string,
    userId: string,
    time: string,
    type: MessageType,
    role: 'oneself' | 'other'
}

export type ChatMessageList = {
    id: string,
    date: string,
    chatList: ChatMessage[]
}
export const ChatList = ({ list }: { list: ChatMessageList[] }): ReactNode => {
    return (
        <div>
            {
                list.map((item) => {
                    return (
                        <div className='p-4'>
                            <Divider text={item.date} />
                            {item.chatList.map((chatItem) => {
                                return (
                                    <ChatItem {...chatItem} />
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}
