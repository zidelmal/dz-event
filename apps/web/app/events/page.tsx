"use client";

import { useEffect, useMemo, useState } from 'react';
import { getEventTypes, type EventType } from '../../src/features/events/eventTypesApi';
import { getEvents, type Event, type EventFilter } from '../../src/features/events/eventsApi';
import { getWilayas, type Wilaya } from '../../src/features/wilayas/wilayasApi';
import { EventCard } from '../../src/shared/components/EventCard';
import styles from './events.module.css';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [wilayas, setWilayas] = useState<Wilaya[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [search, setSearch] = useState('');
    const [wilayaId, setWilayaId] = useState<number | ''>('');
    const [eventTypeId, setEventTypeId] = useState<number | ''>('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [priceMax, setPriceMax] = useState(10000);
    const [freeOnly, setFreeOnly] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadData = async (filters: EventFilter = {}) => {
        setLoading(true);
        setError('');
        try {
            const data = await getEvents(filters);
            setEvents(data);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const boot = async () => {
            setLoading(true);
            const [w, types] = await Promise.all([getWilayas(), getEventTypes()]);
            setWilayas(w);
            setEventTypes(types);
            setLoading(false);
        };
        boot();
    }, []);

    useEffect(() => {
        const filters: EventFilter = {
            search: search || undefined,
            wilayaId: wilayaId || undefined,
            eventTypeId: eventTypeId || undefined,
            startDate: dateFrom || undefined,
            endDate: dateTo || undefined,
            free: freeOnly || undefined,
            priceMax: !freeOnly && priceMax !== 10000 ? priceMax : undefined,
        };
        // Normaliser date to ISO si présent
        if (dateFrom) filters.startDate = dateFrom;
        if (dateTo) filters.endDate = dateTo;
        loadData(filters);
    }, [search, wilayaId, eventTypeId, dateFrom, dateTo, priceMax, freeOnly]);

    const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
    const paginatedEvents = useMemo(() => {
        const start = (page - 1) * pageSize;
        return events.slice(start, start + pageSize);
    }, [events, page, pageSize]);

    const resetFilters = () => {
        setSearch('');
        setWilayaId('');
        setEventTypeId('');
        setDateFrom('');
        setDateTo('');
        setPriceMax(10000);
        setFreeOnly(false);
        setPage(1);
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1>Événements Algérie</h1>
                <p>Explorez les événements en direct et trouvez ceux qui vous inspirent</p>
            </header>

            <section className={styles.contentLayout}>
                <aside className={styles.filtersPanel}>
                    <h2>Filtres</h2>
                    <label>
                        <span>Recherche</span>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Titre de l'événement" />
                    </label>
                    <label>
                        <span>Wilaya</span>
                        <select value={wilayaId} onChange={(e) => { setWilayaId(e.target.value ? Number(e.target.value) : ''); setPage(1); }}>
                            <option value="">Toutes</option>
                            {wilayas.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
                        </select>
                    </label>
                    <label>
                        <span>Type</span>
                        <select value={eventTypeId} onChange={(e) => { setEventTypeId(e.target.value ? Number(e.target.value) : ''); setPage(1); }}>
                            <option value="">Tous</option>
                            {eventTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </label>
                    <label>
                        <span>Date début</span>
                        <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} />
                    </label>
                    <label>
                        <span>Date fin</span>
                        <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} />
                    </label>
                    <label>
                        <span>Prix max (DA)</span>
                        <input type="range" disabled={freeOnly} min="0" max="10000" step="50" value={priceMax} onChange={(e) => { setPriceMax(Number(e.target.value)); setPage(1); }} />
                        <strong>{freeOnly ? '0 (Gratuit)' : `${priceMax} DA`}</strong>
                    </label>
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" checked={freeOnly} onChange={(e) => { setFreeOnly(e.target.checked); setPage(1); }} />
                        Événements gratuits seulement
                    </label>
                    <button type="button" className={styles.resetButton} onClick={resetFilters}>Réinitialiser</button>
                </aside>

                <section className={styles.gridWrapper}>
                    <div className={styles.filterInfo}>
                        <span>{events.length} résultats</span>
                        {error && <span className={styles.error}>{error}</span>}
                    </div>

                    {loading && <p>Chargement...</p>}
                    {!loading && events.length === 0 && <p>Aucun événement trouvé avec ce filtre.</p>}

                    <div className={styles.grid}>
                        {paginatedEvents.map((event) => <EventCard key={event.id} event={event} />)}
                    </div>

                    <div className={styles.pagination}>
                        <button disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Précédent</button>
                        <span>Page {page} / {totalPages}</span>
                        <button disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>Suivant</button>
                    </div>
                </section>
            </section>
        </main>
    );
}
