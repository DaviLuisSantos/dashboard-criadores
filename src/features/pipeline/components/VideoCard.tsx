// src/features/pipeline/components/VideoCard.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { VideoItem } from "../types";

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // Útil para estilização
  } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Deixa o card semitransparente ao arrastar
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="mb-3 touch-none rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <p className="flex-1 text-sm font-medium text-white">{video.title}</p>
        {/* O 'listeners' deve ser aplicado no elemento que servirá de "alça" */}
        <button
          {...listeners}
          className="cursor-grab text-gray-500 hover:text-white"
        >
          <GripVertical size={20} />
        </button>
      </div>
    </div>
  );
}
