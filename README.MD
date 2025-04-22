

# Prometheus Scrape Config Editor + Self-Monitoring Stack

A minimal yet powerful web platform to visually manage Prometheus scrape jobs — with a built-in observability stack to monitor the application itself.

---
## ⚡ Features

- 🔍 **View Current Scrape Jobs** via UI
- ✏️ **Edit / Add / Delete** scrape jobs without touching YAML manually
- 💾 **Save & Apply** scrape config changes
- 📈 **Monitor Application Health** through Grafana dashboards
- 🔥 **Observe Changes Live** inside Prometheus

---

## 🎯 Tech Stack

- **Frontend:** React (Lovable.ai Components)
- **Backend:** Django + Django REST Framework
- **Monitoring:** Prometheus + Grafana
- **Infrastructure:** Docker + Docker Compose

---

## 🚀 Quick Start (Local Dev)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/prometheus-config-editor.git
cd prometheus-config-editor

# Launch the full stack
docker-compose up --build
```

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Prometheus: http://localhost:9090

Grafana: http://localhost:3001 (login: admin / admin)

---

## 📜 API Endpoints

| Method | Endpoint             | Purpose                          |
|:------:|----------------------|:---------------------------------|
| GET    | `/api/scrape-configs/` | Fetch current scrape configs    |
| POST   | `/api/scrape-configs/` | Save updated scrape configs     |

---

## 🛡️ Roadmap

WORKING

Basic CRUD for scrape config
Save button with success/error feedback

TODO
Validation for YAML structure
Import/export YAML files
Git-based versioning of configs

---

## 🤝 Contributing

Open to suggestions, pull requests, and code reviews.  
Create an issue first to discuss major changes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔥 Creator

Built with speed and obsession by [Thierry Monteiro](https://www.linkedin.com/in/thierry-weissheimer-monteiro/).

If you like it, star the repo ⭐ and connect with me!  
I'm open to collaborations, freelance gigs, and infra-dev discussions.

---
