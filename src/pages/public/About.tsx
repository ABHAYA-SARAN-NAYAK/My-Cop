import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Recycle,
  Heart,
  Globe2,
  Cpu,
  Layers,
  Award,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const techStack = [
    'Vite 6',
    'React 18',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Zustand (Local Storage)',
    'crypto.subtle (Real SHA-256)',
    'Haversine Geodesic Math',
    'React Leaflet & OpenStreetMap',
    'Recharts',
    'Canvas Confetti',
  ];

  return (
    <div className="min-h-screen bg-deep text-text-main flex flex-col selection:bg-brand-teal/30">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">
            About MyCop & RISING INNOVATORS
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
            Turning Waste Into Worth.
          </h1>
          <p className="text-base text-text-muted leading-relaxed">
            Built for SEVA FIRST INNOVATION CHALLENGE under the theme "BUILD. CHALLENGE. DOMINATE."
            Our vision is to eliminate the systemic gap between urban waste creation and circular industrial reuse.
          </p>
        </div>

        {/* The Problem & Our Innovation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 space-y-3">
            <h3 className="font-heading font-bold text-white text-lg">The Fundamental Bottleneck</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Waste in modern cities has immense commercial value, but lacks smart connectivity. Municipal trucks run static, unoptimized routes, mixing clean plastics with wet food waste, destroying secondary market value and burying landfills in toxic fires.
            </p>
          </div>

          <div className="glass-card p-6 space-y-3">
            <h3 className="font-heading font-bold text-white text-lg">The MyCop Waste Link System</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We connect the entire loop: IoT ultrasonic bins alert the nearest truck via real Haversine distance. High-speed AI computer vision segments waste with 98% purity, which is instantly cataloged on a transparent SHA-256 blockchain ledger and sold on a digital B2B marketplace.
            </p>
          </div>
        </div>

        {/* Team RISING INNOVATORS Cards */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-extrabold text-white">Team RISING INNOVATORS</h2>
            <p className="text-xs font-mono text-brand-teal mt-1">SEVA FIRST INNOVATION CHALLENGE Core Builders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Revesh Roshan V',
                role: 'Team Lead & Full-Stack Architect',
                initials: 'RR',
                focus: 'Vite/React ecosystem, state management, UI/UX systems & business model strategy',
              },
              {
                name: 'Prabu Shanmugam S',
                role: 'IoT Systems & Hardware Lead',
                initials: 'PS',
                focus: 'Ultrasonic sensor telemetry, LoRaWAN mesh communication & circuit design',
              },
              {
                name: 'Larshnn Sathyaa S',
                role: 'AI Segregation & Ledger Engineer',
                initials: 'LS',
                focus: 'Browser SHA-256 cryptographic verification, robotic gripper kinematics & MobileNet CV',
              },
            ].map((member, i) => (
              <div key={i} className="glass-card p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-gradient text-deep font-heading font-extrabold text-xl flex items-center justify-center shadow-lg mb-4">
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold text-white text-base">{member.name}</h3>
                <p className="text-xs font-mono text-brand-teal mt-1">{member.role}</p>
                <p className="text-xs text-text-muted mt-3 leading-relaxed">{member.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="glass-card p-6 space-y-4 text-center">
          <h3 className="font-heading font-bold text-white text-base">Engineered Tech Stack</h3>
          <p className="text-xs text-text-muted font-mono">
            Zero external backend dependencies · 100% Client-Side Computation & Local Storage Persistence
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/">
            <Button variant="secondary" size="md">
              ← Return Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={14} />}>
              Launch Live Platform Demo
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
