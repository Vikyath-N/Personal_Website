"use client";
import { useEffect, useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Loader2 } from "lucide-react";

interface Prediction {
  className: string;
  probability: number;
}

export default function Playground() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [modelError, setModelError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        console.log("Setting up TensorFlow.js backend...");
        
        // Set backend to CPU for browser compatibility
        await tf.setBackend('cpu');
        await tf.ready();
        
        console.log("TensorFlow.js backend ready:", tf.getBackend());
        console.log("Loading MobileNet model...");
        
        const loadedModel = await mobilenet.load({
          version: 2,
          alpha: 1.0,
        });
        
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
        // Try fallback without specific version
        try {
          console.log("Trying fallback model loading...");
          const fallbackModel = await mobilenet.load();
          setModel(fallbackModel);
          console.log("Fallback model loaded successfully");
        } catch (fallbackError) {
          console.error("Fallback model loading failed:", fallbackError);
          setModelError("Failed to load AI model. Please refresh the page and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  const classifyImage = async (imageElement: HTMLImageElement) => {
    if (!model) return;
    
    setLoading(true);
    try {
      const predictions = await model.classify(imageElement, 5);
      setPredictions(predictions);
    } catch (error) {
      console.error("Error classifying image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !model) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImageUrl(e.target?.result as string);
        classifyImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !model) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL();
    setImageUrl(imageData);

    const img = new Image();
    img.onload = () => classifyImage(img);
    img.src = imageData;
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Playground</h1>
        <p className="text-muted-foreground text-lg">
          Explore AI capabilities with real-time image classification using MobileNet.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Image Classification</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Upload an image or use your camera to classify objects in real-time.
          </p>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              
              <Button
                onClick={cameraActive ? stopCamera : startCamera}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                {cameraActive ? "Stop Camera" : "Use Camera"}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {cameraActive && (
              <div className="space-y-2">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover rounded border"
                />
                <Button onClick={capturePhoto} size="sm" className="w-full">
                  Capture Photo
                </Button>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {imageUrl && (
              <div className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Predictions</h2>
          
          {!model && !modelError && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading AI model...
            </div>
          )}

          {modelError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                {modelError}
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                size="sm" 
                className="mt-2"
              >
                Refresh Page
              </Button>
            </div>
          )}

          {model && !loading && predictions.length === 0 && (
            <p className="text-muted-foreground">
              Upload an image or use your camera to see AI predictions.
            </p>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing image...
            </div>
          )}

          {predictions.length > 0 && (
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {prediction.className}
                  </span>
                  <Badge variant="secondary">
                    {(prediction.probability * 100).toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 p-6">
        <h3 className="text-lg font-semibold mb-2">About This Demo</h3>
        <p className="text-sm text-muted-foreground">
          This playground uses MobileNet, a lightweight deep neural network designed for mobile and embedded vision applications. 
          The model can classify images into 1000+ different categories with impressive accuracy while running entirely in your browser.
        </p>
      </Card>
    </main>
  );
}
