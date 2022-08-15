import requests
from faker import Faker

def random_personas(cantidad: int = 500, url: str = "http://127.0.0.1:8080/")->None :
    url += "personas/new"
    fake  = Faker()
    print("Agregando {} personas".format(cantidad))
    for i in range(1, cantidad + 1):
        persona = {}
        persona["nombre"] = fake.first_name()
        persona["apellido"] = fake.last_name()
        persona["descripcion"] = ""
        persona["fecha_nacimiento"] = str(fake.date_of_birth())
        persona["provincia"] = fake.city()
        persona["pais"] = fake.country()
        persona["codigo_postal"] = fake.postcode()
        #persona["correo"] = fake.email()
        persona["foto_perfil_url"] = fake.domain_name()
        persona["telefono"] = ""
        #persona["username"] = persona["nombre"] + "-" + str(i)
        #persona["password"] = "123456"

        r = requests.post(url, json=persona)
        # print(persona)
        print(r.status_code, "persona agregada {}".format(i))

if __name__ == "__main__":
    random_personas()

