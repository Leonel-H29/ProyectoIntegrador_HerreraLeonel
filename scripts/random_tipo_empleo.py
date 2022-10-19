from asyncio.windows_events import NULL
import requests
#from faker import Faker


tipo_empleo = sorted([
    'FULL TIME PRESENCIAL',
    'FULL TIME HIBRIDO',
    'FULL TIME REMOTO' ,
    'PART TIME PRESENCIAL',
    'PART TIME HIBRIDO',
    'PART TIME REMOTO',
    'FREELANCER'
])


def random_tipo_empleo(cantidad: int = len(tipo_empleo), url: str = "http://127.0.0.1:8080/")->None :
    url += "tipoemp/create"
    #fake  = Faker()
    print("Agregando {} tipo_empleos".format(cantidad))
    for i in range(0, cantidad):
        tipo = {}
        tipo["idtipo_empleo"] = ''
        tipo["tipo"] = tipo_empleo[i]
        r = requests.post(url, json=tipo)
        # print(tipo_empleoa)
        print(r.status_code, "tipo de empleo agregado {}".format(i))

if __name__ == "__main__":
    random_tipo_empleo()

