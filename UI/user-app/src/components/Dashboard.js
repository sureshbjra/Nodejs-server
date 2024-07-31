import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <main className="dashboard-content">
                <section className="dashboard-section">
                    <h2>Welcome, User!</h2>
                    <p>This is your dashboard where you can see an overview of your activities.</p>
                </section>
                <section className="dashboard-section">
                    <h2>Recent Activities</h2>
                    <ul>
                        <li>Logged in from new device</li>
                        <li>Updated profile information</li>
                        <li>Completed a new task</li>
                    </ul>
                </section>
                <section className="dashboard-section">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/profile">View Profile</a></li>
                        <li><a href="/settings">Account Settings</a></li>
                        <li><a href="/reports">View Reports</a></li>
                    </ul>
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>© 2024 Your Company</p>
            </footer>
        </div>
    );
};

export default Dashboard;
