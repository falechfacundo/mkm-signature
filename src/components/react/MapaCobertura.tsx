'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import { Plus, Minus } from 'lucide-react';

const normalize = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '');

const COVERAGE_NAMES = new Set([
  'Nuñez', 'Belgrano', 'Vicente López',
  'Palermo', 'Recoleta', 'Caballito',
  'Almagro', 'Balvanera', 'Villa Crespo',
  'Chacarita', 'Colegiales', 'Retiro',
  'San Nicolás', 'Monserrat', 'Puerto Madero',
].map(normalize));

interface Feature {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: GeoPermissibleObjects;
}

interface Props {
  hoveredZone: string | null;
  onHoverZone: (name: string | null) => void;
}

export default function MapaCobertura({ hoveredZone, onHoverZone }: Props) {
  const [features, setFeatures] = useState<Array<{ d: string; name: string; key: string; isCoverage: boolean }>>([]);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1.3 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const tfRef = useRef({ x: 0, y: 0, k: 1.3 });
  const hoveredRef = useRef(hoveredZone);
  hoveredRef.current = normalize(hoveredZone || '');

  const zoomTo = useCallback((newK: number, cx = 400, cy = 300) => {
    setTransform((prev) => {
      const clamped = Math.max(0.5, Math.min(8, newK));
      const nx = cx - (cx - prev.x) * (clamped / prev.k);
      const ny = cy - (cy - prev.y) * (clamped / prev.k);
      const t = { x: nx, y: ny, k: clamped };
      tfRef.current = t;
      return t;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = ((e.clientX - rect.left) / rect.width) * 800;
    const cy = ((e.clientY - rect.top) / rect.height) * 600;
    zoomTo(tfRef.current.k * delta, cx, cy);
  }, [zoomTo]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX - tfRef.current.x, y: e.clientY - tfRef.current.y };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    const nx = e.clientX - dragStart.current.x;
    const ny = e.clientY - dragStart.current.y;
    tfRef.current = { ...tfRef.current, x: nx, y: ny };
    setTransform((prev) => ({ ...prev, x: nx, y: ny }));
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => e.preventDefault();
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  useEffect(() => {
    fetch('/maps/caba.geojson')
      .then((r) => r.json())
      .then((geojson) => {
        if (!geojson?.features) return;

        const projection = geoMercator()
          .fitSize([800, 600], geojson as unknown as GeoPermissibleObjects);

        const pathGen = geoPath().projection(projection);

        const projected = geojson.features
          .map((f: Feature) => {
            const rawName = (f.properties?.NOMBRE || f.properties?.nombre || f.properties?.name || '') as string;
            const d = pathGen(f.geometry);
            if (!d) return null;
            const key = normalize(rawName);
            const isCoverage = COVERAGE_NAMES.has(key);
            return { d, name: rawName, key, isCoverage };
          })
          .filter(Boolean);

        setFeatures(projected);
      })
      .catch(() => {});
  }, []);

  const getFill = (key: string, isCoverage: boolean) => {
    if (!isCoverage) return 'rgba(59,130,246,0.08)';
    if (hoveredRef.current === key) return 'rgba(212,167,44,0.6)';
    return 'rgba(212,167,44,0.25)';
  };

  const getStroke = (key: string, isCoverage: boolean) => {
    if (!isCoverage) return 'rgba(59,130,246,0.12)';
    if (hoveredRef.current === key) return 'rgba(212,167,44,0.85)';
    return 'rgba(212,167,44,0.4)';
  };

  const getStrokeWidth = (key: string, isCoverage: boolean) => {
    if (!isCoverage) return 0.5;
    if (hoveredRef.current === key) return 2;
    return 1;
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '380px', background: 'rgba(8,12,20,0.4)', borderRadius: '12px', overflow: 'hidden', userSelect: 'none' }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        style={{ width: '100%', height: '100%', cursor: dragging.current ? 'grabbing' : 'grab' }}
        overflow="visible"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { onHoverZone(null); setTooltip(null); }}
      >
        <g transform={`translate(${x},${y}) scale(${k})`}>
          {features.map((f, i) => (
            <path
              key={f.key + i}
              d={f.d}
              fill={getFill(f.key, f.isCoverage)}
              stroke={getStroke(f.key, f.isCoverage)}
              strokeWidth={getStrokeWidth(f.key, f.isCoverage)}
              style={{
                transition: 'all 0.2s ease',
                cursor: f.isCoverage ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (!f.isCoverage) return;
                onHoverZone(f.name);
                const rect = (e.currentTarget as SVGPathElement).getBBox();
                const ctm = (e.currentTarget as SVGPathElement).getScreenCTM();
                if (ctm && svgRef.current) {
                  const svgRect = svgRef.current.getBoundingClientRect();
                  const pt = svgRef.current.createSVGPoint();
                  pt.x = rect.x + rect.width / 2;
                  pt.y = rect.y + rect.height / 2;
                  const screenPt = pt.matrixTransform(ctm);
                  setTooltip({
                    name: f.name,
                    x: screenPt.x - svgRect.left,
                    y: screenPt.y - svgRect.top,
                  });
                }
              }}
              onMouseLeave={() => {
                onHoverZone(null);
                setTooltip(null);
              }}
            />
          ))}
        </g>
      </svg>

      <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', zIndex: 5 }}>
        <button
          onClick={() => zoomTo(tfRef.current.k * 1.4)}
          style={{
            width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--bg-border)',
            background: 'rgba(14,22,40,0.9)', color: 'var(--text-secondary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => zoomTo(tfRef.current.k * 0.7)}
          style={{
            width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--bg-border)',
            background: 'rgba(14,22,40,0.9)', color: 'var(--text-secondary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Minus size={14} />
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', zIndex: 5 }}>
        <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.6rem', opacity: 0.6 }}>
          {Math.round(k * 100)}%
        </span>
      </div>

      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y - 12,
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(14,22,40,0.95)',
            backdropFilter: 'blur(8px)',
            color: '#f0efe8',
            fontSize: '0.75rem',
            fontWeight: 500,
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(212,167,44,0.3)',
            zIndex: 10,
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}
