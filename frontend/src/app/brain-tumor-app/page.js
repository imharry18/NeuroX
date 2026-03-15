// src/app/brain-tumor-app/page.js
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { generateClinicalPDF } from "@/utils/pdfGenerator";
export default function BrainTumorApp() {
  // Patient & Upload State
  const [patientName, setPatientName] = useState("");
  const [scanDate, setScanDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Analysis State
  const [status, setStatus] = useState("idle"); // idle, analyzing, complete, error
  const [activeTab, setActiveTab] = useState("original"); // original, segmentation, gradcam
  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState(null);

  // Dynamic Timeline State
  const [timeline, setTimeline] = useState([]);
  
  const fileInputRef = useRef(null);

  // Handle File Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setStatus("idle");
      setResults(null);
      setErrorMessage("");
    }
  };

  // Trigger Backend Analysis
  const triggerAnalysis = async () => {
    if (!image) return;
    setStatus("analyzing");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the NeuroX AI engine.");
      }

      const data = await response.json();
      
      const formattedType = data.tumor_detected 
        ? data.tumor_type.charAt(0).toUpperCase() + data.tumor_type.slice(1) 
        : "No Tumor Detected";

      // Path Formatting for GradCAM
      let gradcamPath = data.gradcam_image;
      // Remove leading slash if it exists to prevent double slashes
      if (gradcamPath && gradcamPath.startsWith("/")) {
        gradcamPath = gradcamPath.substring(1);
      }

      // Path Formatting for Segmentation
      let segmentationPath = data.segmentation_image;
      if (segmentationPath && segmentationPath.startsWith("/")) {
        segmentationPath = segmentationPath.substring(1);
      }

      const timestamp = new Date().getTime();

      setResults({
        tumorDetected: data.tumor_detected,
        tumorType: formattedType,
        confidence: (data.confidence * 100).toFixed(2),
        size: data.tumor_detected ? data.tumor_size.toFixed(2) : "0.00",
        severityLevel: data.tumor_detected ? data.severity : "None",
        gradcamImage: `http://127.0.0.1:8000/${gradcamPath}?t=${timestamp}`, 
        segmentationImage: `http://127.0.0.1:8000/${segmentationPath}?t=${timestamp}`,
      });
      
      setStatus("complete");
    } catch (error) {
      console.error(error);
      setErrorMessage("Connection error. Please ensure the backend is running on http://127.0.0.1:8000.");
      setStatus("error");
    }
  };

  // Add Current Scan to Dynamic Timeline
  const addToTimeline = () => {
    if (!results) return;

    const newEntry = {
      id: Date.now(),
      date: scanDate,
      preview: preview,
      ...results
    };

    // Add and sort by date (oldest to newest)
    const updatedTimeline = [...timeline, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date));
    setTimeline(updatedTimeline);

    // Reset upload section to allow for the next scan
    setImage(null);
    setPreview(null);
    setResults(null);
    setStatus("idle");
    setActiveTab("original");
  };

  // Generate PDF Report
  const downloadPDF = () => {
      generateClinicalPDF({ 
        patientName, 
        scanDate, 
        results, 
        timeline,
        originalImage: preview
      });
    };

  return (
    <div className="min-h-screen bg-black text-zinc-300 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 gap-4">
          <div>
            <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-indigo-400 transition-colors uppercase tracking-wider mb-2 block">
              ← Return to Dashboard
            </Link>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Neuro-Oncology Analyzer</h1>
            <p className="text-sm text-zinc-400 mt-1 font-light">Dynamic Patient Tracking & Deep Learning Diagnostics</p>
          </div>
        </div>

        {/* Patient Details Input */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Patient Name</label>
              <input 
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name..."
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Scan Date</label>
              <input 
                type="date" 
                value={scanDate}
                onChange={(e) => setScanDate(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image Upload & Visualizations */}
          <div className="lg:col-span-5 space-y-6">
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full aspect-square bg-zinc-950 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-indigo-500/50 transition-all group"
              >
                <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-white mb-1">Click or drag DICOM/JPEG</p>
                <p className="text-xs text-zinc-500">High-resolution MRI T1/T2 preferred</p>
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload}/>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full aspect-square bg-black border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={
                      activeTab === 'gradcam' && results ? results.gradcamImage : 
                      activeTab === 'segmentation' && results ? results.segmentationImage : 
                      preview
                    } 
                    alt="MRI Scan" 
                    className="object-cover w-full h-full transition-all duration-500"
                    onError={(e) => {
                      if (activeTab === 'gradcam' || activeTab === 'segmentation') {
                        e.target.src = preview;
                        e.target.classList.add("sepia", "hue-rotate-[220deg]", "saturate-[3]");
                      }
                    }}
                  />
                  {status === "analyzing" && (
                    <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none overflow-hidden">
                      <div className="w-full h-1 bg-indigo-500 shadow-[0_0_15px_#6366f1] absolute top-0 animate-[scan_2s_linear_infinite]"></div>
                    </div>
                  )}
                </div>

                {status === "complete" && (
                  <div className="flex p-1 bg-zinc-950 border border-white/5 rounded-lg overflow-x-auto no-scrollbar">
                    <button onClick={() => setActiveTab("original")} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap px-2 ${activeTab === "original" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>Original MRI</button>
                    <button onClick={() => setActiveTab("segmentation")} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap px-2 ${activeTab === "segmentation" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>Segmentation</button>
                    <button onClick={() => setActiveTab("gradcam")} className={`flex-1 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap px-2 ${activeTab === "gradcam" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>GradCAM</button>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">{errorMessage}</div>
                )}

                {(status === "idle" || status === "error") && (
                  <button onClick={triggerAnalysis} className="w-full py-3.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    Run AI Diagnostics
                  </button>
                )}
                
                {status === "analyzing" && (
                  <button disabled className="w-full py-3.5 bg-zinc-900 border border-white/10 text-indigo-400 font-mono text-sm rounded-lg flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESSING NEURAL NET...
                  </button>
                )}
                
                <button onClick={() => { setImage(null); setPreview(null); setStatus("idle"); setResults(null); setActiveTab("original"); }} className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                  Cancel & Upload Different Scan
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Results Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            {!results ? (
              <div className="w-full h-full min-h-[400px] bg-zinc-950/50 border border-white/5 rounded-xl flex flex-col items-center justify-center p-8 text-center">
                <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-zinc-400 mb-2">Clinical Analysis Pending</h3>
                <p className="text-sm text-zinc-600 max-w-sm">Enter patient details, upload a scan, and initiate diagnostics to view metrics.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Alert Banner */}
                {results.tumorDetected ? (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-4">
                    <svg className="w-6 h-6 text-rose-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                      <h4 className="text-rose-400 font-semibold text-sm uppercase tracking-wide">Detection Alert: Positive</h4>
                      <p className="text-rose-200/80 text-sm mt-1">Morphological anomalies detected. Add to timeline to track progression.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-4">
                    <svg className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <h4 className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">Detection Alert: Negative</h4>
                      <p className="text-emerald-200/80 text-sm mt-1">No significant tumor patterns detected. Add to timeline for historical reference.</p>
                    </div>
                  </div>
                )}

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Tumor Detected</p>
                    <p className={`text-lg font-semibold ${results.tumorDetected ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {results.tumorDetected ? "YES" : "NO"}
                    </p>
                  </div>
                  <div className="bg-zinc-950 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Tumor Classification</p>
                    <p className="text-lg font-semibold text-white truncate">{results.tumorType}</p>
                  </div>
                  <div className="bg-zinc-950 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Severity Level</p>
                    <p className={`text-lg font-semibold ${results.tumorDetected ? 'text-amber-400' : 'text-zinc-400'}`}>{results.severityLevel}</p>
                  </div>
                  <div className="bg-zinc-950 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Est. Volume / Size</p>
                    <p className="text-lg font-semibold text-white font-mono">{results.size} cm³</p>
                  </div>
                  <div className="col-span-2 bg-zinc-950 border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">AI Confidence Score</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-3xl font-light text-white leading-none">{results.confidence}<span className="text-lg text-zinc-500">%</span></p>
                      <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${results.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button onClick={downloadPDF} className="flex-1 py-3 px-4 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Clinical PDF
                  </button>
                  <button onClick={addToTimeline} className="flex-1 py-3 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Scan to Timeline
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Dynamic Timeline Section */}
        {timeline.length > 0 && (
          <div className="pt-12 border-t border-white/5 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">Patient Scan Progression</h2>
                <p className="text-sm text-zinc-400 mt-1">Comparative timeline tracking volumetric changes.</p>
              </div>
              <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium rounded-lg">
                Total Scans: {timeline.length}
              </div>
            </div>

            {/* Scrollable Timeline Cards */}
            <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 no-scrollbar">
              {timeline.map((item, index) => {
                // Calculate differences if not the first scan
                let sizeDiffStr = null;
                let daysDiffStr = null;
                let isIncrease = false;

                if (index > 0) {
                  const prevItem = timeline[index - 1];
                  const currentSize = parseFloat(item.size);
                  const prevSize = parseFloat(prevItem.size);
                  const diff = currentSize - prevSize;
                  isIncrease = diff > 0;
                  
                  if (diff !== 0) {
                    sizeDiffStr = `${diff > 0 ? '+' : ''}${diff.toFixed(2)} cm³`;
                  } else {
                    sizeDiffStr = "No Change";
                  }

                  const date1 = new Date(prevItem.date);
                  const date2 = new Date(item.date);
                  const diffTime = Math.abs(date2 - date1);
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  daysDiffStr = `${diffDays} days later`;
                } else {
                  sizeDiffStr = "Baseline Scan";
                  daysDiffStr = "Initial Assessment";
                }

                return (
                  <div key={item.id} className="snap-start min-w-[300px] sm:min-w-[350px] bg-zinc-950 border border-white/10 rounded-xl overflow-hidden flex-shrink-0 flex flex-col shadow-xl">
                    <div className="h-40 bg-black border-b border-white/5 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.preview} alt="Historical Scan" className="w-full h-full object-cover opacity-70" />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/10 text-white text-xs font-mono px-2 py-1 rounded">
                        {item.date}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-medium">{item.tumorType}</h4>
                          <p className="text-xs text-zinc-500 mt-0.5">{daysDiffStr}</p>
                        </div>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${item.tumorDetected ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                          {item.severityLevel}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <div className="bg-white/5 rounded-md p-3">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Volume</p>
                          <p className="text-white font-mono text-sm">{item.size} cm³</p>
                        </div>
                        <div className={`rounded-md p-3 border ${index === 0 ? 'bg-white/5 border-transparent' : isIncrease ? 'bg-rose-500/5 border-rose-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Delta</p>
                          <p className={`font-mono text-sm ${index === 0 ? 'text-zinc-400' : isIncrease ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {sizeDiffStr}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
      <style jsx>{`
        @keyframes scan { 0% { transform: translateY(0); } 50% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}