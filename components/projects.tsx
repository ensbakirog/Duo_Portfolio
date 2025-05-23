"use client"

import { useRef, useState, useEffect } from "react"
// Change this import to use our wrapper
import { motion, AnimatePresence } from "@/lib/motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  contributors: ("name1" | "name2" | "both")[]
  links: {
    demo?: string
  }
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [symbioteActive, setSymbioteActive] = useState(false)

  // Handle intersection observer manually
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setIsInView(true)
      // Activate symbiote effect after projects have animated in
      setTimeout(() => setSymbioteActive(true), 1500)
    }
  }

  // Set up intersection observer
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    })

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  const projects: Project[] = [
    {
      id: 1,
      title: "LuckFlix",
      description: "LuckFlix uses a unique roulette-style system to help you discover movies and TV shows you'll love. No more endless scrolling!",
      image: "./luckflix-project.png",
      tags: ["Flutter", "Dart", "TMDb API", "Android", "iOS",],
      contributors: ["both"],
      links: {
        demo: "#",
      },
    }
  ]

  const getContributorColors = (contributors: ("name1" | "name2" | "both")[]) => {
    if (contributors.includes("both")) return "bg-gradient-to-r from-symbiote-blue to-toxic-green"
    if (contributors.includes("name1")) return "bg-symbiote-blue"
    return "bg-toxic-green"
  }

  const getContributorNames = (contributors: ("name1" | "name2" | "both")[]) => {
    if (contributors.includes("both")) return "Berhan Berk Akgün & Enes Bakıroğlu"
    if (contributors.includes("name1")) return "Berhan Berk Akgün"
    return "Enes Bakıroğlu"
  }

  // Generate symbiote tendrils
  const renderSymbioteTendrils = () => {
    return null;
  };

  return (
    <section id="projects" ref={ref} className="w-full py-20 bg-venom-black relative overflow-hidden">
      {/* Symbiote tendrils in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderSymbioteTendrils()}
      </div>

      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron symbiote-text">Our Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-toxic-green to-venom-purple rounded-full mb-6"></div>
          <p className="max-w-[600px] text-muted-foreground">
            Explore our innovative digital creations that push boundaries and showcase our technical expertise across platforms and technologies.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative bg-black rounded-xl overflow-hidden border border-gray-800 hover:border-[#FFC000] transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-contain md:object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />

                {/* Contributor Badge */}
                {project.id !== 1 && (
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-venom-black symbiote-text ${getContributorColors(project.contributors)}`}
                  >
                    {getContributorNames(project.contributors)}
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 relative transition-colors duration-300">
                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 text-gray-400 group-hover:text-[#FFC000] transition-colors duration-300 font-orbitron relative inline-block">
                  {project.title}
                </h3>
                <p className="text-gray-500 group-hover:text-muted-foreground text-sm mb-4 transition-colors duration-300">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-black border-gray-700 group-hover:border-[#FFC000]/30 text-xs text-gray-400 group-hover:text-[#FFC000] hover:bg-[#FFC000]/10 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {project.links.demo && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 group-hover:text-[#FFC000] hover:text-[#FFC000] hover:bg-[#FFC000]/10 font-bold tracking-wide text-base transition-colors duration-300"
                      onClick={() => window.open("https://luckflix.com", "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Site
                    </Button>
                  )}
                </div>
              </div>

              {/* Simple border effect on hover (without animations) */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFC000] rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
