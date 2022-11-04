#from random_personas import random_personas
from random_tipo_empleo import random_tipo_empleo
from random_rol import random_rol


if __name__ == "__main__":

    #api_url = "http://localhost:8080/"
    api_url ="https://backend-portafolioap.herokuapp.com/proyecto/"

    #random_personas(url=api_url)
    random_tipo_empleo(url=api_url)
    random_rol(url=api_url)
    