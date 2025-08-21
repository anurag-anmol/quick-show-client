// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js"

// const app = express();
// const port = 3000;
// await connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(clerkMiddleware());

// // API Endpoint
// app.get('/', (req, res) => res.json('Server is live..'));
// app.use("/api/inngest", serve({ client: inngest, functions }));

// app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));



// index.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoute.js";

const app = express();
const port = 3000;

// ✅ Connect to DB
await connectDB();

// ✅ Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ Test endpoint
// ✅ API Routes
app.get("/", (req, res) => res.send("✅ Server is live.."));

// ✅ Inngest endpoint
app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions,
        signingKey: process.env.INNGEST_SIGNING_KEY, // ✅ Inngest verifies incoming signatures
    })
);
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);

// ✅ Start server
app.listen(port, () =>
    console.log(`🚀 Server listening at http://localhost:${port}`)
);
