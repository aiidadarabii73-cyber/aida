import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_URL = 'https://media.base44.com/videos/public/6ad0be78fd36f672735ad122/ca0f48d3d_px-download257796_large.mp4'

export default function CinematicHero() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoWrapRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)
  const overlayRef = useRef(null)
  const glowRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const videoWrap = videoWrapRef.current
    const video = videoRef.current
    const text = textRef.current
    const overlay = overlayRef.current
    const glow = glowRef.current
    if (!section || !stage || !videoWrap || !text || !overlay) return

    // Ensure video plays
    if (video) {
      video.play().catch(() => {})
    }

    if (reducedMotion) {
      // No scroll animation — static hero
      return
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop } = context.conditions

          // Set 3D perspective on stage
          gsap.set(stage, { perspective: isDesktop ? 1200 : 800 })
          gsap.set(videoWrap, { transformStyle: 'preserve-3d' })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=120%',
              pin: true,
              pinSpacing: true,
              scrub: 1.2,
              anticipatePin: 1,
            },
          })

          // 3D recession of the video
          tl.to(
            videoWrap,
            {
              scale: isDesktop ? 0.78 : 0.86,
              rotateX: isDesktop ? 10 : 5,
              rotateY: isDesktop ? -3 : 0,
              z: isDesktop ? -350 : -150,
              ease: 'power2.inOut',
              duration: 1,
            },
            0
          )

          // Subtle glow shift
          if (glow) {
            tl.to(
              glow,
              {
                opacity: 0.6,
                scale: 1.3,
                ease: 'power1.inOut',
                duration: 1,
              },
              0
            )
          }

          // Text fades and lifts out
          tl.to(
            text,
            {
              opacity: 0,
              y: -100,
              ease: 'power2.in',
              duration: 0.35,
            },
            0
          )

          // Bottom overlay transitions to page bg
          tl.to(
            overlay,
            {
              opacity: 1,
              ease: 'power2.inOut',
              duration: 0.8,
            },
            0.2
          )
        }
      )
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [reducedMotion, videoReady])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: '#0B0F14' }}
    >
      {/* 3D Stage */}
      <div ref={stageRef} className="absolute inset-0">
        <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          />

          {/* Cinematic gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-nestora-bg/80 via-nestora-bg/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-nestora-bg/60 via-transparent to-nestora-bg/20" />

          {/* Gold glow accent */}
          <div
            ref={glowRef}
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 70% 80%, rgba(201,162,75,0.15), transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* Bottom transition overlay (fades to page bg as you scroll) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0,
          background: 'linear-gradient(to bottom, transparent 40%, #0B0F14 100%)',
        }}
      />

      {/* Hero Text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          <div className="max-w-2xl">
            <h1
              className="font-heading font-bold uppercase leading-tight mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              <span className="block text-white">Find Your Perfect</span>
              <span className="block gold-text">Living Space</span>
            </h1>
            <div className="w-16 h-1 gold-gradient rounded-full mb-6" />
            <p className="text-nestora-grey text-lg max-w-lg">
              Discover exclusive luxury homes and sophisticated properties tailored to your
              modern lifestyle with Nestora Homes.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-nestora-grey/60">
          <span className="text-xs font-heading uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-nestora-gold/50 to-transparent" />
        </div>
      )}
    </section>
  )
}
