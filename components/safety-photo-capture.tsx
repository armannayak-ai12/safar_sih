"use client";

import { useEffect, useRef, useState } from "react";

interface SafetyPhotoCaptureProps {
  onPhotoCaptured?: (file: File) => void;
}

export default function SafetyPhotoCapture({
  onPhotoCaptured,
}: SafetyPhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const openCamera = async () => {
    setError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not supported by this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setError(
        "Camera access was denied or the camera is unavailable."
      );
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setError("Camera is not ready yet. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture the photo.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Unable to create the photo.");
          return;
        }

        const file = new File(
          [blob],
          `safar-safety-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        const previewUrl = URL.createObjectURL(blob);

        setPhotoPreview((previous) => {
          if (previous) {
            URL.revokeObjectURL(previous);
          }

          return previewUrl;
        });

        onPhotoCaptured?.(file);

        stopCamera();
        setIsCameraOpen(false);
      },
      "image/jpeg",
      0.88
    );
  };

  const retakePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoPreview(null);
    openCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  return (
    <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 shadow-xs">
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider">
            Safety evidence
          </span>

          <h2 className="text-lg font-bold text-[#10231c] dark:text-[#f8f4ec] mt-1">
            Capture a safety photo
          </h2>

          <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-1">
            Take a photo of your surroundings or vehicle if you feel
            unsafe. It can be attached to your emergency alert.
          </p>
        </div>

        {photoPreview ? (
          <div className="flex flex-col gap-3">
            <img
              src={photoPreview}
              alt="Safety photo preview"
              className="w-full max-h-80 object-cover rounded-2xl border border-[#e8e2d5] dark:border-[#274539]"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={retakePhoto}
                className="flex-1 px-4 py-3 rounded-xl border border-[#e8e2d5] dark:border-[#274539] text-sm font-bold text-[#10231c] dark:text-[#f8f4ec] hover:border-[#e85b2a] transition-colors"
              >
                Retake
              </button>

              <div className="flex-1 px-4 py-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm font-bold text-center">
                ✓ Photo captured
              </div>
            </div>
          </div>
        ) : isCameraOpen ? (
          <div className="flex flex-col gap-3">
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full max-h-80 object-cover rounded-2xl bg-black"
            />

            <button
              type="button"
              onClick={capturePhoto}
              className="w-full px-5 py-4 rounded-xl bg-[#e85b2a] hover:bg-[#c94d22] text-white font-black transition-colors"
            >
              Capture Photo
            </button>

            <button
              type="button"
              onClick={() => {
                stopCamera();
                setIsCameraOpen(false);
              }}
              className="w-full px-5 py-3 rounded-xl border border-[#e8e2d5] dark:border-[#274539] text-sm font-bold text-[#52635a] dark:text-[#9db0a6]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={openCamera}
            className="w-full px-5 py-4 rounded-xl bg-[#10231c] dark:bg-[#f8f4ec] text-white dark:text-[#10231c] hover:bg-[#e85b2a] dark:hover:bg-[#e85b2a] dark:hover:text-white font-bold transition-colors"
          >
            📸 Take Safety Photo
          </button>
        )}

        {error && (
          <p className="text-xs font-semibold text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}