import React, { useState } from 'react';

export default function PinCodeChecker() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setResult({
        success: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    const deliverableMetro = ['500033', '110001', '400001', '560001', '600001', '700001', '380001', '411001'];
    const isMetro = deliverableMetro.includes(pincode.trim()) || pincode.startsWith('50') || pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56');

    setResult({
      success: true,
      pincode: pincode.trim(),
      estimatedDays: isMetro ? '2–3 Business Days' : '4–5 Business Days',
      courier: 'Pan-India Express (BlueDart / Delhivery)',
      codAvailable: true,
      freeShipping: true
    });
  };

  return (
    <div className="bg-surface-container-low p-space-md border border-outline-variant">
      <div className="flex items-center gap-space-xs mb-space-xs text-primary">
        <span className="material-symbols-outlined text-[20px] text-secondary">local_shipping</span>
        <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">
          Check Delivery & COD Availability
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-space-xs">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit PIN Code (e.g. 500033)"
          className="flex-1 px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm text-label-sm focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="px-space-md py-space-xs bg-primary text-surface font-label-caps text-label-caps uppercase tracking-wider hover:bg-primary-container transition-colors"
        >
          Check
        </button>
      </form>

      {result && (
        <div className="mt-space-sm pt-space-xs border-t border-outline-variant/50 text-body-sm">
          {result.success ? (
            <div className="space-y-space-2xs">
              <div className="flex items-center gap-1 text-secondary font-semibold font-label-sm">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Deliverable to PIN {result.pincode}
              </div>
              <p className="text-on-surface-variant font-label-sm text-[12px]">
                🚀 Express Delivery: <strong className="text-primary">{result.estimatedDays}</strong> via {result.courier}
              </p>
              <div className="flex gap-space-md font-label-sm text-[11px] text-on-surface-variant pt-1">
                <span>✓ Cash on Delivery Eligible</span>
                <span>✓ 7-Day Artisan Exchange</span>
              </div>
            </div>
          ) : (
            <p className="text-error font-label-sm text-[12px]">{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
