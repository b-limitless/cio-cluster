While working with Micro Front End at the same time taking care of security this was challenging to test the codebase in development which was running under minikube cluster

* While going into production remember these steps for the micro frontend
* remember to build the docker file while it is in the pasal-frontend directory and tag it and push to docker hub. It would be good if you uses same image names it this way you do not need to update the ingress configuration
* Take as you have docker file check docker file in pasal-frontend directory you need to add nginx as you can see in that docker file basically what is does is it uses multi stage build process. for example for auth service its copy and build and finally its copy those build file to nginx directory called /usr/share/nginx/html/auth
* The container is served from /usr/share/nginx/html/ its build and copy the build file to given directory
Y* ou need update the ingrex pasal-static-server.yamal check in k8s-production folder it is places inside there
* remember to check the webpack.prod.js for each services because its is important to check if you updated any for example directory or any other thing and based on that you need to update the publicPath or any other directory 
