import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eventsApi } from '@web/features/events/api/eventsApi';
import { establishmentsApi } from '@web/features/establishments/api/establishmentsApi';
import styles from './event-detail.module.css';
import { ReserveButton } from '@web/shared/components/ReserveButton';
import { EventMap } from '@web/shared/components/EventMap';

type Props = { params: { id: string } };

export default async function EventDetailPage({ params }: Props) {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (isNaN(id) || id <= 0) {
        notFound();
    }

    const event = await eventsApi.getEvent(id);
    if (!event) notFound();

    const establishment = await establishmentsApi.getEstablishment(event.establishmentId);

    const similarEvents = await eventsApi.getEvents({
        wilayaId: event.wilayaId,
        eventTypeId: event.eventTypeId,
    });

    const recommendations = similarEvents
        .filter((e) => e.id !== event.id)
        .slice(0, 4);

    return (
        <main className={styles.page}>
            <div className={styles.headingRow}>
                <Link href="/events" className={styles.back}>← Retour à la liste</Link>
            </div>

            <section className={styles.hero}>
                <img src={event.posterUrl || '/placeholder-event.jpg'} alt={event.title} className={styles.poster} />
                <div className={styles.info}>
                    <h1>{event.title}</h1>
                    <p className={styles.eventDate}>{new Date(event.startDate).toLocaleString('fr-FR')}</p>
                    <p>Wilaya: {event.wilaya?.name || event.wilayaId}</p>
                    <p>Lieu: {establishment?.name || 'À définir'}</p>
                    <p>Type: {event.eventType?.name || event.type || 'Inconnu'}</p>
                    <p>Prix: {event.free ? 'Gratuit' : event.price ? `${event.price} DA` : 'À définir'}</p>
                    <ReserveButton />
                </div>
            </section>

            <section className={styles.details}>
                <h2>Description</h2>
                <p>{event.description || 'Aucune description disponible.'}</p>

                <h3>Capacité</h3>
                <p>{establishment?.capacity ?? 'N/A'}</p>

                <h3>Adresse</h3>
                <p>{establishment?.address || 'Adresse non renseignée'}</p>

                <h3>Carte du lieu</h3>
                {establishment?.latitude && establishment?.longitude ? (
                    <EventMap
                        lat={establishment.latitude}
                        lng={establishment.longitude}
                        name={establishment.name}
                    />
                ) : (
                    <div className={styles.mapPlaceholder}>Localisation non disponible</div>
                )}
                <a
                    href={`https://www.google.com/maps?q=${establishment.latitude},${establishment.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', marginTop: '8px', color: '#d9a96f' }}
                >
                    Ouvrir dans Google Maps
                </a>
            </section>

            {recommendations.length > 0 && (
                <section className={styles.recommendations}>
                    <h2>Événements similaires</h2>
                    <div className={styles.recommendationGrid}>
                        {recommendations.map((item) => (
                            <article key={item.id} className={styles.recommendationCard}>
                                <img src={item.posterUrl || '/placeholder-event.jpg'} alt={item.title} />
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{new Date(item.startDate).toLocaleDateString('fr-FR')}</p>
                                    <Link href={`/events/${item.id}`} className={styles.link}>Voir détails</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
