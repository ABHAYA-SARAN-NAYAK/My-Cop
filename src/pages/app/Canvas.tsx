import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import {
  Kanban,
  Users,
  Activity,
  Cpu,
  Heart,
  Smartphone,
  Layers,
  DollarSign,
  PieChart,
  Printer,
  Maximize2,
  Sparkles,
  Award,
} from 'lucide-react';

export const CanvasPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const canvasBlocks = [
    {
      id: 'partners',
      title: 'Key Partners',
      icon: Users,
      color: '#38BDF8',
      items: [
        'Greater Chennai Corporation & Smart City SPVs',
        'Certified Recyclers & Biogas Operators (GreenLoop, TN BioAgro)',
        'Environmental NGOs (Akshaya Patra, Environmentalist Foundation)',
        'Electronics Manufacturers (E-waste take-back)',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'activities',
      title: 'Key Activities',
      icon: Activity,
      color: '#4ADE80',
      items: [
        'IoT Telemetry & LoRaWAN Network Maintenance',
        'Dynamic Haversine Route Optimization for Logistics',
        'B2B Marketplace Escrow & Quality Arbitration',
        'Citizen Awareness & Gamification Marketing',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'value',
      title: 'Value Proposition',
      icon: Sparkles,
      color: '#22E58B',
      items: [
        'Connecting waste generators directly to commercial recyclers',
        '98%+ Segregation purity with automated AI computer vision',
        'Zero-corruption proof via SHA-256 blockchain ledger',
        'Tangible economic rewards for citizen compliance',
        '35% fuel & logistics savings for city municipalities',
      ],
      colSpan: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      id: 'relationships',
      title: 'Customer Relationships',
      icon: Heart,
      color: '#F472B6',
      items: [
        'Cryptographic Transparency & ESG Audits',
        'Trust-based automated payments & verified purity',
        'Gifts & Rewards: Metro recharge, property tax rebate',
        'Self-service web & mobile dashboards',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'segments',
      title: 'Customer Segments',
      icon: Layers,
      color: '#A78BFA',
      items: [
        'Urban Households & Residential Welfare Associations',
        'Bulk Waste Generators (Hotels, Hospitals, Tech Parks)',
        'Industrial Recyclers (Plastics, Metals, Glass, E-waste)',
        'Municipal Corporations & Smart City Authorities',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'resources',
      title: 'Key Resources',
      icon: Cpu,
      color: '#2DD4BF',
      items: [
        'Solar-Assisted Ultrasonic Smart IoT Bins',
        'Edge AI Camera & Robotic Sorter Grippers',
        'Browser-native SHA-256 Distributed Ledger Engine',
        'Geo-spatial Dispatch Fleet Architecture',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'channels',
      title: 'Channels',
      icon: Smartphone,
      color: '#FBBF24',
      items: [
        'MyCop Progressive Web & Mobile Application',
        'Municipal Ward Office Tie-ups & Physical Kiosks',
        'IoT Bin Touchscreen QR Interaction Points',
        'Direct Enterprise B2B Procurement Portal',
      ],
      colSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'cost',
      title: 'Cost Structure',
      icon: PieChart,
      color: '#EF4444',
      items: [
        'Hardware Manufacturing & Sensor Retrofit Costs',
        'Cloud Server Infrastructure, Storage & Network Bandwidth',
        'Fleet Logistics, EV Truck Maintenance & Fuel Overhead',
        'Citizen Rewards & Community Awareness Operations',
      ],
      colSpan: 'col-span-1 md:col-span-5',
    },
    {
      id: 'revenue',
      title: 'Revenue Streams',
      icon: DollarSign,
      color: '#22E58B',
      items: [
        'Municipal SaaS Subscription (₹250 - ₹450 / bin / month)',
        '3.5% to 5.0% B2B Marketplace Transaction Take-Rate',
        'Compressed BioGas & Organic Compost Fertilizer Sales',
        'Enterprise IP & Smart City Technology Licensing',
      ],
      colSpan: 'col-span-1 md:col-span-5',
    },
  ];

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-deep p-6 overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-white">
              Business Model Canvas
            </h1>
            <span className="text-xs font-mono text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full border border-brand-green/20">
              SEVA FIRST INNOVATION CHALLENGE Strategy
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Complete 9-block business model synthesizing technical, operational, and commercial viability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer size={14} />}
          >
            Print / Export PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            leftIcon={<Maximize2 size={14} />}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Present Mode'}
          </Button>
        </div>
      </div>

      {/* 9-Block Grid */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        {canvasBlocks.map((block) => {
          const Icon = block.icon;
          return (
            <div
              key={block.id}
              className={`glass-card p-5 border-white/10 hover:border-white/30 transition-all duration-200 flex flex-col justify-between ${block.colSpan}`}
              style={{
                boxShadow: `0 0 15px ${block.color}10`,
              }}
            >
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${block.color}20`, color: block.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-sm" style={{ color: block.color }}>
                    {block.title}
                  </h3>
                </div>

                <ul className="mt-3 space-y-2 text-xs text-text-muted leading-relaxed">
                  {block.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-green mt-0.5 flex-shrink-0">•</span>
                      <span className="text-slate-200 font-sans">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
