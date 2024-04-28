import express from "express";
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import errorHandler from "../src/middleware/errorHandler.js";
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js';
import usersRouter from './routes/users.js';
import propertiesRouter from './routes/properties.js';
import amenitiesRouter from './routes/amenities.js';
import bookingsRouter from './routes/bookings.js';
import hostsRouter from './routes/hosts.js';
import reviewsRouter from './routes/reviews.js';


const app = express();

Sentry.init({
  dsn: "https://5417e4ea8a1916f933f7332642946dce@o4506893082820608.ingest.us.sentry.io/4507147835539456",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/properties', propertiesRouter);
app.use('/amenities', amenitiesRouter);
app.use('/login', loginRouter);
app.use('/bookings', bookingsRouter);
app.use('/hosts', hostsRouter);
app.use('/reviews', reviewsRouter);

app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
