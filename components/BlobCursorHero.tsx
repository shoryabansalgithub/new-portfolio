import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MousePosition {
    x: number;
    y: number;
}

interface Trail {
    x: number;
    y: number;
    size: number;
    opacity: number;
    id: number;
}

const BlobCursorHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
    const [blobPos, setBlobPos] = useState<MousePosition>({ x: 0, y: 0 });
    const [trails, setTrails] = useState<Trail[]>([]);
    const lastMousePosRef = useRef<MousePosition>({ x: 0, y: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const animationFrameRef = useRef<number>();
    const trailIdRef = useRef(0);

    const BLOB_SIZE = 200;
    const LAG_FACTOR = 0.15;

    // Track container size
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Mouse tracking - using ref for lastMousePos to avoid infinite re-renders
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePos({ x, y });

            // Calculate speed for trails using ref
            const lastPos = lastMousePosRef.current;
            const speed = Math.sqrt(
                Math.pow(x - lastPos.x, 2) + Math.pow(y - lastPos.y, 2)
            );

            if (speed > 10) {
                const newTrail: Trail = {
                    x,
                    y,
                    size: BLOB_SIZE * 0.6,
                    opacity: Math.min(speed / 50, 0.8),
                    id: trailIdRef.current++,
                };

                setTrails(prev => [...prev.slice(-5), newTrail]);
            }

            // Update ref instead of state
            lastMousePosRef.current = { x, y };
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []); // Empty dependency array - no more infinite loop

    // Smooth blob animation
    useEffect(() => {
        const animate = () => {
            setBlobPos(prev => ({
                x: prev.x + (mousePos.x - prev.x) * LAG_FACTOR,
                y: prev.y + (mousePos.y - prev.y) * LAG_FACTOR,
            }));

            setTrails(prev =>
                prev
                    .map(trail => ({
                        ...trail,
                        opacity: trail.opacity * 0.9,
                        size: trail.size * 0.98,
                    }))
                    .filter(trail => trail.opacity > 0.05)
            );

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mousePos]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden bg-zinc-900"
            style={{ cursor: 'none' }}
        >
            {/* Base image layer */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src="/image.png"
                    alt="Base"
                    className="h-full w-auto object-contain select-none"
                    draggable={false}
                />
            </div>

            {/* Trail circles with reveal */}
            {trails.map(trail => (
                <div
                    key={trail.id}
                    className="absolute pointer-events-none rounded-full overflow-hidden"
                    style={{
                        left: trail.x - trail.size / 2,
                        top: trail.y - trail.size / 2,
                        width: trail.size,
                        height: trail.size,
                        opacity: trail.opacity,
                    }}
                >
                    <div
                        className="absolute"
                        style={{
                            width: containerSize.width,
                            height: containerSize.height,
                            left: -(trail.x - trail.size / 2),
                            top: -(trail.y - trail.size / 2),
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src="/new-header.png"
                                alt="Trail Reveal"
                                className="h-full w-auto object-contain select-none"
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Main blob cursor with reveal - using simple circular mask */}
            <div
                className="absolute pointer-events-none rounded-full overflow-hidden transition-opacity duration-200"
                style={{
                    left: blobPos.x - BLOB_SIZE / 2,
                    top: blobPos.y - BLOB_SIZE / 2,
                    width: BLOB_SIZE,
                    height: BLOB_SIZE,
                    opacity: isHovering ? 1 : 0,
                }}
            >
                {/* Revealed image positioned to align with base */}
                <div
                    className="absolute"
                    style={{
                        width: containerSize.width,
                        height: containerSize.height,
                        left: -(blobPos.x - BLOB_SIZE / 2),
                        top: -(blobPos.y - BLOB_SIZE / 2),
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            src="/new-header.png"
                            alt="Reveal"
                            className="h-full w-auto object-contain select-none"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>

            {/* Blob glow effect */}
            <div
                className="absolute pointer-events-none rounded-full blur-xl transition-opacity duration-200"
                style={{
                    left: blobPos.x - BLOB_SIZE / 2 - 20,
                    top: blobPos.y - BLOB_SIZE / 2 - 20,
                    width: BLOB_SIZE + 40,
                    height: BLOB_SIZE + 40,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
                    opacity: isHovering ? 0.6 : 0,
                }}
            />

            {/* Custom cursor dot */}
            <div
                className="absolute pointer-events-none w-3 h-3 rounded-full bg-white mix-blend-difference transition-opacity duration-200"
                style={{
                    left: mousePos.x - 6,
                    top: mousePos.y - 6,
                    opacity: isHovering ? 1 : 0,
                }}
            />

            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider drop-shadow-lg">
                    Move cursor to reveal
                </p>
                <p className="text-zinc-600 font-mono text-[10px] mt-1 drop-shadow">
                    Faster movement = more trails
                </p>
            </div>
        </div>
    );
};

export default BlobCursorHero;

