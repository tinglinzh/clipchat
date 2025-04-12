import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Icon } from "@iconify/react";
interface AudioWaveformProps {
    url: string;
    height?: number;
    waveColor?: string;
    progressColor?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({
    url,
    height = 20,
    waveColor = '#595959',
    progressColor = '#1db149',
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // 如果上一个实例存在，先销毁
        waveSurferRef.current?.destroy();

        if (!containerRef.current) return;

        // 创建新实例
        const ws = WaveSurfer.create({
            container: containerRef.current,
            waveColor,
            progressColor,
            height,
            barGap: 0.1,
            normalize: true,
        });

        waveSurferRef.current = ws;

        // 加载音频
        ws.load(url);

        // 清理函数：组件卸载时销毁 wavesurfer 实例
        return () => {
            ws.destroy();
        };
    }, [url]);

    const togglePlay = () => {
        const ws = waveSurferRef.current;
        if (!ws) return;

        ws.playPause();
        setIsPlaying(ws.isPlaying());
    };

    return (
        <div className="w-[200px] bg-[#2e2e2e] flex items-center p-2 rounded-lg">
            <button
                onClick={togglePlay}
                className="mr-2 w-[26px] h-[26px] flex justify-center items-center rounded-full bg-[#1db149] text-[#2e2e2e] text-lg cursor-pointer hover:bg-[#1db149]"
            >
                <Icon icon={isPlaying ? 'line-md:pause' : 'line-md:play-filled'} key={isPlaying ? 'pause' : 'play'} />
            </button>
            <div ref={containerRef} className="flex-1" />
        </div>
    );
};

export default React.memo(AudioWaveform);
