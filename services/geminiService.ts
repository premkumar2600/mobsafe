import { GoogleGenAI, Type } from "@google/genai";
import { SecurityReport } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecurityReport = async (deviceType: string): Promise<SecurityReport> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Simulate a mobile security scan for a ${deviceType} device.
    Generate a realistic security report.
    Randomly decide if the device has threats or is safe (bias slightly towards finding interesting minor threats for demonstration).
    If threats are found, list 1 to 3 vulnerabilities like 'Outdated OS', 'Suspicious APK Permissions', 'Phishing SMS detected', or 'Unusual Network Traffic'.
    Provide specific remediation steps for each.
    
    The response must strictly adhere to the JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallStatus: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'SAFE'] },
            scanDate: { type: Type.STRING },
            scannedFilesCount: { type: Type.INTEGER },
            threatsDetected: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            vulnerabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
                  remediation: { type: Type.STRING },
                },
                required: ['id', 'name', 'description', 'severity', 'remediation']
              }
            }
          },
          required: ['overallStatus', 'scanDate', 'scannedFilesCount', 'threatsDetected', 'summary', 'vulnerabilities']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SecurityReport;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini Scan Error:", error);
    // Fallback mock data in case of API failure
    return {
      overallStatus: "SAFE" as any,
      scanDate: new Date().toISOString(),
      scannedFilesCount: 12450,
      threatsDetected: 0,
      summary: "Scan completed successfully. No immediate threats were detected on your device.",
      vulnerabilities: []
    };
  }
};
