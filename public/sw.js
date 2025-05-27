const CACHE_NAME = "prateek-portfolio-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/logo.svg",
  "/placeholder.svg",
  "/Prateek_Kumar_Resume.pdf",
  "/assets/myprofile.png",
  "/assets/about.png",
  "/assets/P.json",
  "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Check if we received a valid response
            if (
              !fetchResponse ||
              fetchResponse.status !== 200 ||
              fetchResponse.type !== "basic"
            ) {
              return fetchResponse;
            }

            // Clone the response
            const responseToCache = fetchResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return fetchResponse;
          })
        );
      })
      .catch(() => {
        // Return offline page or placeholder for navigation requests
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
        // Return placeholder image for image requests
        if (event.request.destination === "image") {
          return caches.match("/placeholder.svg");
        }
      })
  );
});

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form") {
    event.waitUntil(handleContactFormSync());
  }
});

async function handleContactFormSync() {
  // Handle background sync for contact form when online
  const formData = await getStoredFormData();
  if (formData) {
    try {
      // Attempt to send the form data
      await sendFormData(formData);
      // Clear stored data on success
      await clearStoredFormData();
    } catch (error) {
      console.log("Failed to sync form data:", error);
    }
  }
}

// Push notification handler
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update available!",
    icon: "/logo.svg",
    badge: "/logo.svg",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Portfolio",
        icon: "/logo.svg",
      },
      {
        action: "close",
        title: "Close",
        icon: "/logo.svg",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Prateek Kumar Portfolio", options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(self.clients.openWindow("/"));
  }
});

// Helper functions
async function getStoredFormData() {
  const cache = await caches.open("form-data");
  const response = await cache.match("/form-data");
  return response ? response.json() : null;
}

async function sendFormData(data) {
  // Try to send via EmailJS if configured
  try {
    // This would need to be adapted to work with EmailJS in a service worker context
    // For now, we'll store it and let the main thread handle it when online
    console.log("Form data to be sent when online:", data);
    return Promise.resolve();
  } catch (error) {
    console.error("Failed to send form data:", error);
    throw error;
  }
}

async function clearStoredFormData() {
  const cache = await caches.open("form-data");
  await cache.delete("/form-data");
}
