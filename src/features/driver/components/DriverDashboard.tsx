import React from 'react';

const cardStyle: React.CSSProperties = {
    flex: 1,
    margin: '0 12px',
    padding: 24,
    borderRadius: 8,
    background: '#f5f5f5',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    minWidth: 0,
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 24,
    marginTop: 24,
};

const DriverDashboard: React.FC = () => {
    return (
        <div style={{ padding: 24 }}>
            <h1>Driver Dashboard</h1>
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h2>Motoristas Ativos</h2>
                    <ul>
                        <li>5 motoristas ativos</li>
                    </ul>
                </div>
                <div style={cardStyle}>
                    <h2>Motoristas Cadastrados Este Mês</h2>
                    <ul>
                        <li>2 motoristas cadastrados</li>
                    </ul>
                </div>
                <div style={cardStyle}>
                    <h2>Notificações</h2>
                    <ul>
                        <li>Sem novas notificações.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;