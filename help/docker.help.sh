# Build the docker with tag 
docker build -t bharatrose1:pasal-client .
# Tag the docker 
docker tag bharatrose1:pasal-client bharatrose1/pasal-client
# Push to docker hub
docker push bharatrose1/pasal-client
# Crete custom configuration for the 
kubectl create configmap custom-nginx-config --from-file=custom-nginx.conf

#Check if config map exists
kubectl get configmap custom-nginx-config

# SSH to container
kubectl exec -it pod_name -- /bin/sh



# TEst
docker tag bharatrose1:pasal-static-server bharatrose1/pasal-static-server

docker push bharatrose1/pasal-static-server

#Stop all running Containers
docker stop $(docker ps -aq)

# Prune all images 
docker image prune

#Remove all Containers
docker rm $(docker ps -aq)