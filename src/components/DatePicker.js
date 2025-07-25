import { useState } from 'react';

export default function DatePicker({ onDateRangeChange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePreset, setActivePreset] = useState('');

  const presets = [
    { label: 'Today', days: 0 },
    { label: 'Next 7 days', days: 7 },
    { label: 'Next 30 days', days: 30 },
    { label: 'Next 3 months', days: 90 },
    { label: 'Next 6 months', days: 180 },
    { label: 'Custom Range', days: null }
  ];

  const handlePresetClick = (preset) => {
    setActivePreset(preset.label);
    
    if (preset.days !== null) {
      const now = new Date();
      const future = new Date();
      future.setDate(now.getDate() + preset.days);

      now.setHours(0, 0, 0, 0); 
      future.setHours(23, 59, 59, 999); 
      
      const start = now.toISOString();
      const end = future.toISOString();
      
      setStartDate(start);
      setEndDate(end);
      onDateRangeChange(start, end);
    }
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      setActivePreset('Custom Range');
      onDateRangeChange(startDate + "T00:00:00.000Z", endDate + "T23:59:59.999Z");
    }
  };

  return (
    <div className="date-range-selector">
      <div className="preset-buttons">
        {presets.map((preset) => (
          <button
            key={preset.label}
            className={`preset-btn ${activePreset === preset.label ? 'active' : ''}`}
            onClick={() => handlePresetClick(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      
      {activePreset === 'Custom Range' && (
        <div className="custom-date-inputs">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={handleCustomDateChange}
            placeholder="Start Date"
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onBlur={handleCustomDateChange}
            placeholder="End Date"
          />
        </div>
      )}
    </div>
  );
};