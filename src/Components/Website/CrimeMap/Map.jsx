import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { geoData } from '../../../data/ogun_state';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [crimeType, setCrimeType] = useState('Rape');
  const [hoveredArea, setHoveredArea] = useState(null);

  
  const crimeData = {
    'AbeokutaNorth': { level: 'low', reports: 2 },
    'AbeokutaSouth': { level: 'moderate', reports: 4 },
    'AdoOdo/Ota': { level: 'low', reports: 2 },
    'Ewekoro': { level: 'high', reports: 8 },
    'Ifo': { level: 'normal', reports: 0 },
    'IjebuEast': { level: 'normal', reports: 0 },
    'IjebuNorth': { level: 'moderate', reports: 4 },
    'IjebuNorthEast': { level: 'moderate', reports: 3 },
    'IjebuOde': { level: 'moderate', reports: 6 },
    'Ikenne': { level: 'low', reports: 2 },
    'ImekoAfon': { level: 'normal', reports: 0 },
    'Ipokia': { level: 'normal', reports: 0 },
    'Obafemi-Owode': { level: 'moderate', reports: 5 },
    'Odeda': { level: 'normal', reports: 0 },
    'OgunWaterside': { level: 'low', reports: 1 },
    'RemoNorth': { level: 'moderate', reports: 3 },
    'Sagamu': { level: 'low', reports: 1 },
    'YewaNorth': { level: 'normal', reports: 0 },
    'YewaSouth': { level: 'low', reports: 1 }
  };

  // Calculate bounding box and create projection
  const { bounds, projection } = useMemo(() => {
    if (!geoData?.features?.length) return { bounds: null, projection: null };
    
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;
    
    geoData.features.forEach(feature => {
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates[0].forEach(coord => {
          const [lng, lat] = coord;
          minLng = Math.min(minLng, lng);
          maxLng = Math.max(maxLng, lng);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        });
      }
    });
    
    const bounds = { minLng, maxLng, minLat, maxLat };
    
    // Create a simple projection function
    const projection = (lng, lat) => {
      const svgWidth = 800;
      const svgHeight = 600;
      const padding = 50;
      
      const x = ((lng - minLng) / (maxLng - minLng)) * (svgWidth - 2 * padding) + padding;
      const y = ((maxLat - lat) / (maxLat - minLat)) * (svgHeight - 2 * padding) + padding;
      
      return [x, y];
    };
    
    return { bounds, projection };
  }, []);

  // Convert GeoJSON coordinates to SVG path
  const coordinatesToPath = (coordinates) => {
    if (!projection) return '';
    
    return coordinates[0].map((coord, index) => {
      const [x, y] = projection(coord[0], coord[1]);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ') + ' Z';
  };

  const getColorClass = (level) => {
    switch (level) {
      case 'high': return 'fill-red-600 hover:fill-red-700';
      case 'moderate': return 'fill-orange-500 hover:fill-orange-600';
      case 'low': return 'fill-yellow-500 hover:fill-yellow-600';
      default: return 'fill-gray-300 hover:fill-gray-400';
    }
  };

  // Normalize LGA names for matching
  const normalizeName = (name) => {
    return name.replace(/[\s\-\/]/g, '').toLowerCase();
  };

  const getCrimeDataForLGA = (lgaName) => {
    const normalizedInput = normalizeName(lgaName);
    const matchingKey = Object.keys(crimeData).find(key => 
      normalizeName(key) === normalizedInput
    );
    return matchingKey ? crimeData[matchingKey] : { level: 'normal', reports: 0 };
  };

  const legendItems = [
    { color: 'bg-yellow-500', label: '0-2 reports/km²', description: 'Low crime concentration' },
    { color: 'bg-orange-500', label: '3-7 reports/km²', description: 'Moderate crime activity' },
    { color: 'bg-red-600', label: '8+ reports/km²', description: 'High concentration / Hotspot area' },
    { color: 'bg-gray-300', label: '0 reports/km²', description: 'Normal Zone' }
  ];

  const availableLocations = Object.keys(crimeData);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      {/* Header Controls */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Location:</span>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option>Select Location</option>
            {availableLocations.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Date Range:</span>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Crime Type:</span>
          <select 
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option>Rape</option>
            <option>Theft</option>
            <option>Assault</option>
            <option>Burglary</option>
            <option>Robbery</option>
            <option>Vandalism</option>
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-white rounded-lg border shadow-sm p-4 min-h-96">
        <svg viewBox="0 0 800 600" className="w-full h-full bg-gray-50">
          {geoData?.features?.map((feature, index) => {
            const lgaName = feature.properties.NAME_2;
            const crimeInfo = getCrimeDataForLGA(lgaName);
            
            if (feature.geometry.type === 'Polygon') {
              const pathData = coordinatesToPath(feature.geometry.coordinates);
              const [centerX, centerY] = projection ? 
                projection(
                  feature.geometry.coordinates[0].reduce((sum, coord) => sum + coord[0], 0) / feature.geometry.coordinates[0].length,
                  feature.geometry.coordinates[0].reduce((sum, coord) => sum + coord[1], 0) / feature.geometry.coordinates[0].length
                ) : [0, 0];
              
              return (
                <g key={index}>
                  <path
                    d={pathData}
                    className={`${getColorClass(crimeInfo.level)} stroke-white stroke-2 cursor-pointer transition-all duration-200`}
                    onMouseEnter={() => setHoveredArea(lgaName)}
                    onMouseLeave={() => setHoveredArea(null)}
                  />
                  <text
                    x={centerX}
                    y={centerY}
                    className="text-xs font-bold fill-white pointer-events-none drop-shadow-sm"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                  >
                    {lgaName.toUpperCase()}
                  </text>
                </g>
              );
            }
            return null;
          })}
        </svg>
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white rounded shadow-md">
          <button className="w-8 h-8 bg-white border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 first:rounded-t last:rounded-b">
            <span className="text-lg font-bold text-gray-600">+</span>
          </button>
          <button className="w-8 h-8 bg-white flex items-center justify-center hover:bg-gray-50 first:rounded-t last:rounded-b">
            <span className="text-lg font-bold text-gray-600">−</span>
          </button>
        </div>
        
        {/* Hover Tooltip */}
        {hoveredArea && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-2 rounded shadow-lg text-sm">
            <div className="font-medium">{hoveredArea}</div>
            <div>{getCrimeDataForLGA(hoveredArea).reports} reports</div>
            <div className="text-xs opacity-75 capitalize">{getCrimeDataForLGA(hoveredArea).level} activity</div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-8 justify-center">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${item.color}`}></div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800">{item.label}</div>
              <div className="text-gray-600 text-xs">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats Summary */}
      {/* <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{Object.values(crimeData).reduce((sum, data) => sum + data.reports, 0)}</div>
          <div className="text-sm text-gray-600">Total Reports</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{Object.values(crimeData).filter(data => data.level === 'high').length}</div>
          <div className="text-sm text-gray-600">High Risk Areas</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{Object.values(crimeData).filter(data => data.level === 'moderate').length}</div>
          <div className="text-sm text-gray-600">Moderate Risk</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{Object.values(crimeData).filter(data => data.level === 'normal').length}</div>
          <div className="text-sm text-gray-600">Safe Areas</div>
        </div>
      </div> */}
    </div>
  );
};

export default Map;