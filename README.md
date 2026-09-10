# SAFAR — Smart, Affordable & Fair Assistance for Travelers

AI-powered tourist assistance platform that helps travelers verify fair transportation fares, discover destinations within their budget, find compatible travel partners, and stay safe during a ride.

Built for a hackathon MVP — this README defines the framework we're building against, not the finished product.

---

## Features

| Feature                    | What it does                                                                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 💰 **Fair Fare**           | Predicts an expected fare range for a trip and flags whether a quoted fare looks fair, slightly high, or inflated                                           |
| 🧠 **AI Travel Suggestor** | Recommends destinations and activities based on budget, time, location, and interests, with an LLM-generated explanation                                    |
| 🤝 **Partner Finder**      | Matches travelers with compatible trips (destination, time, budget) to enable shared transportation                                                         |
| 🆘 **In-Ride SOS**         | One-tap emergency mechanism that shares trip, location, and driver details with a configured emergency contact — works independently of the LLM/ML services |

---

## Tech Stack

- **Frontend + Backend:** Next.js (App Router)
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **AI Assistant:** LLM API (Suggestor + natural-language explanations)
- **ML:** Python service (Random Forest / XGBoost / Gradient Boosting candidates) for fare prediction, deployed separately from Next.js

**Design principle:** the LLM never invents prices or availability — it only explains data that already came from the database, ML model, or APIs.

---

## Repo Structure

```
safar/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/
│  │  └─ register/
│  ├─ (dashboard)/
│  │  ├─ fair-fare/
│  │  ├─ suggestor/
│  │  ├─ partner-finder/
│  │  └─ trip/[tripId]/          ← includes SOS button + live trip view
│  ├─ api/
│  │  ├─ auth/
│  │  ├─ fare/predict/
│  │  ├─ suggest/
│  │  ├─ partners/match/
│  │  ├─ trips/
│  │  └─ sos/
│  └─ layout.tsx
├─ lib/
│  ├─ prisma.ts                  ← Prisma client singleton
│  ├─ llm.ts                     ← LLM API wrapper
│  ├─ ml-client.ts               ← calls the Python fare-prediction service
│  └─ auth.ts
├─ prisma/
│  └─ schema.prisma
├─ ml-service/                   ← separate Python service (FastAPI/Flask)
│  ├─ model/
│  ├─ train.py
│  └─ serve.py
└─ types/
```

The ML model runs as its **own service**, not inline Next.js code — Next.js calls it over HTTP. This keeps the SOS path fully independent of the LLM and ML pipeline (see NFR-02 below).

---

## Data Model

Conceptual outline — implemented as `prisma/schema.prisma`.

- **User** — id, name, contact info, `emergencyContacts[]`, timestamps
- **Profile / Preferences** — userId, interests, default budget range, travel style
- **Trip** — id, userId, destinationId, pickupLocation, departureTime, status, budget
- **FareRecord** — distance, duration, vehicleType, location, timeOfDay, dayOfWeek, actualFare _(training data, not user-facing)_
- **Destination** — id, name, location, estimatedCost, category, requiredTimeHours
- **PartnerMatch** — id, tripId, matchedUserId, compatibilityScore, status
- **SOS** — id, userId, tripId, location, timestamp, notifiedContacts[], status

Open questions to resolve before finalizing the schema:

- Should `FareRecord` track a `source` field (seeded vs. logged from real quotes)?
- Does `PartnerMatch` need a separate `MatchRequest` table for accept/reject flows?
- Does `SOS` need `resolvedAt` / `falseAlarm` for post-incident follow-up?

---

## API Surface

```
POST   /api/auth/register
POST   /api/auth/login

POST   /api/fare/predict        { pickup, destination, vehicleType, quotedFare } → { expectedRange, status }

POST   /api/suggest             { budget, time, interests, location } → { destinations[], explanation }

POST   /api/trips               create a trip
GET    /api/trips/:id
PATCH  /api/trips/:id           update status

POST   /api/partners/match      { tripId } → { candidates[] }

POST   /api/sos                 { tripId } → triggers notify flow
GET    /api/sos/:id/status
```

---

## Build Order

1. **Schema + auth** — everything else depends on Prisma models and a logged-in user.
2. **SOS end-to-end (minimal)** — simplest data flow, and proves the safety path is independent of AI services early.
3. **Fair Fare** — start with a rules-based estimate (₹/km by vehicle type) so the API and frontend aren't blocked on the ML model; swap in a trained model once the pipeline works.
4. **Suggestor** — build after Fair Fare, since the LLM needs verified destination/cost data (design principle above) to already exist.
5. **Partner Finder** — least safety-critical; start with a naive time-window + destination-overlap query before a real scoring function.

---

## Environment Variables

```
DATABASE_URL=            # Supabase Postgres connection string
NEXTAUTH_SECRET=
LLM_API_KEY=
ML_SERVICE_URL=          # if ML service is deployed separately (e.g. Render/Fly.io)
# Emergency notification provider (Twilio/SendGrid), if wiring real SOS delivery
```

---

## Non-Functional Requirements to Keep in View

- **NFR-02 (Availability):** SOS must work even if the LLM or ML service is down. No SOS code path should import the LLM or ML client, even transitively.
- **NFR-04 (Privacy):** Location/travel data collected and shared only with user permission.
- **NFR-06 (Usability):** Should be usable by a tourist unfamiliar with the local area, without extensive instructions.

---

## Decisions to Lock In Early

- **Fare status thresholds** — e.g. within 10% = Fair, 10–30% = Slightly High, >30% = Inflated.
- **Partner compatibility scoring formula** — weight of time delta vs. destination match vs. budget overlap.
- **SOS isolation** — verified at the import level, not just by convention.

---

## Status

MVP scope only — see the SRS for the full production spec. Current focus: proving all four features end-to-end for the demo, not production hardening.
