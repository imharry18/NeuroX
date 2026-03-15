import { jsPDF } from "jspdf";

// Helper function to convert image URLs to Base64 for jsPDF
const getBase64ImageFromUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to load image for PDF:", imageUrl, error);
    return null;
  }
};

export const generateClinicalPDF = async ({ patientName, scanDate, results, timeline, originalImage }) => {
  if (!results) {
    alert("Analysis results are required to generate a report.");
    return;
  }

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Global Footer Helper
  const addFooter = (pageNum, totalPages) => {
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(
      "NeuroX Medical Intelligence System | For research and assistive purposes only.",
      margin,
      pageHeight - 10
    );
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 15, pageHeight - 10);
  };

  // ==========================================
  // PAGE 1: EXECUTIVE SUMMARY
  // ==========================================
  
  // Header Background
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, pageWidth, 45, "F");
  
  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("NEUROX AI DIAGNOSTICS", margin, 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175);
  doc.text("Automated Radiological AI Analysis Report", margin, 30);
  doc.text(`Report ID: NX-${Date.now().toString().slice(-6)}`, pageWidth - margin - 40, 22);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin - 40, 30);

  // Patient Profile Box
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, 55, pageWidth - (margin * 2), 35, 3, 3, "FD");
  
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("PATIENT PROFILE", margin + 5, 65);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Patient Name: ${patientName || "Not Provided"}`, margin + 5, 75);
  doc.text(`Date of Scan: ${scanDate}`, margin + 5, 82);
  doc.text(`Attending / Requesting: NeuroX Demo System`, pageWidth / 2, 75);

  // Diagnostic Alert Banner
  const isPositive = results.tumorDetected;
  if (isPositive) {
    doc.setFillColor(254, 226, 226); // Red-100
    doc.setDrawColor(248, 113, 113); // Red-400
  } else {
    doc.setFillColor(209, 250, 229); // Green-100
    doc.setDrawColor(52, 211, 153);  // Green-400
  }
  doc.roundedRect(margin, 100, pageWidth - (margin * 2), 20, 2, 2, "FD");
  
  doc.setTextColor(isPositive ? 153 : 6, isPositive ? 27 : 78, isPositive ? 27 : 59); // Dark Red or Dark Green
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(
    `DIAGNOSTIC ALERT: ${isPositive ? "ANOMALY DETECTED (POSITIVE)" : "NO ANOMALIES DETECTED (NEGATIVE)"}`,
    margin + 5,
    113
  );

  // Key Metrics Grid
  doc.setTextColor(15, 23, 42);
  doc.text("KEY CLINICAL METRICS", margin, 135);
  
  const drawMetricBox = (x, y, title, value, highlight = false) => {
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, 80, 25, 2, 2, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(title, x + 5, y + 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(highlight ? 225 : 15, highlight ? 29 : 23, highlight ? 72 : 42); // Red if highlighted
    doc.text(value, x + 5, y + 18);
  };

  drawMetricBox(margin, 145, "Tumor Classification", results.tumorType);
  drawMetricBox(margin + 90, 145, "AI Confidence Score", `${results.confidence}%`);
  drawMetricBox(margin, 175, "Estimated Volume (cm³)", `${results.size} cm³`);
  drawMetricBox(margin + 90, 175, "Severity Level", results.severityLevel, isPositive && results.severityLevel === "High");

  addFooter(1, 4);

  // ==========================================
  // PAGE 2: RADIOMICS & VISUALS
  // ==========================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("RADIOMICS & VISUAL DIAGNOSTICS", margin, 16);

  // Fetch Base64 Images
  const origImgB64 = originalImage ? await getBase64ImageFromUrl(originalImage) : null;
  const segImgB64 = results.segmentationImage ? await getBase64ImageFromUrl(results.segmentationImage) : null;
  const camImgB64 = results.gradcamImage ? await getBase64ImageFromUrl(results.gradcamImage) : null;

  doc.setTextColor(15, 23, 42);
  
  // 1. Original Scan
  doc.setFontSize(12);
  doc.text("1. Baseline MRI Scan (T1/T2)", margin, 40);
  if (origImgB64) {
    doc.addImage(origImgB64, "JPEG", pageWidth / 2 - 40, 45, 80, 80);
    doc.setDrawColor(0, 0, 0);
    doc.rect(pageWidth / 2 - 40, 45, 80, 80, "S"); // Border
  }

  // 2. Segmentation & GradCAM
  doc.text("2. U-Net Volumetric Segmentation", margin, 140);
  doc.text("3. EfficientNet Neural Activation", margin + 85, 140);
  
  if (segImgB64) {
    doc.addImage(segImgB64, "JPEG", margin, 145, 80, 80);
    doc.rect(margin, 145, 80, 80, "S");
  }
  if (camImgB64) {
    doc.addImage(camImgB64, "JPEG", margin + 85, 145, 80, 80);
    doc.rect(margin + 85, 145, 80, 80, "S");
  }

  addFooter(2, 4);

  // ==========================================
  // PAGE 3: LONGITUDINAL PROGRESSION
  // ==========================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("LONGITUDINAL PROGRESSION (TIMELINE)", margin, 16);

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Volumetric tracking of anomalies across multiple scan dates.", margin, 40);

  if (!timeline || timeline.length === 0) {
    doc.setFont("helvetica", "italic");
    doc.text("No historical scan data available for this patient.", margin, 60);
  } else {
    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, 50, pageWidth - (margin * 2), 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Date", margin + 5, 57);
    doc.text("Type", margin + 40, 57);
    doc.text("Volume", margin + 90, 57);
    doc.text("Severity", margin + 130, 57);

    // Table Rows
    doc.setFont("helvetica", "normal");
    let y = 67;
    timeline.forEach((scan) => {
      doc.text(scan.date.toString(), margin + 5, y);
      doc.text(scan.tumorType.toString(), margin + 40, y);
      doc.text(`${scan.size} cm³`, margin + 90, y);
      doc.text(scan.severityLevel.toString(), margin + 130, y);
      
      doc.setDrawColor(240, 240, 240);
      doc.line(margin, y + 3, pageWidth - margin, y + 3);
      y += 10;
    });
  }
  
  addFooter(3, 4);

  // ==========================================
  // PAGE 4: METHODOLOGY & DISCLAIMERS
  // ==========================================
  doc.addPage();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("METHODOLOGY & CLINICAL DISCLAIMERS", margin, 16);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text("Artificial Intelligence Methodology", margin, 40);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const methodologyText = "This report was generated using the NeuroX deep learning pipeline. Tumor classification is performed using an EfficientNet-B0 Convolutional Neural Network (CNN) trained on multi-class MRI datasets. Tumor boundary segmentation is calculated utilizing a ResNet34-UNet architecture to predict pixel-wise volumetric borders. GradCAM (Gradient-weighted Class Activation Mapping) is utilized to ensure model explainability by highlighting the spatial regions the AI relied upon to formulate its classification.";
  doc.text(doc.splitTextToSize(methodologyText, pageWidth - (margin * 2)), margin, 48);

  doc.setFont("helvetica", "bold");
  doc.text("Metric Definitions", margin, 80);
  doc.setFont("helvetica", "normal");
  doc.text("• Confidence Score: The mathematical probability output by the softmax layer of the classification network.", margin, 88);
  doc.text("• Estimated Volume: A 2D-to-3D approximation derived from the pixel-density of the U-Net segmentation mask.", margin, 95);

  doc.setDrawColor(0, 0, 0);
  doc.line(margin, 110, pageWidth - margin, 110);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("STRICT CLINICAL DISCLAIMER", margin, 125);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const disclaimerText = "NeuroX is an experimental Artificial Intelligence system designed strictly for research, academic, and assistive purposes. It is NOT an FDA-approved medical device. The findings, metrics, and visual outputs contained in this report must not be used as the sole basis for diagnosing, treating, or managing any disease or medical condition. All automated findings must be rigorously reviewed, verified, and validated by a board-certified radiologist, neuro-oncologist, or qualified medical professional prior to any clinical decision-making.";
  doc.text(doc.splitTextToSize(disclaimerText, pageWidth - (margin * 2)), margin, 133);

  addFooter(4, 4);

  // ==========================================
  // SAVE PDF
  // ==========================================
  const fileName = `${patientName ? patientName.replace(/\s+/g, "_") : "Patient"}_NeuroX_Report.pdf`;
  doc.save(fileName);
};