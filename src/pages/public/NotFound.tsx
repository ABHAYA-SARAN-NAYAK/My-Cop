import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Trash2, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-deep text-text-main flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-3xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center shadow-[0_0_35px_rgba(34,229,139,0.3)] mx-auto">
          <Trash2 size={56} className="text-brand-green animate-bounce" />
        </div>
        <span className="text-3xl absolute -bottom-2 -right-2">♻️</span>
      </div>

      <span className="text-xs font-mono uppercase text-brand-teal tracking-wider bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20">
        404 – Error Route
      </span>

      <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-4">
        This Page Got Recycled!
      </h1>

      <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-sm leading-relaxed">
        The route you are trying to visit was processed into secondary polymer granules or never existed in the city manifest.
      </p>

      <div className="mt-6">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft size={16} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
