import requests
import MySQLdb

DB_HOST = 'localhost' 
DB_USER = 'root' 
DB_PASS = 'mysqlroot' 
DB_NAME = 'a'  


redes = sorted([
    'Facebook',
    'Twitter',
    'Instagram',
    'GitHub',
    'Linkedin'
])

personas = [1,2,6,7,8,11]
"""
def random_redes(cantidad: int = len(redes), url: str = "http://127.0.0.1:8080/")->None :
    url += "redes/create"
    
    for x in personas:
        print("Agregando {} redes".format(cantidad))
        for i in range(0, cantidad):
            redesJSON = {}            
            redesJSON["red"] = redes[i]
            #redesJSON["url_red"] = ''
            redesJSON["persona"] =  getPersona(x)
            print(redesJSON)
            r = requests.post(url, json=redesJSON)
            if r.status_code >= 400 :
                print(r.status_code, "error {}".format(i))
               #break
            else:
                print(r.status_code, "red agregada {}".format(i))
"""
#if __name__ == "__main__":
    #random_redes()
