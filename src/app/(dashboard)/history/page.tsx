// src/app/(dashboard)/history/page.tsx
"use client";

import { Calendar, dateFnsLocalizer, EventProps } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ptBR from "date-fns/locale/pt-BR";
import Image from "next/image";

// 1. Configuração do Localizer para Português-Brasil
const locales = {
  "pt-BR": ptBR,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 2. Interface para nossos eventos de vídeo
interface VideoEvent {
  title: string;
  start: Date;
  end: Date;
  resource: {
    thumbnailUrl: string;
  };
}

// 3. Dados Mocados (no futuro, virão da API)
const publishedVideos: VideoEvent[] = [
  {
    title: "O Guia DEFINITIVO de Next.js 14",
    start: new Date(2025, 9, 28), // Mês é 0-indexado, então 9 = Outubro
    end: new Date(2025, 9, 28),
    resource: { thumbnailUrl: "/placeholder-thumb.png" },
  },
  {
    title: "TypeScript e Zod: Validação Nível Sênior",
    start: new Date(2025, 10, 4), // 10 = Novembro
    end: new Date(2025, 10, 4),
    resource: { thumbnailUrl: "/placeholder-thumb.png" },
  },
  {
    title: "Tailwind CSS: 5 Truques Essenciais",
    start: new Date(2025, 10, 11),
    end: new Date(2025, 10, 11),
    resource: { thumbnailUrl: "/placeholder-thumb.png" },
  },
];

// 4. Mensagens do calendário em Português
const messages = {
  allDay: "Dia todo",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Não há vídeos neste período.",
  showMore: (total: number) => `+ Ver mais (${total})`,
};

// 5. Componente customizado para renderizar o evento no calendário
function CustomEvent({ event }: EventProps<VideoEvent>) {
  return (
    <div className="flex h-full items-center gap-2 overflow-hidden">
      <Image
        src={event.resource.thumbnailUrl}
        alt={event.title}
        width={40}
        height={22}
        className="rounded-sm object-cover"
      />
    </div>
  );
}

export default function HistoryPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Histórico de Publicações</h1>
      <div className="h-[70vh] rounded-lg bg-gray-800 p-4 text-white">
        <Calendar
          localizer={localizer}
          events={publishedVideos}
          startAccessor="start"
          endAccessor="end"
          culture="pt-BR"
          messages={messages}
          eventPropGetter={() => ({
            // ANTES: className: "!bg-blue-600..."
            // DEPOIS: Adicionamos uma classe customizada e mantemos as cores.
            className:
              "custom-video-event !bg-blue-600 hover:!bg-blue-700 !border-blue-500",
          })}
          components={{
            event: CustomEvent,
          }}
        />
      </div>
    </section>
  );
}
