export const corsOptions = {
  origin: ['http://localhost:5173'],
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credential: true,
  optionsSuccessStatus: 200,
};
