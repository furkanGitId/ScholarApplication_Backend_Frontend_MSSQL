### Advanced Docker-Compose Commands and Examples

#### 1. Running Services in Detached Mode
Use the `-d` option to run containers in the background.
```bash
docker-compose up -d
```

#### 2. Specifying a Custom Network
You can define a custom network in your `docker-compose.yml` file:
```yaml
networks:
  my_custom_network:

services:
  my_service:
    networks:
      - my_custom_network
```

#### 3. Building Images Before Starting
You can build images using the `--build` option:
```bash
docker-compose up --build
```

#### 4. Scaling Services
You can scale services using the `--scale` option:
```bash
docker-compose up --scale my_service=3
```

#### 5. Running a One-off Command
To run a one-off command in a service container:
```bash
docker-compose run my_service command
```