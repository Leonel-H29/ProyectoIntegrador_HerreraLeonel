#!/bin/bash

#Inicio sesion en Firebase
firebase login
#Preparo el proyecto para el ambiente de produccion
ng build --configuration=production
#Deploy del proyecto en Firebase
firebase deploy
