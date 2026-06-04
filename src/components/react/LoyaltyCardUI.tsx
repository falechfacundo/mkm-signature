'use client';

import { Gift, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { SITE } from '@config/site';

const MILESTONES = [
  { count: 3, label: 'regalo sorpresa', icon: Gift },
  { count: 7, label: 'corte de regalo', icon: Scissors },
  { count: 10, label: 'upgrade premium gratis', icon: Sparkles },
];

const PROGRESS = 4;
const TOTAL = 10;

export default function LoyaltyCardUI() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
      }}
    >
      <div style={{ maxWidth: 420, width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
              {SITE.name}
            </span>
          </div>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Tu tarjeta de beneficios
          </p>
        </div>

        <div style={{
          border: '1px solid var(--bg-border)',
          borderRadius: '24px',
          padding: '2rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(20,30,54,0.6), rgba(14,22,40,0.6))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(212,167,44,0.06) 0%, transparent 70%)',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <img src="/logo-cara-blanco.svg" alt="" style={{ width: 28, height: 'auto', display: 'block' }} />
              <span className="mono" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.7rem' }}>
                Beneficios MKM
              </span>
            </div>

            <p style={{ margin: '0 0 1.75rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Cada corte suma. Volver tiene recompensa.
            </p>

            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Progreso
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                  {PROGRESS} / {TOTAL} cortes
                </span>
              </div>

              <div style={{
                width: '100%', height: 6,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 99,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(PROGRESS / TOTAL) * 100}%`,
                  height: '100%',
                  background: 'var(--gradient-brand)',
                  borderRadius: 99,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                const unlocked = PROGRESS >= m.count;
                const isNext = !unlocked && (i === 0 || PROGRESS >= MILESTONES[i - 1].count);
                return (
                  <div key={m.count} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    background: unlocked ? 'rgba(212,167,44,0.06)' : 'transparent',
                    border: `1px solid ${unlocked ? 'rgba(212,167,44,0.15)' : 'var(--bg-border)'}`,
                    opacity: unlocked ? 1 : 0.45,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '10px',
                      background: unlocked ? 'rgba(212,167,44,0.1)' : 'rgba(255,255,255,0.03)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color={unlocked ? 'var(--accent)' : 'var(--text-muted)'} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                          {m.count} cortes
                        </div>
                        <div style={{ fontSize: '0.82rem', color: unlocked ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 600, marginTop: '1px' }}>
                          {m.label}
                        </div>
                      </div>
                      {unlocked && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                          Desbloqueado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                marginTop: '1.5rem',
                padding: '0.85rem 1.5rem',
                background: 'var(--accent)',
                color: '#080c14',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'default',
              }}
            >
              <ChevronRight size={18} />
              Ver mi progreso
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
