import { useEffect, useRef } from "react";

const PreviewImage = ({
  visible,
  onClose,
  imageUrl,
}: {
  visible: boolean;
  onClose: () => void;
  imageUrl: string | undefined;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (container) {
      container.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("keydown", handleKeyDown);

      container
        .requestFullscreen()
        .then()
        .catch((error) => {
          console.error("Error entering fullscreen mode:", error);
        });

      return () => {
        container.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener("keydown", handleKeyDown);

        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      };
    }
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black text-white bg-opacity-30 backdrop-blur-sm w-full h-full"
    >
      <img
        src={imageUrl}
        className="w-full h-full object-cover"
        alt="Wallpaper"
      />
    </div>
  );
};

export default PreviewImage;
