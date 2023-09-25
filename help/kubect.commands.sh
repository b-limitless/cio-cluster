# Login to your container/pod
kubectl exec -it your_pod_name -- /bin/sh

# Create config map 
kubectl create configmap custom-nginx-config --from-file=custom-nginx.conf
