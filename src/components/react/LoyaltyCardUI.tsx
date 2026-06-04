'use client';

import { Gift, Scissors, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { SITE } from '@config/site';

const PROGRESS = 4;
const TOTAL = 10;

const MILESTONES = [
  { count: 3, label: 'regalo sorpresa', icon: Gift, emoji: '🎁' },
  { count: 7, label: 'corte de regalo', icon: Scissors, emoji: '✂️' },
  { count: 10, label: 'upgrade premium gratis', icon: Sparkles, emoji: '💈' },
];

const BADGES = [
  { min: 0, label: 'New Client', desc: 'Estás empezando' },
  { min: 4, label: 'Regular Client', desc: 'Ya sos parte' },
  { min: 7, label: 'Loyal Client', desc: 'Siempre volvés' },
  { min: 10, label: 'VIP Client', desc: 'Cliente premium' },
];

const TIMELINE = [
  { num: 4, label: 'Corte + Barba', time: 'Hoy' },
  { num: 3, label: 'Corte Premium', time: 'Hace 2 semanas' },
  { num: 2, label: 'Corte Premium', time: 'Hace 1 mes' },
  { num: 1, label: 'Corte + Barba', time: 'Hace 2 meses' },
];

const currentBadge = BADGES.filter(b => PROGRESS >= b.min).pop()!;
const nextMilestone = MILESTONES.find(m => PROGRESS < m.count);

export default function LoyaltyCardUI() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        padding: '2rem 1.25rem 4rem',
      }}
    >
      <div className="loyalty-dashboard">
        <div className="loyalty-header" style={{ gridColumn: '1 / -1' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
            {SITE.name}
          </span>
          <p style={{ margin: '0.1rem 0 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Tu tarjeta de beneficios
          </p>
        </div>

        <div className="loyalty-card" style={{
          border: '1px solid var(--bg-border)',
          borderRadius: '24px',
          padding: '1.75rem 1.5rem',
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
              {MILESTONES.map((m) => {
                const Icon = m.icon;
                const unlocked = PROGRESS >= m.count;
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
                          {m.emoji} {m.label}
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

            <div className="loyalty-cta"
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

        <div className="loyalty-sidebar">
          {nextMilestone && (
            <div style={{
              border: '1px solid rgba(212,167,44,0.2)',
              borderRadius: '18px',
              padding: '1.25rem',
              background: 'rgba(212,167,44,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '12px',
                  background: 'rgba(212,167,44,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <nextMilestone.icon size={18} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Próximo beneficio
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '1px' }}>
                    Te faltan {nextMilestone.count - PROGRESS} cortes para: {nextMilestone.emoji} {nextMilestone.label}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{
            border: '1px solid var(--bg-border)',
            borderRadius: '18px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(20,30,54,0.4), rgba(14,22,40,0.4))',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <Calendar size={14} color="var(--text-muted)" />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Historial de servicios
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {TIMELINE.map((entry) => (
                <div key={entry.num} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  paddingBottom: '0.65rem',
                  borderBottom: entry.num > 1 ? '1px solid var(--bg-border)' : 'none',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)',
                  }}>
                    #{entry.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {entry.label}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                      {entry.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            border: '1px solid var(--bg-border)',
            borderRadius: '18px',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(20,30,54,0.4), rgba(14,22,40,0.4))',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.15rem' }}>
                  Tu nivel
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  {currentBadge.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {currentBadge.desc}
                </div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(212,167,44,0.1)',
                fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)',
              }}>
                {PROGRESS}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .loyalty-dashboard {
          max-width: 420px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .loyalty-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 900px) {
          .loyalty-dashboard {
            max-width: 820px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }
        }
      `}</style>
    </main>
  );
}
