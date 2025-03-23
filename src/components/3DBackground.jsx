import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

// Model component with loading callback
const Model = ({ onLoaded }) => {
    const modelRef = useRef();
    const { scene } = useGLTF('/model/scene.gltf');
    const [scrollY, setScrollY] = useState(0);

    // Signal when model is loaded
    useEffect(() => {
        if (scene) {
            console.log("3D Model scene loaded");
            // Remove smoke texture
            scene.traverse((child) => {
                if (child.isMesh && child.material && child.material.name === "smokeM") {
                    child.visible = false;
                }
                if (child.name && (child.name.includes("smoke") || child.name.includes("pCylinder1"))) {
                    child.visible = false;
                }
            });

            // Signal that the model is loaded and ready
            setTimeout(() => {
                console.log("Triggering onLoaded callback");
                onLoaded && onLoaded();
            }, 100);
        }
    }, [scene, onLoaded]);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apply scroll-based animations
    useFrame(() => {
        if (!modelRef.current) return;

        // Calculate normalized scroll position (0 to 1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);

        // Smooth rotation based on scroll position
        modelRef.current.rotation.y = scrollProgress * Math.PI * 2;

        // Slight elevation based on scroll
        modelRef.current.position.y = scrollProgress * 0.2;

        // Subtle tilt as user scrolls
        modelRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.1;
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={0.3}
            position={[0, 0, 0]}
        />
    );
};

// Loading placeholder
const ModelLoading = () => (
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4338ca" wireframe />
    </mesh>
);

const Background3D = ({ onLoaded, isPreloading = false }) => {
    // Force model loaded callback if taking too long
    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            console.log("Safety timeout reached, forcing model loaded callback");
            onLoaded && onLoaded();
        }, 5000);

        return () => clearTimeout(safetyTimeout);
    }, [onLoaded]);

    return (
        <div className={`fixed inset-0 -z-10 bg-slate-900 ${isPreloading ? 'opacity-0' : ''}`}>
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 12], fov: 35 }}
                gl={{ antialias: true }}
                onCreated={() => {
                    // Force high priority loading
                    document.querySelector('canvas').style.visibility = 'visible';
                }}
            >
                {/* Environment and lighting */}
                <color attach="background" args={['#0f172a']} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#6366f1" />
                <spotLight position={[0, 10, 0]} intensity={1} castShadow color="#818cf8" />

                {/* GLTF Model with Suspense fallback */}
                <Suspense fallback={<ModelLoading />}>
                    <Model onLoaded={onLoaded} />
                    <Environment preset="city" />
                </Suspense>

                {/* Camera controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    autoRotate={false}
                />
            </Canvas>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
    );
};

// Preload the model to avoid waterfall loading - now with highest priority
useGLTF.preload('/model/scene.gltf', true);

export default Background3D;
