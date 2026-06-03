'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, CalendarDays, Clock, Loader2 } from 'lucide-react';
import { SERVICES } from '@config/services';
import { useTurnstile } from '@lib/useTurnstile';
import type { ServiceId } from '@config/services';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
];

const BARRIOS = [
  'Nuñez', 'Belgrano', 'Olivos',
  'Vicente López', 'San Isidro', 'Martínez',
  'La Lucila', 'Florida',
];

const SERVICES_OPTIONS: { id: ServiceId; label: string; price: string }[] = [
  { id: 'corte', label: 'Corte Premium', price: '$15000' },
  { id: 'corte_barba', label: 'Corte + Barba', price: '$18000' },
  { id: 'barba', label: 'Barba Profesional', price: '$10000' },
];

export default function BookingCalendar() {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceId>('corte');
  const [barrio, setBarrio] = useState('');
  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [entreCalle1, setEntreCalle1] = useState('');
  const [entreCalle2, setEntreCalle2] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { execute } = useTurnstile();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isPastDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const compare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < compare;
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
  };

  const handleSelectDate = (day: number) => {
    if (isPastDate(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setSelectedTime(null);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const token = await execute();
      const svc = SERVICES[selectedService];
      const dateStr = selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });

      const dirParts = [barrio, calle, altura].filter(Boolean);
      const entreParts = [entreCalle1, entreCalle2].filter(Boolean);
      const direccion = dirParts.join(', ') + (entreParts.length ? ` (entre ${entreParts.join(' y ')})` : '');

      const message =
        `¡Hola MKM! Quiero reservar un turno:\n\n` +
        `Servicio: ${svc.label} (${svc.price})\n` +
        `Fecha: ${dateStr}\n` +
        `Horario: ${selectedTime} hs\n` +
        (direccion ? `Dirección: ${direccion}\n` : '') +
        `\nGracias!`;

      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message }),
      });

      if (!res.ok) throw new Error('Error al verificar');

      const data = await res.json();
      window.open(data.url, '_blank');
      setConfirmed(true);
    } catch {
      alert('Error al procesar la solicitud. Intentalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          border: '1px solid var(--accent)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '480px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, rgba(20,30,54,0.9), rgba(14,22,40,0.8))',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '999px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <Check size={28} color="#080c14" />
        </motion.div>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Solicitud enviada</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.75rem 0 1.5rem', lineHeight: 1.6 }}>
          Te redirigimos a WhatsApp con los datos de tu reserva. MKM te confirma el turno enseguida.
        </p>
        <button
          onClick={() => {
            setConfirmed(false);
            setSelectedDate(null);
            setSelectedTime(null);
          }}
          style={{
            background: 'none',
            border: '1px solid var(--bg-border)',
            color: 'var(--text-secondary)',
            borderRadius: '10px',
            padding: '0.6rem 1.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Nueva reserva
        </button>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(20,30,54,0.95), rgba(14,22,40,0.9))',
        maxWidth: '560px',
        margin: '0 auto',
        boxShadow: '0 0 50px rgba(212,167,44,0.06)',
      }}
    >
      <div style={{ padding: '1.5rem 1.5rem 0.75rem', borderBottom: '1px solid var(--bg-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <CalendarDays size={15} color="var(--accent)" />
          <span className="mono" style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Seleccioná día y horario
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '0.25rem' }}>
          {DAYS.map((day) => (
            <div key={day} style={{ textAlign: 'center', padding: '6px 0' }}>
              <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
          {calendarDays.map((day, i) => (
            <div key={i}>
              {day !== null ? (
                <motion.button
                  whileHover={!isPastDate(day) ? { scale: 1.12 } : undefined}
                  whileTap={!isPastDate(day) ? { scale: 0.95 } : undefined}
                  onClick={() => handleSelectDate(day)}
                  disabled={isPastDate(day)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: isPastDate(day) ? 'not-allowed' : 'pointer',
                    background: isSelected(day)
                      ? 'var(--accent)'
                      : isToday(day)
                        ? 'color-mix(in srgb, var(--accent) 15%, transparent)'
                        : 'transparent',
                    color: isSelected(day)
                      ? '#080c14'
                      : isPastDate(day)
                        ? 'var(--text-muted)'
                        : 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: isSelected(day) || isToday(day) ? 600 : 400,
                    opacity: isPastDate(day) ? 0.3 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {day}
                </motion.button>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key="time-slots"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.17, 0.67, 0.29, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem 1.5rem 0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="var(--accent)" />
                <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Horario
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.65rem' }}>
                {TIME_SLOTS.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      border: `1px solid ${selectedTime === time ? 'var(--accent)' : 'var(--bg-border)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedTime === time
                        ? 'color-mix(in srgb, var(--accent) 18%, transparent)'
                        : 'transparent',
                      color: selectedTime === time ? 'var(--accent)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.17, 0.67, 0.29, 1] }}
          style={{
            borderTop: '1px solid var(--bg-border)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Servicio
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
            {SERVICES_OPTIONS.map((svc) => (
              <motion.button
                key={svc.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedService(svc.id)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.5rem',
                  border: `1px solid ${selectedService === svc.id ? 'var(--accent)' : 'var(--bg-border)'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: selectedService === svc.id
                    ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
                    : 'transparent',
                  textAlign: 'center',
                }}
              >
                <span style={{ display: 'block', color: selectedService === svc.id ? 'var(--accent)' : 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 500 }}>
                  {svc.label}
                </span>
                <span className="mono" style={{ display: 'block', color: selectedService === svc.id ? 'var(--accent)' : 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
                  {svc.price}
                </span>
              </motion.button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '1rem', marginBottom: '1rem' }}>
            <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Dirección <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>(opcional)</span>
            </span>

            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.6rem',
                padding: '0.65rem 0.75rem',
                borderRadius: '10px',
                border: '1px solid var(--bg-border)',
                background: 'var(--bg-surface)',
                color: barrio ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
              }}
            >
              <option value="">Seleccioná tu barrio</option>
              {BARRIOS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="Calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                }}
              />
              <input
                type="text"
                placeholder="Altura"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="Entre calle 1"
                value={entreCalle1}
                onChange={(e) => setEntreCalle1(e.target.value)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                }}
              />
              <input
                type="text"
                placeholder="Entre calle 2"
                value={entreCalle2}
                onChange={(e) => setEntreCalle2(e.target.value)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(212,167,44,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            style={{
              width: '100%',
              padding: '0.9rem',
              border: 'none',
              borderRadius: '12px',
              background: 'var(--accent)',
              color: '#080c14',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {loading ? (
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            )}
            {loading ? 'Verificando...' : 'Confirmar reserva por WhatsApp'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
