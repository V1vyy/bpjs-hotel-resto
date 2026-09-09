"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export type ConfirmVariant = "warning" | "danger" | "success";

export interface ConfirmDialogProps {
  variant: ConfirmVariant;
  title: string;
  message?: string;
  cancelLabel?: string;
  confirmLabel: string;
  loading?: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  variant,
  title,
  message,
  cancelLabel = "Batal",
  confirmLabel,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 animate-fade-in"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl animate-pop-in">
        <div className="mb-4 flex justify-center">
          {variant === "warning" && <WarningIcon />}
          {variant === "danger" && <DangerIcon />}
          {variant === "success" && <SuccessIcon />}
        </div>

        <p className="mb-1 text-base font-semibold text-gray-900">{title}</p>
        {message && <p className="mb-5 text-sm text-gray-500">{message}</p>}
        {!message && <div className="mb-2" />}

        <div className={cn("flex gap-3", !onCancel && "justify-center")}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            autoFocus
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-60",
              variant === "danger" && "bg-red-500 hover:bg-red-600",
              variant === "warning" && "bg-gray-200 !text-gray-800 hover:bg-gray-300",
              variant === "success" && "bg-brand-green hover:bg-brand-green/90"
            )}
          >
            {loading ? "Memproses..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 4l13 22H2L15 4z"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M15 12v6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="22" r="1.4" fill="#F59E0B" />
      </svg>
    </span>
  );
}

function DangerIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M7 7l12 12M19 7L7 19"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function SuccessIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path
          d="M6 13.5l5 5 9-11"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
