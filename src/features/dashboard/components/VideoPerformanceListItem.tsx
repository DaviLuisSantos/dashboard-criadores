// src/features/dashboard/components/VideoPerformanceListItem.tsx
import Image from "next/image";
import { ThumbsUp, MessageCircle, Eye } from "lucide-react";

interface VideoPerformanceListItemProps {
  thumbnailUrl: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
}

export function VideoPerformanceListItem({
  thumbnailUrl,
  title,
  views,
  likes,
  comments,
}: VideoPerformanceListItemProps) {
  // Formata números grandes (ex: 1500 -> 1.5k, 1200000 -> 1.2M)
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("pt-BR", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };

  return (
    <li className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-800/50">
      <Image
        src={thumbnailUrl}
        alt={`Thumbnail do vídeo ${title}`}
        width={120}
        height={68}
        className="rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="line-clamp-2 font-semibold text-white">{title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Eye size={16} /> {formatNumber(views)}
          </span>
          <span className="flex items-center gap-1.5">
            <ThumbsUp size={16} /> {formatNumber(likes)}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle size={16} /> {formatNumber(comments)}
          </span>
        </div>
      </div>
    </li>
  );
}
