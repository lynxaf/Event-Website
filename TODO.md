# Completed

The public event experience is now connected to the API:

- Homepage loads published events with search, loading, error, and empty states.
- Event details use `/details/:id` and load the selected event.
- Participant sign-in stores the API token and redirects to the correct area.
- Authenticated participants can use checkout and view `/participant/orders`.
- Checkout validates ticket selection and available payment methods.
- Internal navigation no longer relies on placeholder `#` links.


