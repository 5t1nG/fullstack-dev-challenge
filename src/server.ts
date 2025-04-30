import app from './app';
import { config } from './config';

// Start the server
app.listen(config.server.port, () => {
  console.log(`Server running at: http://localhost:${config.server.port}/`);
  console.log(`Environment: ${config.server.env}`);
  console.log(`CORS allowed origins: ${config.cors.allowedOrigins.join(', ')}`);
}); 