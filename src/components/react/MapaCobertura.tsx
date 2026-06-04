'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import { Plus, Minus } from 'lucide-react';

const normalize = (s: string) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '');

const ZONE_PRICES: Record<number, string> = {
  1: 'Gratis',
  2: '+$3.000',
  3: '+$5.000',
  4: '+$7.000',
};

const ZONE_MAP: Record<string, number> = {
  ...Object.fromEntries(['Palermo'].map(normalize).map(k => [k, 1])),
  ...Object.fromEntries(['Recoleta','Belgrano','Colegiales','Chacarita','Villa Crespo','Almagro','Núñez'].map(normalize).map(k => [k, 2])),
  ...Object.fromEntries(['Caballito','Coghlan','Villa Urquiza','Saavedra','Paternal','Parque Chas','Villa Ortúzar','Balvanera','San Nicolás','Retiro','Puerto Madero'].map(normalize).map(k => [k, 3])),
  ...Object.fromEntries(['Flores','Parque Chacabuco','Boedo','San Cristóbal','Monserrat','San Telmo','Constitución','Barracas','Villa del Parque','Villa Devoto','Villa Pueyrredón','Villa General Mitre','Floresta'].map(normalize).map(k => [k, 4])),
};

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
  const [features, setFeatures] = useState<Array<{ d: string; name: string; key: string; zone: number }>>([]);
  const [tooltip, setTooltip] = useState<{ name: string; price: string; x: number; y: number } | null>(null);
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
            const zone = ZONE_MAP[key] ?? 0;
            return { d, name: rawName, key, zone };
          })
          .filter(Boolean);

        setFeatures(projected);
      })
      .catch(() => {});
  }, []);

  const getFill = (zone: number, key: string) => {
    if (!zone) return 'rgba(59,130,246,0.08)';
    const base = [0, 0.25, 0.15, 0.08, 0.04][zone];
    const hover = [0, 0.6, 0.4, 0.2, 0.1][zone];
    const alpha = hoveredRef.current === key ? hover : base;
    return `rgba(212,167,44,${alpha})`;
  };

  const getStroke = (zone: number, key: string) => {
    if (!zone) return 'rgba(59,130,246,0.12)';
    const base = [0, 0.4, 0.3, 0.15, 0.08][zone];
    const hover = [0, 0.85, 0.6, 0.35, 0.2][zone];
    const alpha = hoveredRef.current === key ? hover : base;
    return `rgba(212,167,44,${alpha})`;
  };

  const getStrokeWidth = (zone: number, key: string) => {
    if (!zone) return 0.5;
    const base = [0, 1, 1, 0.7, 0.5][zone];
    const hover = [0, 2, 1.5, 1.2, 1][zone];
    return hoveredRef.current === key ? hover : base;
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
              fill={getFill(f.zone, f.key)}
              stroke={getStroke(f.zone, f.key)}
              strokeWidth={getStrokeWidth(f.zone, f.key)}
              style={{
                transition: 'all 0.2s ease',
                cursor: f.zone ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (!f.zone) return;
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
                    price: ZONE_PRICES[f.zone] ?? '',
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
          <div>{tooltip.name}</div>
          {tooltip.price && (
            <div style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 600, marginTop: '2px' }}>
              {tooltip.price}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
