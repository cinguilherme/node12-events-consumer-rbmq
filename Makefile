build-images:
	yarn build
	docker build . -f Dockerfile-producer-dev -t node-messages-producer:latest
	docker build . -f Dockerfile-consumer-dev -t node-messages-consumer:latest