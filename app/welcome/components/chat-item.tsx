import { memo, ReactNode } from "react";
import { Avatar, Image } from "@lobehub/ui";
import { MessageType } from "./chat-content";
import { ChatMessage } from "./chat-list";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import AudioWaveform from "~/components/audio-waveform"

dayjs.extend(relativeTime)
const ChatItem = memo((props: ChatMessage): ReactNode => {
    const { avatar, role, time, content, type } = props;

    console.log("ChatItem rendered:", props); // ✅ 只有真正变更时才触发

    return (
        <div className={`w-4/5 flex mb-4 items-start ${role === 'oneself' ? 'flex-row-reverse ml-auto' : ''}`}>
            <Avatar className={role === 'oneself' ? '!ml-3' : '!mr-3'} src={avatar} size={42} />
            <div className='mt-2 group relative pb-2'>
                <MessageExtra content={content} type={type} role={role} />
                <div className="text-[#c0c0c0] absolute -bottom-3 left-1 hidden group-hover:block text-[12px] mt-2">
                    {dayjs(time).fromNow()}
                </div>
            </div>
        </div>
    );
});
const MessageExtra = ({ content, type, role, className = '' }: { content: string, type: MessageType, role: 'oneself' | 'other', className?: string }) => {
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
            return <AudioWaveform url={content} />

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