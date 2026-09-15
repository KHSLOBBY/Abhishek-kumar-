import React from 'react';
import { Download, Smartphone, X, CheckCircle, Shield } from 'lucide-react';

interface InstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => void;
  canInstallPrompt: boolean;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({
  isOpen,
  onClose,
  onInstall,
  canInstallPrompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md border border-amber-300">
              <Smartphone className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Install Android App
              </h3>
              <p className="text-xs text-slate-500">
                Kharsia Lobby Call Book 3.0
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Benefits list */}
        <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>100% Offline Caching:</strong> Access 2,000+ staff contacts in locomotive cabs without network signal.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Full Screen Android App:</strong> Removes browser URL address bar for native app performance.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Quick Dial & WhatsApp:</strong> One-tap calling to TLC, DPC, and Crew controllers.
            </span>
          </div>
        </div>

        {/* Android Chrome Instructions */}
        <div className="text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">How to install on Android Chrome:</p>
          <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-slate-600">
            <li>Tap the browser menu (<strong>⋮</strong> three dots top right)</li>
            <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong></li>
            <li>Confirm installation — the app icon will appear on your home screen!</li>
          </ol>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs"
          >
            Later
          </button>

          {canInstallPrompt ? (
            <button
              onClick={() => {
                onInstall();
                onClose();
              }}
              className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Install Now</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition text-center"
            >
              Got It
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
