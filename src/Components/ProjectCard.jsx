import {
    Github,
    ExternalLink,
    Code,
} from "lucide-react";

import useInView from "../hooks/useInView";

const ProjectCard = ({
    title,
    description,
    tags,
    link,
    githubLink,
    image,
    darkMode = true,
}) => {
    const [ref, inView] = useInView();

    return (
        <div
            ref={ref}
            role="article"
            aria-label={`Project card: ${title}`}
            className={`group relative rounded-2xl overflow-hidden border shadow-md transition-all duration-700 ease-in-out transform h-[260px] sm:h-[280px] md:h-[300px] ${darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
                } ${inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.015]`}
        >
            {/* Image Layer */}
            <div className="relative w-full h-full">
                {image ? (
                    title === "easyocr-js" ? (
                        <div className="flex flex-col h-full">
                            <img
                                src={image.split(",")[0]}
                                alt={`${title} image 1`}
                                className="w-full h-1/2 object-cover transition-transform duration-500 group-hover:brightness-75 group-hover:scale-105"
                            />
                            <img
                                src={image.split(",")[1]}
                                alt={`${title} image 2`}
                                className="w-full h-1/2 object-cover transition-transform duration-500 group-hover:brightness-75 group-hover:scale-105"
                            />
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt={`${title} cover`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:brightness-75 group-hover:scale-105"
                        />
                    )
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Code className="h-12 w-12 text-gray-400 group-hover:text-gray-600 transition-colors duration-500" />
                    </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white drop-shadow-sm truncate">{title}</h3>
                </div>
            </div>

            {/* Hover Overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 overflow-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <div className="space-y-3 text-white">
                    {/* Description */}
                    <p
                        className="text-sm leading-snug max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
                    >
                        {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-sm hover:bg-white/20 transition"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                        )}
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-300 transition"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
