import { ReactNode } from "react";
import { Avatar, ListItemProps, Image, ChatItem as Item } from "@lobehub/ui";
import { MessageType } from "./chat-content";
import { ChatMessage } from "./chat-list";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const ChatItem = (props: ChatMessage) => {
    console.log(props);
    return (
        <div className={`w-4/5 flex mb-4 items-start ${props.role === 'oneself' ? 'flex-row-reverse ml-auto' : ''}`}>
            <Avatar className={props.role === 'oneself' ? '!ml-3' : '!mr-3'} src={props.avatar} size={48} />
            <div className='mt-2 group relative pb-2'>
                <MessageExtra content={props.content} type={props.type} role={props.role} />
                <div className="text-[#c0c0c0] absolute -bottom-3 left-1 hidden  group-hover:block text-[12px] mt-2">{dayjs(props.time).fromNow()}</div>
            </div>
        </div >
    )
}
const MessageExtra = ({ content, type, role, className }: { content: string, type: MessageType, role: 'oneself' | 'other', className?: string }) => {
    switch (type) {
        case MessageType.text:
        case MessageType.markdown:
            return <div className={className + ` h-auto rounded-xl flex-1 p-2 ${role === 'oneself' ? 'bg-[#3b3b3b]' : 'bg-[#323232]'}`} >
                {content}
            </div>;

        case MessageType.image:
            return <Image
                className="!h-32"
                src={content}
            />;

        case MessageType.code:
            return (
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{content}</code>
                </pre>
            );

        case MessageType.audio:
            return <audio controls src={content} className="w-full" />;

        case MessageType.video:
            return <video controls src={content} className="w-full rounded-md" />;

        case MessageType.link:
            return <a href={content} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{content}</a>;

        case MessageType.html:
            return <div dangerouslySetInnerHTML={{ __html: content }} />;

        case MessageType.json:
        case MessageType.xml:
        case MessageType.csv:
        case MessageType.tsv:
            return (
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{content}</code>
                </pre>
            );

        default:
            return <div className="text-gray-500 italic">Unsupported message type</div>;
    }
}


export default ChatItem