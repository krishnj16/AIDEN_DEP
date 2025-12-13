# AIDEN API Contract (v1.0)

**Base URL:** `http://localhost:3000`
**Auth:** All endpoints (except `/auth/*` and `/health`) require header: `Authorization: Bearer <access_token>`

---

## 1. Authentication

### POST /auth/signup
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "Tony Stark"
}