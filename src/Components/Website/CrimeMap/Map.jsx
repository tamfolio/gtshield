import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { geoData } from '../../../data/ogun_state';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [crimeType, setCrimeType] = useState('Rape');
  const [hoveredArea, setHoveredArea] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [touchStartDistance, setTouchStartDistance] = useState(0);

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

  // Get touch distance for pinch zoom
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle mouse move to track cursor position
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Handle panning
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle touch move for mobile
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
    
    if (e.touches.length === 1 && isPanning) {
      // Single touch - panning
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastPanPoint.x;
      const deltaY = touch.clientY - lastPanPoint.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      // Two touch - pinch zoom
      const currentDistance = getTouchDistance(e.touches);
      if (touchStartDistance > 0) {
        const scale = currentDistance / touchStartDistance;
        const newZoom = Math.max(0.5, Math.min(5, zoomLevel * scale));
        setZoomLevel(newZoom);
        setTouchStartDistance(currentDistance);
      }
    }
  };

  // Handle zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  // Handle pan start
  const handleMouseDown = (e) => {
    setIsPanning(true);
    setLastPanPoint({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  // Handle touch start
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Single touch - start panning
      setIsPanning(true);
      const touch = e.touches[0];
      setLastPanPoint({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      // Two touches - start pinch zoom
      setIsPanning(false);
      setTouchStartDistance(getTouchDistance(e.touches));
    }
  };

  // Handle pan end
  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsPanning(false);
    setTouchStartDistance(0);
  };

  // Reset zoom and pan
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Handle wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(5, prev * delta)));
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
      <div className="relative bg-white rounded-lg border shadow-sm p-4 min-h-96 overflow-hidden">
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full bg-gray-50 cursor-grab active:cursor-grabbing touch-none"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ userSelect: 'none', touchAction: 'none' }}
        >
          <g 
            transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
            transformOrigin="400 300"
          >
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
          </g>
        </svg>
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white rounded shadow-md">
          <button 
            onClick={handleZoomIn}
            className="w-10 h-10 md:w-8 md:h-8 bg-white border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 first:rounded-t last:rounded-b transition-colors"
            title="Zoom In"
          >
            <span className="text-lg font-bold text-gray-600">+</span>
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-10 h-10 md:w-8 md:h-8 bg-white border-b border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Zoom Out"
          >
            <span className="text-lg font-bold text-gray-600">−</span>
          </button>
          <button 
            onClick={handleReset}
            className="w-10 h-10 md:w-8 md:h-8 bg-white flex items-center justify-center hover:bg-gray-50 first:rounded-t last:rounded-b transition-colors text-xs"
            title="Reset View"
          >
            <span className="text-gray-600">⌂</span>
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-xs text-gray-600">
          {Math.round(zoomLevel * 100)}%
        </div>

        {/* Mobile Instructions */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs md:hidden">
          Pinch to zoom • Drag to pan
        </div>
        
        {/* Mouse-Following Tooltip */}
        {hoveredArea && (
          <div 
            className="absolute bg-black text-white px-3 py-2 rounded shadow-lg text-sm pointer-events-none z-10"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 10,
              transform: mousePosition.x > 400 ? 'translateX(-100%)' : 'none'
            }}
          >
            <div className="font-medium">{hoveredArea}</div>
            <div>{getCrimeDataForLGA(hoveredArea).reports} reports</div>
            <div className="text-xs opacity-75 capitalize">{getCrimeDataForLGA(hoveredArea).level} activity</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;