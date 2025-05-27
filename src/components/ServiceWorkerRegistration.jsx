import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
    useEffect(() => {
        if ('serviceWorker' in navigator && import.meta.env.PROD) {
            const registerSW = async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                        scope: '/',
                    });

                    console.log('ServiceWorker registration successful with scope: ', registration.scope);

                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New content available, notify user
                                    if (window.confirm('New version available! Reload to update?')) {
                                        window.location.reload();
                                    }
                                }
                            });
                        }
                    });

                    // Check for updates every 30 seconds when focused
                    let updateCheckInterval;
                    const startUpdateCheck = () => {
                        updateCheckInterval = setInterval(() => {
                            registration.update();
                        }, 30000);
                    };

                    const stopUpdateCheck = () => {
                        if (updateCheckInterval) {
                            clearInterval(updateCheckInterval);
                        }
                    };

                    window.addEventListener('focus', startUpdateCheck);
                    window.addEventListener('blur', stopUpdateCheck);

                    // Start checking for updates immediately
                    startUpdateCheck();

                    // Background sync registration
                    if ('sync' in window.ServiceWorkerRegistration.prototype) {
                        // Register for background sync
                        await registration.sync.register('contact-form');
                    }

                    // Push notification setup
                    if ('PushManager' in window && 'Notification' in window) {
                        // Request notification permission
                        if (Notification.permission === 'default') {
                            await Notification.requestPermission();
                        }
                    }

                } catch (error) {
                    console.log('ServiceWorker registration failed: ', error);
                }
            };

            registerSW();
        }        // Add offline indicator with improved logic
        let wasOffline = false;
        let onlineTimeout = null;

        const updateOnlineStatus = () => {
            const body = document.body;

            if (navigator.onLine) {
                // Only show "back online" banner if we were actually offline
                if (wasOffline) {
                    body.classList.remove('offline');
                    body.classList.add('online');

                    // Remove the online banner after 3 seconds
                    if (onlineTimeout) clearTimeout(onlineTimeout);
                    onlineTimeout = setTimeout(() => {
                        body.classList.remove('online');
                    }, 3000);

                    wasOffline = false;
                } else {
                    // Just remove offline class if we weren't actually offline
                    body.classList.remove('offline', 'online');
                }
            } else {
                // We're offline
                wasOffline = true;
                body.classList.remove('online');
                body.classList.add('offline');
                if (onlineTimeout) clearTimeout(onlineTimeout);
            }
        };

        // Debounce the online/offline events to prevent false positives during navigation
        let onlineDebounceTimeout = null;
        let offlineDebounceTimeout = null;

        const handleOnline = () => {
            if (offlineDebounceTimeout) clearTimeout(offlineDebounceTimeout);
            if (onlineDebounceTimeout) clearTimeout(onlineDebounceTimeout);

            onlineDebounceTimeout = setTimeout(() => {
                updateOnlineStatus();
            }, 100); // Small delay to prevent false positives
        };

        const handleOffline = () => {
            if (onlineDebounceTimeout) clearTimeout(onlineDebounceTimeout);
            if (offlineDebounceTimeout) clearTimeout(offlineDebounceTimeout);

            offlineDebounceTimeout = setTimeout(() => {
                updateOnlineStatus();
            }, 500); // Longer delay for offline to avoid false positives during navigation
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Set initial status without triggering banner
        const body = document.body;
        if (navigator.onLine) {
            body.classList.remove('offline', 'online');
        } else {
            wasOffline = true;
            body.classList.add('offline');
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (onlineTimeout) clearTimeout(onlineTimeout);
            if (onlineDebounceTimeout) clearTimeout(onlineDebounceTimeout);
            if (offlineDebounceTimeout) clearTimeout(offlineDebounceTimeout);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default ServiceWorkerRegistration;
