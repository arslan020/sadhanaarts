function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? null;
}

function vimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? null;
}

export default function VideoEmbed({
  url,
  title,
  className = "",
}: {
  url: string;
  title?: string;
  className?: string;
}) {
  const src = url.trim();
  const yt = youtubeId(src);
  const vimeo = vimeoId(src);
  const isFile = /\.(mp4|webm|ogg)(\?|$)/i.test(src);
  const embed = yt
    ? `https://www.youtube.com/embed/${yt}`
    : vimeo
      ? `https://player.vimeo.com/video/${vimeo}`
      : null;

  if (embed) {
    return (
      <div className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-gold/30 ${className}`}>
        <iframe
          src={embed}
          title={title || "Video"}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isFile) {
    return (
      <video
        src={src}
        controls
        className={`aspect-video w-full rounded-2xl object-cover shadow-sm ring-1 ring-gold/30 ${className}`}
      />
    );
  }

  return null;
}
