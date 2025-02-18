import React, { useState, KeyboardEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lightbulb, Loader, Check } from 'lucide-react';

interface NFTGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NFTGeneratorModal: React.FC<NFTGeneratorModalProps> = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showInitialContent, setShowInitialContent] = useState(true);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [is3DLoading, setIs3DLoading] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [minting, setMinting] = useState(false);
    const [passkey, setPasskey] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modelFile, setModelFile] = useState<string | null>(null);
    const [colorVideo, setColorVideo] = useState<string | null>(null);
    const [is3DModelReady, setIs3DModelReady] = useState(false); // Track if 3D model is ready

    const generateImages = async (prompt: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/v1/predictions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                    "Prefer": "wait"
                },
                body: JSON.stringify({
                    version: "abaf53bc90452c82e8c91ab7da5367aa01270cac56f36860360842ce49622a9f",
                    input: {
                        model: "schnell",
                        prompt: `cute-3d, ${prompt}`,
                        go_fast: true,
                        lora_scale: 1,
                        megapixels: "1",
                        num_outputs: 4,
                        aspect_ratio: "1:1",
                        output_format: "jpg",
                        guidance_scale: 3.5,
                        output_quality: 100,
                        prompt_strength: 0.8,
                        extra_lora_scale: 1,
                        num_inference_steps: 4
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Replicate API error:", errorData);
                throw new Error(`Replicate API failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data && data.output && Array.isArray(data.output) && data.output.every(item => typeof item === 'string')) {
                setGeneratedImages(data.output);
                setError(null);
            } else {
                console.error("Unexpected API output:", data);
                setError("Unexpected API output format.");
                setGeneratedImages([]);
            }

        } catch (apiError: any) {
            console.error("API Error:", apiError);
            setError(`Failed to generate images. ${apiError.message || 'Please check the console for details.'}`);
            setGeneratedImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const create3DModel = async () => {
        setIs3DLoading(true);
        setError(null);
        setIs3DModelReady(false); // Reset the flag

        if (!generatedImages[selectedCard]) {
            setError("Please select an image first.");
            setIs3DLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/v1/predictions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    version: "4876f2a8da1c544772dffa32e8889da4a1bab3a1f5c1937bfcfccb99ae347251",
                    input: {
                        seed: 0,
                        images: [generatedImages[selectedCard]],
                        texture_size: 2048,
                        mesh_simplify: 0.9,
                        generate_color: true,
                        generate_model: true,
                        randomize_seed: true,
                        generate_normal: false,
                        save_gaussian_ply: false,
                        ss_sampling_steps: 38,
                        slat_sampling_steps: 12,
                        return_no_background: false,
                        ss_guidance_strength: 7.5,
                        slat_guidance_strength: 3
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Trellis API error:", errorData);
                throw new Error(`Trellis API failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Poll for status updates
            let prediction = data;
            while (prediction.status !== "succeeded" && prediction.status !== "failed") {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Check every 5 seconds
                const getResponse = await fetch(`/api/v1/predictions/${prediction.id}`, {
                    headers: {
                        "Authorization": `Bearer ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!getResponse.ok) {
                    const errorData = await getResponse.json();
                    console.error("Trellis API error (polling):", errorData);
                    throw new Error(`Trellis API failed during polling: ${getResponse.statusText}`);
                }

                prediction = await getResponse.json();
                console.log("Prediction Status:", prediction.status);
            }


            if (prediction.status === "succeeded" && prediction.output) {
                setModelFile(prediction.output.model_file || null);
                setColorVideo(prediction.output.color_video || null);
                setShowVideo(true); // Show video/download section
                setIs3DLoading(false);
                setIs3DModelReady(true);
                console.log("Model File:", prediction.output.model_file);
                console.log("Color Video:", prediction.output.color_video);

            } else {
                console.error("Trellis API failed to generate model:", prediction);
                setError("Failed to generate 3D model.");
                setShowVideo(false); // Hide video/download section if failed
                setIs3DLoading(false);

            }


        } catch (apiError: any) {
            console.error("Trellis API Error:", apiError);
            setError(`Failed to generate 3D model: ${apiError.message || 'Please check the console for details.'}`);
            setShowVideo(false);
            setIs3DLoading(false);


        } finally {
            setIs3DLoading(false);
        }
    };


    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setShowInitialContent(false);
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);
        setSelectedCard(null);

        try {
            await generateImages(prompt);
            setShowResults(true);

        } catch (err) {
            setIsLoading(false);
            console.error("Error in handleGenerate:", err);
            setError("Failed to generate images. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGenerate();
        }
    };

    const handleCardSelect = (index: number) => {
        setSelectedCard(index);
    };

    const handleMake3D = () => {
        create3DModel();
    };

    const handleDownload = () => {
        if (modelFile) {
            window.location.href = modelFile;
        } else {
            setError("3D model file not available.");
        }
    };

    const handleMint = () => {
        setMinting(true);
        setShowVideo(false);

        // Simulate minting process with 10 second delay
        setTimeout(() => {
            setMinting(false);
            const generatedPasskey = Math.random().toString(36).substring(2, 14).toUpperCase();
            setPasskey(generatedPasskey);
        }, 10000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative rounded-lg shadow-lg w-3/4 max-w-4xl min-h-[600px] p-12 overflow-hidden"
            >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 animate-gradient-x" />

                {/* Content container */}
                <div className="relative z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
                    >
                        <X size={32} />
                    </button>

                    <div className="flex flex-col items-center justify-between h-full min-h-[500px]">
                        {/* Dynamic content section */}
                        <div className="flex flex-col items-center space-y-8 mt-12 w-full">
                            <AnimatePresence mode="wait">
                                {showInitialContent && (
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center space-y-8"
                                    >
                                        <Lightbulb size={64} className="text-purple-500" />
                                        <div className="text-center space-y-4">
                                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                                                Let's Start Your Journey Here
                                            </h2>
                                            <p className="text-2xl text-gray-600 max-w-2xl">
                                                Enter Your Prompt for the Model You Want to Make
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center space-y-4 items-center justify-center text-center"
                                    >
                                        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
                                        <p className="text-xl text-gray-600">Generating your designs...</p>
                                    </motion.div>
                                )}

                                {showResults && !selectedCard && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="grid grid-cols-2 gap-4 w-full max-w-3xl mb-8"
                                    >
                                        {/* Render generated images */}
                                        {generatedImages.length > 0 ? (
                                            generatedImages.map((imageUrl, index) => (
                                                <div
                                                    key={index}
                                                    className="relative aspect-square bg-white/50 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
                                                    onClick={() => handleCardSelect(index)}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Generated NFT ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button className="px-6 py-2 bg-white rounded-full text-black font-semibold">
                                                            Select
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600">No images generated yet.</p>
                                        )}
                                    </motion.div>
                                )}

                                {selectedCard && !is3DLoading && !showVideo && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center space-y-6"
                                    >
                                        <div className="w-[400px] aspect-square bg-white/50 rounded-lg shadow-lg overflow-hidden">
                                            {/* Display selected image */}
                                            {generatedImages[selectedCard] && (
                                                <img
                                                    src={generatedImages[selectedCard]}
                                                    alt="Selected NFT"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <button
                                            onClick={handleMake3D}
                                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-xl font-bold hover:opacity-90 transition-opacity"
                                        >
                                            Make it 3D!
                                        </button>
                                    </motion.div>
                                )}

                                {is3DLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center space-y-4 items-center justify-center text-center"
                                    >
                                        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
                                        <p className="text-xl text-gray-600">
                                            Buckle up! Crafting your stunning 3D model...
                                            <br />
                                            (This might take 1-3 minutes, but trust us, it's worth the wait! 🚀)
                                        </p>
                                    </motion.div>
                                )}

                                {showVideo && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center space-y-6 text-center"
                                    >
                                        <div className="w-full max-w-3xl aspect-video bg-black">
                                            {/* Video placeholder */}
                                            {colorVideo ? (
                                                <video className="w-full h-full" controls>
                                                    <source src={colorVideo} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <p>Video loading...</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-4 justify-center">
                                            <button
                                                onClick={handleDownload}
                                                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg text-xl font-bold hover:opacity-90 transition-opacity"
                                                disabled={!is3DModelReady}
                                            >
                                                Download 3D Model
                                            </button>
                                            <button
                                                onClick={handleMint}
                                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-xl font-bold hover:opacity-90 transition-opacity"
                                            >
                                                Mint it
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {minting && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center space-y-4 items-center justify-center text-center"
                                    >
                                        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
                                        <p className="text-xl text-gray-600">Minting your NFT...</p>
                                    </motion.div>
                                )}

                                {passkey && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center space-y-4 text-center"
                                    >
                                        <p className="text-xl text-gray-600">Your NFT has been minted!</p>
                                        <p className="text-lg text-gray-800">
                                            Save this passkey for later and Send it to us when we Go into Open Beta Marketplace
                                            <br />
                                            We Will add it to your Account
                                        </p>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-red-500 mt-4"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom section with input - only show if no card is selected */}
                        {!selectedCard && (
                            <div className="flex justify-center items-center w-full mt-auto">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter your prompt..."
                                    className="w-full max-w-2xl p-4 text-lg text-black border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
                                />
                                <button
                                    onClick={handleGenerate}
                                    className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-r-lg hover:opacity-90 transition-opacity"
                                >
                                    <ArrowRight size={32} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NFTGeneratorModal;