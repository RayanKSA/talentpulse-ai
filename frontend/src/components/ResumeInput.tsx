import React, { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

interface ResumeInputProps {
  resumeText: string;
  setResumeText: (val: string) => void;
  fileName: string | null;
  setFileName: (val: string | null) => void;
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export const ResumeInput: React.FC<ResumeInputProps> = ({
  resumeText,
  setResumeText,
  fileName,
  setFileName,
  onFileUpload,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "text">("upload");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-brand-400" />
          <h2 className="font-semibold text-white">1. Candidate Resume</h2>
        </div>

        {/* Input Format Selector */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "upload" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            PDF / File
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`px-3 py-1 rounded-md transition ${
              activeTab === "text" ? "bg-slate-800 text-white font-medium" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Raw Text
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      {activeTab === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all flex-1 min-h-[220px] ${
            dragOver
              ? "border-brand-500 bg-brand-500/10"
              : fileName
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-950/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          {fileName ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="font-medium text-white text-sm">{fileName}</p>
              <span className="text-xs text-slate-400">Click or drag another file to replace</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <p className="font-medium text-white text-sm">Drop PDF or TXT resume here</p>
              <p className="text-xs text-slate-400">or click to browse from your device</p>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 mt-2">
                Standard ATS formats supported
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-[220px]">
          <textarea
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              setFileName(null);
            }}
            placeholder="Paste raw resume text here (including contact info, experience, education, and skills)..."
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-mono resize-none leading-relaxed"
          />
        </div>
      )}

      {/* Footer / Stats */}
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
        <div className="flex items-center space-x-3">
          <span>Words: <strong className="text-slate-200">{wordCount}</strong></span>
          {wordCount > 0 && wordCount < 300 && (
            <span className="text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Brief
            </span>
          )}
          {wordCount >= 300 && wordCount <= 900 && (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Optimal Length
            </span>
          )}
        </div>

        {resumeText && (
          <button
            onClick={() => {
              setResumeText("");
              setFileName(null);
            }}
            className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};
