// src/app/(dashboard)/pipeline/page.tsx
"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PipelineColumn } from "@/features/pipeline/components/PipelineColumn";
import {
  VideoItem,
  VideoStatus,
  VIDEO_STATUSES,
} from "@/features/pipeline/types";
import { VideoCard } from "@/features/pipeline/components/VideoCard";

// Dados mocados iniciais
const initialVideos: VideoItem[] = [
  { id: "vid-1", title: "Como configurar Neovim para React", status: "Ideia" },
  { id: "vid-2", title: "Unboxing novo microfone Rode", status: "Ideia" },
  { id: "vid-3", title: "Roteiro do vídeo sobre Deno", status: "Roteiro" },
  {
    id: "vid-4",
    title: "Gravação do review do monitor LG Ultrawide",
    status: "Gravação",
  },
  {
    id: "vid-5",
    title: "Edição final do tutorial de Docker",
    status: "Edição",
  },
  { id: "vid-6", title: "Vídeo sobre Zustand vs Redux", status: "Publicado" },
];

export default function PipelinePage() {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const findVideo = (id: string) => videos.find((v) => v.id === id);

  // Helper para encontrar a coluna de um item (card ou coluna)
  const findContainer = (id: string): VideoStatus | undefined => {
    if (VIDEO_STATUSES.includes(id as VideoStatus)) {
      return id as VideoStatus;
    }
    return findVideo(id)?.status;
  };

  // Lógica quando o arraste COMEÇA
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const video = findVideo(active.id as string);
    if (video) {
      setActiveVideo(video);
    }
  };

  // Lógica enquanto o item é arrastado SOBRE outros
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return; // Não faz nada se estiver na mesma coluna
    }

    // Atualiza o status do vídeo em tempo real
    setVideos((prev) => {
      const activeIndex = prev.findIndex((v) => v.id === active.id);
      if (activeIndex !== -1) {
        prev[activeIndex].status = overContainer;
        return [...prev]; // Retorna um novo array para forçar a re-renderização
      }
      return prev;
    });
  };

  // Lógica quando o arraste TERMINA
  const handleDragEnd = (event: DragEndEvent) => {
    // A lógica de mover entre colunas já foi feita no onDragOver.
    // Aqui poderíamos adicionar lógica para reordenar DENTRO da mesma coluna se necessário.
    // Por enquanto, apenas limpamos o estado do card ativo.
    setActiveVideo(null);
  };

  return (
    <div className="h-[calc(100vh-150px)] overflow-x-auto">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full gap-6">
          <SortableContext
            items={VIDEO_STATUSES}
            strategy={horizontalListSortingStrategy}
          >
            {VIDEO_STATUSES.map((status) => (
              <PipelineColumn
                key={status}
                status={status}
                videos={videos.filter((v) => v.status === status)}
              />
            ))}
          </SortableContext>
        </div>

        {/* O DragOverlay para o "fantasma" fluido */}
        <DragOverlay>
          {activeVideo ? <VideoCard video={activeVideo} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
