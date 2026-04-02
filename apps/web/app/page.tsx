"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { eventsApi } from '@web/features/events/api/eventsApi';
import { type Event } from '@web/features/events/types';
import { wilayasApi } from '@web/features/wilayas/api/wilayasApi';
import { type Wilaya } from '@web/features/wilayas/types';
import { EventCard } from '@web/shared/components/cards/EventCard';
import styles from './page.module.css';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [search, setSearch] = useState('');
  const [wilayaId, setWilayaId] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [loadedWilayas, loadedEvents] = await Promise.all([wilayasApi.getWilayas(), eventsApi.getEvents({})]);
      setWilayas(loadedWilayas);
      setEvents(loadedEvents);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return events.filter((event) => {
      if (search && !event.title.toLowerCase().includes(search.toLowerCase()) && !event.description?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (wilayaId && event.wilayaId !== wilayaId) return false;
      return true;
    });
  }, [events, search, wilayaId]);

  const spotlight = filtered.slice(0, 6);

  return (
    <div className={styles.page}>
      <main className={styles.mainHome}>
        <header className={styles.hero}>
          <h1>DZ Event</h1>
          <p>Découvre les meilleurs événements d'Algérie : concerts, théâtres, expositions et plus.</p>
          <div className={styles.actionRow}>
            <select value={wilayaId} onChange={(e) => setWilayaId(e.target.value ? Number(e.target.value) : '')}>
              <option value="">Toutes les wilayas</option>
              {wilayas.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un événement..." />
          </div>
          <Link href="/events" className={styles.cta}>Voir tous les événements</Link>
        </header>

        <section className={styles.spotlight}>
          <div className={styles.spotlightHeader}>
            <h2>Spotlight</h2>
            <p>Derniers événements</p>
          </div>

          {loading ? <p>Chargement...</p> : (
            <div className={styles.carousel}>
              {spotlight.map((event) => (
                <article key={event.id} className={styles.carouselCard}>
                  <img src={event.posterUrl || '/placeholder-event.jpg'} alt={event.title} />
                  <div>
                    <h3>{event.title}</h3>
                    <p>{new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className={styles.recentGrid}>
            {loading ? <p>Chargement...</p> : filtered.slice(0, 8).map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
