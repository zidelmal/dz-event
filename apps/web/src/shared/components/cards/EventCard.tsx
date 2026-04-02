import Link from 'next/link';
import styles from './EventCard.module.css';

import type { Event } from '@web/features/events/types';

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  const date = new Date(event.startDate).toLocaleString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const createdAt = event.createdAt ? new Date(event.createdAt) : new Date(event.startDate);
  const isNew = Date.now() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={event.posterUrl || '/placeholder-event.jpg'}
          alt={event.title}
          className={styles.image}
        />
        {event.free && <span className={styles.badge}>GRATUIT</span>}
        {isNew && <span className={`${styles.badge} ${styles.new}`}>NOUVEAU</span>}
      </div>
      <div className={styles.content}>
        <h3>{event.title}</h3>
        <p className={styles.meta}>{date} · {event.wilaya?.name || `#${event.wilayaId}`}</p>
        <p className={styles.meta}>{event.eventType?.name || event.type || 'Événement'}</p>
        <p className={styles.price}>{event.free ? 'Gratuit' : event.price ? `${event.price} DA` : 'À partir de -'}</p>
        <Link href={`/events/${event.id}`} className={styles.detailsButton}>Voir détails</Link>
      </div>
    </article>
  );
}
