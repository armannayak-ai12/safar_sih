"use client";

import { useState, useEffect } from "react";
import SafetyPhotoCapture from "./safety-photo-capture";
import Link from "next/link";

// ====================================================
// ICONS (Clean Inline SVGs, Accessible & Dependency-Free)
// ====================================================
const ShieldIcon = ({ className = "" }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ShieldAlertIcon = ({ className = "" }: { className?: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PhoneCallIcon = ({ className = "" }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

// ====================================================
// TYPES & DATA STRUCTURES
// ====================================================
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface SafarSafeViewProps {
  tripId?: string;
}

const RELATIONSHIP_OPTIONS = [
  "Mother",
  "Father",
  "Sibling",
  "Friend",
  "Other",
] as const;

export default function SafarSafeView({ tripId = "safar-jp-101" }: SafarSafeViewProps) {
  // 1. Emergency Contact State
  const [contact, setContact] = useState<EmergencyContact | null>({
    name: "Mom",
    phone: "+91 98765 43210",
    relationship: "Mother",
  });

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [formName, setFormName] = useState("Mom");
  const [formPhone, setFormPhone] = useState("+91 98765 43210");
  const [formRelationship, setFormRelationship] = useState<string>("Mother");
  const [validationError, setValidationError] = useState<string | null>(null);

  // 2. SOS Workflow States
  const [isSosConfirmOpen, setIsSosConfirmOpen] = useState(false);
  const [isSosActivated, setIsSosActivated] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  // 3. Location State (Safe, non-continuous)
  const [locationText, setLocationText] = useState("Near MI Road, Jaipur (26.9124° N, 75.7873° E)");
  const [isLocationUpdating, setIsLocationUpdating] = useState(false);

  // Auto-fill form fields when editing begins
  const handleStartEdit = () => {
    if (contact) {
      setFormName(contact.name);
      setFormPhone(contact.phone);
      setFormRelationship(contact.relationship);
    } else {
      setFormName("");
      setFormPhone("");
      setFormRelationship("Mother");
    }
    setValidationError(null);
    setIsEditingContact(true);
  };

  // Save Emergency Contact
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formName.trim();
    const cleanDigits = formPhone.replace(/[^0-9]/g, "");

    if (!cleanName) {
      setValidationError("Please enter the contact's name.");
      return;
    }
    if (cleanDigits.length < 10) {
      setValidationError("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    setContact({
      name: cleanName,
      phone: formPhone.trim(),
      relationship: formRelationship,
    });
    setValidationError(null);
    setIsEditingContact(false);
  };

  // Remove Emergency Contact
  const handleRemoveContact = () => {
    setContact(null);
    setFormName("");
    setFormPhone("");
    setFormRelationship("Mother");
    setIsEditingContact(true);
  };

  // SOS Triggers
  const handleTapSos = () => {
    setIsSosConfirmOpen(true);
  };

  const handleCancelSos = () => {
    setIsSosConfirmOpen(false);
  };

  const handleContinueSos = () => {
    setIsSosConfirmOpen(false);
    setIsSosActivated(true);
    setWhatsappOpened(false);
  };

  const handleDeactivateSos = () => {
    setIsSosActivated(false);
    setWhatsappOpened(false);
  };

  // WhatsApp Alert Action
  const handleSendWhatsApp = () => {
    const recipientPhone = contact ? contact.phone.replace(/[^0-9]/g, "") : "";
    const formattedPhone = recipientPhone.length === 10 ? `91${recipientPhone}` : recipientPhone;

    const messageText = `🚨 SAFAR SOS ALERT

I may need emergency assistance.

Name: Traveller
Trip: Jaipur Railway Station → Hawa Mahal
Trip ID: ${tripId}
Current location: ${locationText}

Please contact me immediately.`;

    const encoded = encodeURIComponent(messageText);
    const url = formattedPhone
      ? `https://wa.me/${formattedPhone}?text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
      setWhatsappOpened(true);
    }
  };

  // Safe manual GPS update
  const handleRefreshLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return;
    }
    setIsLocationUpdating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationText(`GPS Position (${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E)`);
        setIsLocationUpdating(false);
      },
      () => {
        setIsLocationUpdating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="dashboard-canvas max-w-4xl mx-auto flex flex-col gap-7 py-2 pb-16">
      {/* TOP BREADCRUMB / BACK */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52635a] hover:text-[#e85b2a] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors"
        >
          <span>← Back to SAFAR</span>
        </Link>
        <span className="text-[11px] font-bold text-[#8a9990] uppercase tracking-wider">
          Trip Safety Center
        </span>
      </div>

      {/* SECTION 1 — SAFAR SAFE HEADER */}
      <header className="border-b border-[#e8e2d5] dark:border-[#274539] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#e85b2a] uppercase">
              SAFAR SAFE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10231c] dark:text-[#f8f4ec] mt-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            You&apos;re never travelling alone.
          </h1>
          <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] mt-1 max-w-xl">
            Keep a trusted contact ready in case something goes wrong during your journey.
          </p>
        </div>

        {/* Compact Safety Status Badge */}
        <div className="self-start sm:self-auto flex-shrink-0">
          {contact ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>✓ Emergency contact configured</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>! Add an emergency contact</span>
            </div>
          )}
        </div>
      </header>

      {/* SECTION 4 — SOS ACTIVATED OVERLAY / BANNER (Visible when SOS is active) */}
      {isSosActivated && (
        <section
          role="alert"
          aria-live="assertive"
          className="bg-red-50 dark:bg-red-950/50 border-2 border-red-600 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-red-200 dark:border-red-900 pb-5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <ShieldAlertIcon className="animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest mb-1">
                  EMERGENCY ACTIVE
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-red-900 dark:text-red-100 tracking-tight">
                  SOS ACTIVATED
                </h2>
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 mt-1">
                  Your emergency options are ready. Reach your family and local authorities now.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDeactivateSos}
              className="self-start sm:self-auto px-4 py-2 rounded-xl border border-red-300 dark:border-red-800 text-xs font-bold text-red-800 dark:text-red-300 hover:bg-white dark:hover:bg-red-900/60 transition-colors cursor-pointer"
            >
              Deactivate SOS / I am safe
            </button>
          </div>

          <SafetyPhotoCapture
            onPhotoCaptured={(file) => {
              console.log("Safety photo captured:", file);
            }}
          />

          {/* Alerting Contact Info */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#16281f] border border-red-200 dark:border-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                Alerting:
              </span>
              <div className="text-base font-bold text-[#10231c] dark:text-[#f8f4ec]">
                {contact ? `${contact.name} (${contact.relationship})` : "No contact configured"}
              </div>
              <div className="text-xs font-medium text-[#52635a] dark:text-[#9db0a6]">
                {contact ? contact.phone : "Configure a contact below to dispatch direct alerts"}
              </div>
            </div>
            <span className="text-[11px] text-red-700 dark:text-red-300 font-semibold">
              Ready for one-tap dispatch
            </span>
          </div>

          {/* TWO PRIMARY EMERGENCY ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ACTION 1: WHATSAPP ALERT */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-base font-black shadow-md flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <WhatsAppIcon />
                <span>Send WhatsApp Alert</span>
              </button>

              {whatsappOpened ? (
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold text-center">
                  ✓ WhatsApp opened — send the message to your emergency contact.
                </div>
              ) : (
                <p className="text-[11px] text-center text-[#52635a] dark:text-[#9db0a6]">
                  Pre-fills SOS message with your trip and location details.
                </p>
              )}
            </div>

            {/* ACTION 2: POLICE CALL (112) */}
            <div className="flex flex-col gap-2">
              <a
                href="tel:112"
                className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-base font-black shadow-md flex items-center justify-center gap-3 transition-all text-center"
              >
                <PhoneCallIcon />
                <span>Call Police</span>
              </a>

              <div className="text-center">
                <span className="text-xs font-bold text-red-700 dark:text-red-400 block">
                  Emergency number: 112
                </span>
                <span className="text-[11px] text-[#8a9990] block mt-0.5">
                  Calling works on supported phones/devices.
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3 — ACTIVE TRIP SAFETY CARD */}
      <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8e2d5] dark:border-[#274539]">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#10231c] dark:text-[#f8f4ec]">
              SAFAR IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8a9990] uppercase tracking-wider">
              Trip Status:
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#10231c] dark:text-[#f8f4ec]">
              <span className="flex items-center gap-1.5">
                <MapPinIcon />
                <span>Jaipur Railway Station</span>
              </span>
              <span className="text-[#e85b2a]">→</span>
              <span className="flex items-center gap-1.5">
                <MapPinIcon />
                <span>Hawa Mahal</span>
              </span>
            </div>

            {/* Vehicle & Driver Details */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Driver
                </span>
                <span className="text-sm font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5 block">
                  Raj Kumar
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
                  Vehicle
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CarIcon />
                  <span className="text-sm font-bold text-[#10231c] dark:text-[#f8f4ec]">
                    RJ 14 AB 1234
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VERY PROMINENT SOS BUTTON */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#fdf3ee] dark:bg-[#251814] border border-[#f5c7b3] dark:border-[#4d281d]">
            <button
              type="button"
              onClick={handleTapSos}
              className="w-full py-5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.97] text-white text-2xl sm:text-3xl font-black tracking-widest shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShieldIcon />
              <span>SOS</span>
            </button>
            <span className="text-[11px] font-bold text-red-700 dark:text-red-400 mt-2 tracking-wide uppercase">
              Use only in an emergency
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — EMERGENCY CONTACT CARD */}
      <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[#e8e2d5] dark:border-[#274539] pb-4">
          <div className="flex items-center gap-2">
            <UserIcon />
            <h2 className="text-base sm:text-lg font-bold text-[#10231c] dark:text-[#f8f4ec]">
              Emergency contact
            </h2>
          </div>
          {contact && !isEditingContact && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e8e2d5] dark:border-[#274539] text-xs font-bold text-[#52635a] hover:text-[#10231c] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] hover:border-[#e85b2a] transition-all cursor-pointer"
              >
                <EditIcon />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={handleRemoveContact}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e8e2d5] dark:border-[#274539] text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer"
              >
                <TrashIcon />
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>

        {/* Display Saved Contact OR Form */}
        {contact && !isEditingContact ? (
          <div className="p-5 rounded-2xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a9990] block">
                Primary Emergency Contact
              </span>
              <h3 className="text-lg font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5">
                {contact.name}
              </h3>
              <p className="text-sm font-semibold text-[#52635a] dark:text-[#9db0a6] mt-0.5">
                {contact.phone}
              </p>
            </div>

            <div className="self-start sm:self-auto">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#16281f] border border-[#e8e2d5] dark:border-[#274539] text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                {contact.relationship}
              </span>
            </div>
          </div>
        ) : (
          /* Form to Add / Edit Contact */
          <form onSubmit={handleSaveContact} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                  Full name <span className="text-[#e85b2a]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Mom"
                  className="px-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-xs sm:text-sm text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-phone" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                  Phone number <span className="text-[#e85b2a]">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="px-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-xs sm:text-sm text-[#10231c] dark:text-[#f8f4ec] placeholder-[#8a9990] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all"
                />
              </div>

              {/* Relationship */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-relationship" className="text-xs font-bold text-[#10231c] dark:text-[#f8f4ec]">
                  Relationship
                </label>
                <select
                  id="contact-relationship"
                  value={formRelationship}
                  onChange={(e) => setFormRelationship(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] rounded-xl text-xs sm:text-sm text-[#10231c] dark:text-[#f8f4ec] outline-none focus:border-[#e85b2a] focus:ring-2 focus:ring-[#e85b2a]/15 transition-all"
                >
                  {RELATIONSHIP_OPTIONS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {validationError && (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                {validationError}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#10231c] dark:bg-[#f8f4ec] hover:bg-[#e85b2a] dark:hover:bg-[#e85b2a] text-white dark:text-[#10231c] dark:hover:text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                Save emergency contact
              </button>

              {contact && (
                <button
                  type="button"
                  onClick={() => setIsEditingContact(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#e8e2d5] dark:border-[#274539] text-xs font-bold text-[#52635a] hover:text-[#10231c] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </section>

      {/* SECTION 5 — LOCATION CARD */}
      <section className="bg-white dark:bg-[#16281f] rounded-3xl border border-[#e8e2d5] dark:border-[#274539] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#fbf9f4] dark:bg-[#10231c] border border-[#e8e2d5] dark:border-[#274539] text-[#e85b2a] flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPinIcon />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#8a9990] uppercase tracking-wider block">
              Your location
            </span>
            <div className="text-sm font-bold text-[#10231c] dark:text-[#f8f4ec] mt-0.5">
              📍 {locationText}
            </div>
            <p className="text-xs text-[#52635a] dark:text-[#9db0a6] mt-1">
              Location sharing will be connected to live trip tracking.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefreshLocation}
          disabled={isLocationUpdating}
          className="self-start sm:self-auto text-xs font-bold text-[#52635a] dark:text-[#9db0a6] hover:text-[#e85b2a] px-3 py-1.5 rounded-xl border border-[#e8e2d5] dark:border-[#274539] transition-colors cursor-pointer"
        >
          {isLocationUpdating ? "Detecting GPS..." : "Refresh Location"}
        </button>
      </section>

      {/* SOS CONFIRMATION MODAL */}
      {isSosConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sos-modal-title"
            className="w-full max-w-md bg-white dark:bg-[#16281f] rounded-3xl border-2 border-red-500 p-6 sm:p-7 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center flex-shrink-0">
                <ShieldAlertIcon />
              </div>
              <h3 id="sos-modal-title" className="text-lg sm:text-xl font-bold text-[#10231c] dark:text-[#f8f4ec] tracking-tight">
                Are you sure you need emergency help?
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#52635a] dark:text-[#9db0a6] leading-relaxed">
              This will prepare an emergency alert for your trusted contact and give you the option to call police.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelSos}
                className="px-5 py-2.5 rounded-xl border border-[#e8e2d5] dark:border-[#274539] text-xs sm:text-sm font-bold text-[#52635a] hover:text-[#10231c] dark:text-[#9db0a6] dark:hover:text-[#f8f4ec] transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleContinueSos}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Continue SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

