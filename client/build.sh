cd client
ng build --prod --aot=false
cd ..
rm -rf server/public/* 
cp client/dist/* server/public
echo "COMPILACIÓN TERMINADA!!!"
