'use client';

import TiltedCard from '../TiltedCard';

interface ServiceCardProps {
    title: string;
    description: string;
    imageSrc: string;
}

export default function ServiceCard({ title, description, imageSrc }: ServiceCardProps) {
    return (
        <div className="flex flex-col">
            {/* TiltedCard for image */}
            <TiltedCard
                imageSrc={imageSrc}
                altText={title}
                captionText={title}
                containerHeight="350px"
                containerWidth="100%"
                imageHeight="350px"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={8}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
            />

            {/* Text content below image */}
            <div className="mt-6">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-3">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}
