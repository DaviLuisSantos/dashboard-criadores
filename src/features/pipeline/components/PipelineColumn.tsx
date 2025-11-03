// src/features/pipeline/components/PipelineColumn.tsx
"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { VideoItem, VideoStatus } from "../types";
import { VideoCard } from "./VideoCard";

interface PipelineColumnProps {
  status: VideoStatus;
  videos: VideoItem[];
}

export function PipelineColumn({ status, videos }: PipelineColumnProps) {
  const { setNodeRef } = useSortable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="flex h-full w-72 flex-shrink-0 flex-col rounded-md bg-gray-800/50"
    >
      <div className="p-4">
        <h3 className="font-semibold text-white">{status}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        {/* O SortableContext precisa saber quais IDs ele está gerenciando */}
        <SortableContext items={videos.map((v) => v.id)}>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
