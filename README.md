# NLW Connect
## Rodar o servidor
No terminal, após iniciar o container, rode o comando: 
```
npm run dev
```

## Configuração para o Docker
Para iniciar os serviços do Docker, utilize o comando abaixo:
```
sudo systemctl start docker.service
```

Após isso, inicie o container com o seguinte comando:
```
docker-compose up -d
```

Para parar os serviços do Docker, utilize o comando abaixo.
```
sudo systemctl stop docker.service
```