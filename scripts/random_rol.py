from asyncio.windows_events import NULL
import requests
#from faker import Faker


roles = sorted([
    'ROL_USER',
    'ROL_ADMIN',
])


def random_rol(cantidad: int = len(roles), url: str = "http://127.0.0.1:8080/")->None :
    url += "tipoemp/create"
    #fake  = Faker()
    print("Agregando {} tipo_empleoas".format(cantidad))
    for i in range(0, cantidad):
        tipo = {}
        tipo["idrol"] = ''
        tipo["rol_nombre"] = roles[i]
        r = requests.post(url, json=tipo)
        # print(tipo_empleoa)
        print(r.status_code, "rol agregado {}".format(i))

if __name__ == "__main__":
    random_rol()

