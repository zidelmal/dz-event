"use client";

export function ReserveButton() {
    return (
        <button
            onClick={() => alert('Réservation en cours de développement...')}
            style={{
                marginTop: '14px',
                padding: '10px 16px',
                borderRadius: '12px',
                background: '#d9a96f',
                color: '#2e1c11',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Réserver
        </button>
    );
}