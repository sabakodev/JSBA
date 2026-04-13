# Liturgical Calendar API

This could be used to observe Pascha and other moveable Feast, although this has been pretty accurate, I still say that improvement were much needed for the timezone deviation which need to ensure Julian date conversion API underneath were universal in any timezone.

Base URL: `/api/calendar`

## Endpoints

### `GET /api/calendar`

Returns a list of all available endpoints.

---

### `GET /api/calendar/legend`

Returns static labels for feast and fasting types. Response is immutable-cached.

**Parameters:** None

**Example:**

```typescript
const res = await fetch("/api/calendar/legend");
const { data } = await res.json();

// data.feast.great.label → "Great Feast"
// data.fast.xerophagy.label → "Dry Eating"
```

**Response:**

```json
{
  "data": {
    "feast": {
      "great": { "label": "Great Feast" },
      "major": { "label": "Major Feast" },
      "minor": { "label": "Minor Feast" },
      "fast": { "label": "Fast Day" },
      "saint": { "label": "Saint Commemoration" }
    },
    "fast": {
      "strict": { "label": "Strict Fast" },
      "xerophagy": { "label": "Dry Eating" },
      "oil-wine": { "label": "Oil & Wine" },
      "fish": { "label": "Fish Allowed" },
      "dairy": { "label": "Cheesefare" },
      "regular": { "label": "Wed/Fri Fast" },
      "none": { "label": "" }
    }
  }
}
```

---

### `GET /api/calendar/week`

Returns liturgical week information for a given date.

| Param  | Type     | Format       | Required | Default |
| ------ | -------- | ------------ | -------- | ------- |
| `date` | `string` | `YYYY-MM-DD` | No       | Today   |

**Example:**

```typescript
// Current week
const res = await fetch("/api/calendar/week");
const { data } = await res.json();

// Specific date
const res = await fetch("/api/calendar/week?date=2026-04-13");
const { data } = await res.json();

// data.name → "3rd Week of Pascha (Myrrhbearers)"
// data.tone → 2
// data.fasting → false
// data.fastingType → "none"
```

**Response:**

```json
{
  "data": {
    "name": "3rd Week of Pascha (Myrrhbearers)",
    "nameEl": "Γ' Εβδομάδα Πάσχα (Μυροφόρων)",
    "nameId": "Minggu ke-3 Paskah (Pembawa Mur)",
    "tone": 2,
    "fasting": false,
    "fastingType": "none",
    "description": "Honour of the women who brought myrrh to Christ's tomb."
  }
}
```

---

### `GET /api/calendar/days`

Returns daily feast, fasting, and commemoration data for a given month.

| Param   | Type     | Format    | Required | Default    |
| ------- | -------- | --------- | -------- | ---------- |
| `month` | `string` | `YYYY-MM` | No       | This month |

**Example:**

```typescript
// Current month
const res = await fetch("/api/calendar/days");
const { data } = await res.json();

// Specific month
const res = await fetch("/api/calendar/days?month=2026-04");
const { data } = await res.json();

// data.month → "2026-04"
// data.totalDays → 30
// data.days[0].gregorianDate → "2026-04-01"
```

**Response:**

```json
{
  "data": {
    "month": "2026-04",
    "totalDays": 30,
    "days": [
      {
        "gregorianDate": "2026-04-01",
        "julian": {
          "year": 2026,
          "month": 3,
          "day": 19
        },
        "feast": [
          {
            "name": "Sunday of the Publican & Pharisee",
            "nameEl": "Κυριακή Τελώνου και Φαρισαίου",
            "nameId": "Minggu Orang Farisi dan Pemungut Cukai",
            "type": "minor",
            "saints": [],
            "source": "moveable"
          }
        ],
        "fasting": {
          "active": true,
          "type": "xerophagy"
        }
      }
    ]
  }
}
```

---

## Error Handling

Errors return the appropriate HTTP status code with a message:

```json
// 400 Bad Request
{
  "error": "Invalid format. Use YYYY-MM"
}

// 500 Internal Server Error
{
  "error": "Internal error"
}
```

## Caching

| Endpoint               | Cache Invalidation  |
| ---------------------- | ------------------- |
| `/api/calendar`        | Immutable           |
| `/api/calendar/legend` | Immutable           |
| `/api/calendar/week`   | Weekly revalidation |
| `/api/calendar/days`   | Weekly revalidation |
