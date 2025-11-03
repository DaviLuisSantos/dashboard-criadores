// src/features/pipeline/types.ts
export const VIDEO_STATUSES = [
  "Ideia",
  "Roteiro",
  "Gravação",
  "Edição",
  "Upload",
  //"Corte",
  "Publicado",
] as const;

// Cria um tipo a partir do array acima
export type VideoStatus = (typeof VIDEO_STATUSES)[number];

export interface VideoItem {
  id: string; // ID único para o dnd-kit
  title: string;
  status: VideoStatus;
}
