# backend/Dockerfile

FROM python:3.8-slim

WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Then copy everything else EXCEPT venv
COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
