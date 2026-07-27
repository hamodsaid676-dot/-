import { useState } from 'react';

interface TourOverlayProps {
  onClose: () => void;
  t: any;
}

export default function TourOverlay({ onClose, t }: TourOverlayProps) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: t.tour_title_step, position: 'top-[360px] right-[100px]' }, // Rough estimate for title input
    { title: t.tour_desc_step, position: 'top-[450px] right-[100px]' }, // Rough estimate for desc textarea
    { title: t.tour_style_step, position: 'top-[360px] left-[100px]' }, // Rough estimate for style select
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`absolute ${steps[step].position} bg-white p-6 rounded-2xl shadow-xl w-64`}>
        <h3 className="font-bold text-lg mb-2">{step === 0 ? t.tour_welcome : t.tour_title_step.split(' ')[0] + '...'}</h3>
        <p className="text-slate-600 mb-4">{steps[step].title}</p>
        <button 
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-2 rounded-full font-bold"
        >
          {step === steps.length - 1 ? t.finish : t.next}
        </button>
      </div>
    </div>
  );
}
