"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Share2,
  Copy,
  Check,
  FileText,
  Youtube,
  Volume2,
  Calendar,
  Languages
} from "lucide-react";
import { PrayerResource } from "@/types";
import AudioPlayerCompact from "./AudioPlayerCompact";

interface ResourceDetailModalProps {
  resource: PrayerResource | null;
  onClose: () => void;
}

export default function ResourceDetailModal({
  resource,
  onClose
}: ResourceDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!resource) return null;

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.description,
          url
        });
      } catch {
        // Share cancelled or unavailable
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(`${resource.title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={resource.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#e7dec8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        {resource.coverImage ? (
          <div className="relative h-60 w-full bg-[#10233f]">
            <Image
              src={resource.coverImage}
              alt={resource.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="rounded-full bg-[#10233f]/90 px-3 py-0.5 text-xs font-bold text-[#d8bb73] border border-[#d8bb73]/30 uppercase tracking-wider">
                {resource.type}
              </span>
              <h2 className="mt-2 text-2xl font-bold">{resource.title}</h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-4">
            <div>
              <span className="rounded-full bg-[#f2eee5] px-3 py-0.5 text-xs font-bold text-[#10233f] uppercase tracking-wider">
                {resource.type}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#10233f]">
                {resource.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1">
              <Languages className="h-3.5 w-3.5 text-[#b18a3d]" /> {resource.language}
            </span>
            {resource.feastDay && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#b18a3d]" /> {resource.feastDay}
              </span>
            )}
            {resource.reference && (
              <span className="text-[#b18a3d]">• {resource.reference}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-700">
            {resource.description}
          </p>

          {/* Audio Player if available */}
          {resource.audioUrl && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10233f]">
                <Volume2 className="h-4 w-4 text-[#b18a3d]" /> Audio Recording
              </div>
              <AudioPlayerCompact src={resource.audioUrl} title={resource.title} />
            </div>
          )}

          {/* Detailed Content */}
          {resource.content && (
            <div className="rounded-2xl bg-[#fbf8f1] p-6 border border-[#e7dec8] text-sm leading-relaxed text-slate-800 whitespace-pre-line font-serif">
              {resource.content}
            </div>
          )}

          {/* PDF & YouTube links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {resource.pdfUrl && (
              <a
                href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#10233f] px-4 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#18365f]"
              >
                <FileText className="h-4 w-4 text-[#d8bb73]" /> Download PDF
              </a>
            )}
            {resource.youtubeUrl && (
              <a
                href={resource.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold uppercase text-white hover:bg-red-700"
              >
                <Youtube className="h-4 w-4" /> Watch on YouTube
              </a>
            )}
          </div>

          {/* Share Section */}
          <div className="border-t border-slate-100 pt-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Share this resource:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </button>
              <button
                type="button"
                onClick={shareWhatsApp}
                className="flex items-center gap-1.5 rounded-xl bg-green-600/10 px-3.5 py-2 text-xs font-semibold text-green-700 hover:bg-green-600/20"
              >
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={shareFacebook}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600/10 px-3.5 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-600/20"
              >
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
