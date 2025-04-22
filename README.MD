
# Prometheus Scrape Config Editor + Self-Monitoring Stack

A minimal yet powerful web platform to visually manage Prometheus scrape jobs 

---
## ⚡ Features

- ✏️ **Edit / Add / Delete** scrape jobs without touching YAML manually
- 💾 **Save & Apply** prometheus config changes

---

## 🎯 Tech Stack

- **Frontend:** React 
- **Backend:** Django + Django REST Framework

- It is literally the first time I use React OR Django, so the code is very far from clean. One of the goals of this project is for me to learn how to use it.

- **Monitoring:** Prometheus + Grafana
- **Infrastructure:** Docker + Docker Compose

---

## 🚀 Quick Start (Local Dev)

```bash
# Clone the repo
git clone https://github.com//ThierryMonteiro/prometheus-config-editor.git
cd prometheus-config-editor

# Launch the full stack
docker-compose up --build
```

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Prometheus: http://localhost:9090

Grafana: http://localhost:3001 (login: admin / admin) / For now this is empty. I will try to set some pre-seeded dashboards  

---

## 📜 API Endpoints

| Method | Endpoint             | Purpose                          |
|:------:|----------------------|:---------------------------------|
| GET    | `/configs/` | Fetch current prometheus.yml    |
| POST   | `/configs/save` | Change current prometheus.yml     |

---

## 🛡️ Roadmap

DONE

- Basic CRUD for scrape config
- Save button with success/error feedback

TODO
- Form autocompletion with current YAML file as the "placeholder" before editing
- Import/export YAML files
- Better label placement
- Git-based versioning of configs
- Show diff between old and new configuration before apply

---

## 🤝 Contributing

Open to suggestions, pull requests, and code reviews.  
Create an issue first to discuss major changes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔥 Creator

Built with speed and happiness by [Thierry Monteiro](https://www.linkedin.com/in/thierry-weissheimer-monteiro/).

If you like it, star the repo ⭐ and connect with me!  
I'm open to collaborations and infra-dev discussions.

---
