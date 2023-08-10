# SSH to your pod name
kubectl exec -it [your_pod_name]  -- /bin/bash

# Run you mongodb as CLI 
mongosh

# show db
show dbs

# Use different db
use db_name

# find in collection  
db.users.find()