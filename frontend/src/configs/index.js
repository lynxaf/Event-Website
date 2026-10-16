const config = {
  apiUrl: (process.env.REACT_APP_API_URL || 'http://localhost:3001').replace(
    /\/+$/,
    ''
  ),
  apiImage: (process.env.REACT_APP_HOST_IMAGE_DEV ||
    process.env.REACT_APP_API_URL ||
    'http://localhost:3001').replace(/\/+$/, ''),
};

export { config };