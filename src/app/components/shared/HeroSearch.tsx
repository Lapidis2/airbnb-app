import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

/* ─── constants ─────────────────────────────────────────────────── */
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_LABELS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const SUGGESTIONS = [
  { label: 'Kigali, Rwanda',          sub: '40+ stays' },
  { label: 'Nairobi, Kenya',          sub: '30+ stays' },
  { label: 'Paris, France',           sub: '200+ stays' },
  { label: 'New York, USA',           sub: '180+ stays' },
  { label: 'Mombasa, Kenya',          sub: 'Beautiful beaches' },
  { label: 'Cape Town, South Africa', sub: 'Stunning scenery' },
  { label: 'Swiss Alps, Switzerland', sub: 'Mountain retreat' },
];

const FLEX_OPTIONS = [
  { key: 'exact', label: 'Exact dates' },
  { key: '1',     label: '± 1 day'     },
  { key: '2',     label: '± 2 days'    },
  { key: '3',     label: '± 3 days'    },
  { key: '7',     label: '± 7 days'    },
  { key: '14',    label: '± 14 days'   },
];

/* ─── date helpers ──────────────────────────────────────────────── */
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}
function startOf(d: Date) {
  const c = new Date(d); c.setHours(0,0,0,0); return c;
}
function fmtShort(d: Date | null) {
  if (!d) return '';
  return `${MONTH_NAMES[d.getMonth()].slice(0,3)} ${d.getDate()}`;
}
function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function advanceMonth(y: number, m: number, delta: number) {
  let nm = m + delta;
  let ny = y;
  while (nm > 11) { nm -= 12; ny++; }
  while (nm < 0)  { nm += 12; ny--; }
  return { year: ny, month: nm };
}

/* ─── guest counter row ─────────────────────────────────────────── */
function Counter({
  label, sub, val, set, min = 0,
}: { label: string; sub: string; val: number; set: (n: number) => void; min?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F2F2F2' }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1E' }}>{label}</p>
        <p style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>{sub}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => set(Math.max(min, val - 1))}
          disabled={val <= min}
          style={{
            width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${val <= min ? '#DDDDDD' : '#1C1C1E'}`,
            background: 'white', color: val <= min ? '#DDDDDD' : '#1C1C1E',
            cursor: val <= min ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Minus size={14} />
        </button>
        <span style={{ width: 20, textAlign: 'center', fontWeight: 600, fontSize: 14, color: '#1C1C1E' }}>{val}</span>
        <button
          onClick={() => set(val + 1)}
          style={{
            width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #1C1C1E',
            background: 'white', color: '#1C1C1E',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── single-month calendar grid ───────────────────────────────── */
function MonthGrid({
  year, month, today,
  checkin, checkout, hover,
  onDayClick, onDayHover,
}: {
  year: number; month: number; today: Date;
  checkin: Date | null; checkout: Date | null; hover: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}) {
  const firstDow  = new Date(year, month, 1).getDay();
  const daysInMo  = new Date(year, month + 1, 0).getDate();

  const rangeEnd = checkout ?? hover;

  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMo }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div style={{ minWidth: 280 }}>
      {/* Month label */}
      <p style={{
        textAlign: 'center', fontFamily: "'Poppins', sans-serif",
        fontWeight: 600, fontSize: 15, color: '#1C1C1E', marginBottom: 12,
      }}>
        {MONTH_NAMES[month]} {year}
      </p>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {DAY_LABELS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', fontWeight: 600, paddingBottom: 6 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 2 }}>
        {cells.map((date, idx) => {
          if (!date) return <div key={`e${idx}`} />;

          const isPast    = date < today;
          const isStart   = checkin  && sameDay(date, checkin);
          const isEnd     = checkout && sameDay(date, checkout);
          const inRange   = checkin && rangeEnd && date > checkin && date < rangeEnd;
          const isHovered = !checkout && hover && sameDay(date, hover) && checkin && date > checkin;

          let bg    = 'transparent';
          let color = isPast ? '#CCCCCC' : '#1C1C1E';
          let radius = '50%';
          let border = 'none';

          if (isStart || isEnd) {
            bg = '#FF5A5F'; color = 'white';
          } else if (inRange) {
            bg = '#FFF0F0'; color = '#1C1C1E'; radius = '0';
          } else if (isHovered) {
            bg = '#F5F5F5';
          }

          /* flatten start/end into range visually */
          const isRangeStart = isStart && rangeEnd && !sameDay(checkin!, rangeEnd);
          const isRangeEnd   = isEnd && checkin;

          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={() => !isPast && onDayClick(date)}
              onMouseEnter={() => !isPast && onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              style={{
                height: 38, width: '100%',
                background: bg,
                color,
                fontSize: 13,
                border,
                cursor: isPast ? 'not-allowed' : 'pointer',
                fontWeight: (isStart || isEnd) ? 700 : 400,
                borderRadius: inRange
                  ? (isRangeStart ? '50% 0 0 50%' : isRangeEnd ? '0 50% 50% 0' : '0')
                  : '50%',
                outline: 'none',
                transition: 'background .12s',
                position: 'relative',
                zIndex: (isStart || isEnd) ? 1 : 0,
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}


export function HeroSearch() {
  const navigate  = useNavigate();
  const today     = startOf(new Date());

  /* field values */
  const [location,  setLocation]  = useState('');
  const [checkin,   setCheckin]   = useState<Date | null>(null);
  const [checkout,  setCheckout]  = useState<Date | null>(null);
  const [adults,    setAdults]    = useState(2);
  const [children,  setChildren]  = useState(0);
  const [infants,   setInfants]   = useState(0);

  /* UI state */
  const [panel, setPanel] = useState<'where' | 'when' | 'who' | null>(null);
  const [calTab, setCalTab] = useState<'dates' | 'flexible'>('dates');
  const [flexOpt, setFlexOpt] = useState('exact');
  const [calBase, setCalBase] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [hoverDay, setHoverDay] = useState<Date | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  /* click outside → close */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* derived */
  const totalGuests = adults + children;
  const cal2        = advanceMonth(calBase.year, calBase.month, 1);

  const whenDisplay = !checkin
    ? 'Add dates'
    : !checkout
      ? `${fmtShort(checkin)} –`
      : `${fmtShort(checkin)} – ${fmtShort(checkout)}`;

  const whoDisplay = totalGuests === 0
    ? 'Add guests'
    : `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}${infants ? `, ${infants} infant${infants !== 1 ? 's' : ''}` : ''}`;

  const filteredSuggestions = SUGGESTIONS.filter(s =>
    !location || s.label.toLowerCase().includes(location.toLowerCase())
  );

  /* date click logic */
  const handleDayClick = (d: Date) => {
    if (!checkin || (checkin && checkout)) {
      setCheckin(d); setCheckout(null);
    } else {
      if (sameDay(d, checkin)) { setCheckin(null); return; }
      if (d < checkin) { setCheckout(checkin); setCheckin(d); }
      else             { setCheckout(d); }
      setTimeout(() => setPanel('who'), 250);
    }
  };

  /* navigate */
  const handleSearch = () => {
    const p = new URLSearchParams();
    if (location)    p.set('location', location);
    if (checkin)     p.set('checkin',  toISO(checkin));
    if (checkout)    p.set('checkout', toISO(checkout));
    if (totalGuests > 0) p.set('guests', String(totalGuests));
    navigate(`/listings?${p.toString()}`);
    setPanel(null);
  };

  /* shared section active styles */
  const pill: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '14px 20px', cursor: 'pointer', transition: 'background .15s',
    minWidth: 0,
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Main pill ─────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1fr auto',
        background: 'white',
        borderRadius: 18,
        border: '1.5px solid #DDDDDD',
        boxShadow: '0 2px 20px rgba(0,0,0,0.09)',
        overflow: 'hidden',
      }}>

        {/* WHERE */}
        <div
          style={{
            ...pill,
            borderRight: '1.5px solid #DDDDDD',
            background: panel === 'where' ? '#FFF5F5' : 'transparent',
            borderRadius: '16px 0 0 16px',
          }}
          onClick={() => setPanel('where')}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#1C1C1E', marginBottom: 4 }}>
            Where
          </p>
          <input
            value={location}
            onChange={e => { setLocation(e.target.value); setPanel('where'); }}
            onFocus={() => setPanel('where')}
            placeholder="Search destinations"
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: location ? '#1C1C1E' : '#9E9E9E',
              width: '100%', cursor: 'text',
            }}
          />
        </div>

        {/* WHEN */}
        <div
          style={{
            ...pill,
            borderRight: '1.5px solid #DDDDDD',
            background: panel === 'when' ? '#FFF5F5' : 'transparent',
          }}
          onClick={() => setPanel(panel === 'when' ? null : 'when')}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#1C1C1E', marginBottom: 4 }}>
            When
          </p>
          <p style={{ fontSize: 14, color: checkin ? '#1C1C1E' : '#9E9E9E' }}>{whenDisplay}</p>
        </div>

        {/* WHO */}
        <div
          style={{
            ...pill,
            background: panel === 'who' ? '#FFF5F5' : 'transparent',
          }}
          onClick={() => setPanel(panel === 'who' ? null : 'who')}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#1C1C1E', marginBottom: 4 }}>
            Who
          </p>
          <p style={{ fontSize: 14, color: totalGuests > 0 ? '#1C1C1E' : '#9E9E9E' }}>{whoDisplay}</p>
        </div>

        {/* SEARCH BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 10px 8px 6px' }}>
          <button
            onClick={handleSearch}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#FF5A5F', color: 'white',
              border: 'none', borderRadius: 14,
              padding: '13px 22px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700, fontSize: 14,
              cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(255,90,95,0.35)',
              transition: 'opacity .15s, transform .12s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Search size={16} strokeWidth={2.5} />
            Search
          </button>
        </div>
      </div>

      {/* ── WHERE dropdown ──────────────────────────────────────── */}
      {panel === 'where' && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', left: 0,
          background: 'white', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
          border: '1px solid #EBEBEB',
          zIndex: 200, width: 300, overflow: 'hidden',
        }}>
          <p style={{ padding: '14px 16px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8E8E93' }}>
            {location ? 'Matching destinations' : 'Popular destinations'}
          </p>
          {filteredSuggestions.length === 0 && (
            <p style={{ padding: '8px 16px 14px', fontSize: 13, color: '#8E8E93' }}>No matching destinations</p>
          )}
          {filteredSuggestions.map(s => (
            <button
              key={s.label}
              onClick={() => { setLocation(s.label); setPanel('when'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '10px 16px', textAlign: 'left',
                background: 'white', border: 'none', cursor: 'pointer',
                transition: 'background .12s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8F7F4')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <MapPin size={16} style={{ color: '#FF5A5F' }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1E' }}>{s.label}</p>
                <p style={{ fontSize: 11, color: '#8E8E93', marginTop: 1 }}>{s.sub}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── WHEN dropdown (calendar) ──────────────────────────── */}
      {panel === 'when' && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)',
          left: '50%', transform: 'translateX(-50%)',
          background: 'white', borderRadius: 24,
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          border: '1px solid #EBEBEB',
          zIndex: 200, padding: '22px 28px 18px',
          minWidth: 660,
        }}>

          {/* Dates / Flexible tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', background: '#F2F2F2', borderRadius: 30, padding: 3 }}>
              {(['dates','flexible'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setCalTab(t)}
                  style={{
                    padding: '8px 28px', borderRadius: 26, border: 'none', cursor: 'pointer',
                    background: calTab === t ? 'white' : 'transparent',
                    fontWeight: calTab === t ? 600 : 400,
                    fontSize: 14, color: '#1C1C1E',
                    boxShadow: calTab === t ? '0 1px 6px rgba(0,0,0,0.12)' : 'none',
                    transition: 'all .15s',
                    fontFamily: "'Inter', sans-serif",
                    textTransform: 'capitalize',
                  }}
                >
                  {t === 'dates' ? 'Dates' : 'Flexible'}
                </button>
              ))}
            </div>
          </div>

          {calTab === 'dates' ? (
            <>
              {/* Nav + two months */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
                {/* Prev arrow */}
                <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
                  <button
                    onClick={() => setCalBase(b => advanceMonth(b.year, b.month, -1))}
                    style={{
                      width: 30, height: 30, borderRadius: '50%', border: '1px solid #DDDDDD',
                      background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ChevronLeft size={16} style={{ color: '#1C1C1E' }} />
                  </button>
                </div>

                {/* Left month */}
                <div style={{ flex: 1 }}>
                  <MonthGrid
                    year={calBase.year} month={calBase.month}
                    today={today}
                    checkin={checkin} checkout={checkout} hover={hoverDay}
                    onDayClick={handleDayClick} onDayHover={setHoverDay}
                  />
                </div>

                {/* Divider */}
                <div style={{ width: 1, background: '#F2F2F2', alignSelf: 'stretch', margin: '0 4px' }} />

                {/* Right month */}
                <div style={{ flex: 1 }}>
                  <MonthGrid
                    year={cal2.year} month={cal2.month}
                    today={today}
                    checkin={checkin} checkout={checkout} hover={hoverDay}
                    onDayClick={handleDayClick} onDayHover={setHoverDay}
                  />
                </div>

                {/* Next arrow */}
                <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
                  <button
                    onClick={() => setCalBase(b => advanceMonth(b.year, b.month, 1))}
                    style={{
                      width: 30, height: 30, borderRadius: '50%', border: '1px solid #DDDDDD',
                      background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <ChevronRight size={16} style={{ color: '#1C1C1E' }} />
                  </button>
                </div>
              </div>

              {/* Exact / flexible tolerance chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20, justifyContent: 'center' }}>
                {FLEX_OPTIONS.map(o => (
                  <button
                    key={o.key}
                    onClick={() => setFlexOpt(o.key)}
                    style={{
                      padding: '7px 16px', borderRadius: 30, fontSize: 13,
                      border: `1.5px solid ${flexOpt === o.key ? '#1C1C1E' : '#DDDDDD'}`,
                      background: flexOpt === o.key ? '#1C1C1E' : 'white',
                      color: flexOpt === o.key ? 'white' : '#1C1C1E',
                      cursor: 'pointer', fontWeight: 500,
                      transition: 'all .13s',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Clear / confirm */}
              {(checkin || checkout) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid #F2F2F2' }}>
                  <button
                    onClick={() => { setCheckin(null); setCheckout(null); }}
                    style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1E', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Clear dates
                  </button>
                  <button
                    onClick={() => setPanel('who')}
                    style={{
                      padding: '10px 24px', borderRadius: 12, background: '#1C1C1E',
                      color: 'white', border: 'none', cursor: 'pointer',
                      fontSize: 14, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Flexible mode */
            <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
              <p style={{ fontSize: 20, fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: '#1C1C1E', marginBottom: 8 }}>
                How long do you want to stay?
              </p>
              <p style={{ fontSize: 14, color: '#8E8E93', marginBottom: 24 }}>
                Pick a flexible duration and we'll find the best matches.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {['Weekend', '1 week', '2 weeks', '1 month', 'Flexible'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setPanel('who')}
                    style={{
                      padding: '10px 22px', borderRadius: 30, fontSize: 14,
                      border: '1.5px solid #DDDDDD', background: 'white', color: '#1C1C1E',
                      cursor: 'pointer', fontWeight: 500,
                      transition: 'all .13s', fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C1C1E'; e.currentTarget.style.fontWeight = '600'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDDDDD'; e.currentTarget.style.fontWeight = '500'; }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── WHO dropdown (guests) ────────────────────────────── */}
      {panel === 'who' && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0,
          background: 'white', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
          border: '1px solid #EBEBEB',
          zIndex: 200, width: 340, padding: '18px 20px 14px',
        }}>
          <Counter label="Adults"   sub="Age 13 or above" val={adults}   set={setAdults}   min={1} />
          <Counter label="Children" sub="Ages 2–12"       val={children} set={setChildren} />
          <Counter label="Infants"  sub="Under 2"         val={infants}  set={setInfants}  />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            {totalGuests > 0 && (
              <button
                onClick={() => { setAdults(1); setChildren(0); setInfants(0); }}
                style={{ fontSize: 12, fontWeight: 600, color: '#8E8E93', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSearch}
              style={{
                marginLeft: 'auto', padding: '11px 26px', borderRadius: 12,
                background: '#FF5A5F', color: 'white', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 3px 10px rgba(255,90,95,0.3)',
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}