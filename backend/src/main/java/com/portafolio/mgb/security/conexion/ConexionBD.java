package com.portafolio.mgb.security.conexion;

//import com.portafolio.mgb.security.Controller.Mensaje;
import java.sql.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
//import java.util.logging.Level;
import java.util.logging.Logger;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;

@Component
public class ConexionBD {

    @Value("${spring.datasource.url}")
    private String BD_Url;
    @Value("${spring.datasource.username}")
    private String Usuario;
    @Value("${spring.datasource.password}")
    private String Password;
    @Value("${spring.datasource.driverClassName}")
    private String ClassName;

   
    
    public String ConexionToString(){
        return "database:"+BD_Url+"-user:"+Usuario+"-password:"+Password+"-driverclass:"+ClassName; 
    }
    

    public boolean IsConnected() {
        boolean result = false;
        try {
            System.out.println(this.ConexionToString());
            //DriverManager.registerDriver(new com.mysql.jdbc.Driver());
            //Connection connection = null;
            //Statement statement = null;
            Class.forName(ClassName);
            Connection connection = DriverManager.getConnection(BD_Url, Usuario, Password);
            Statement statement = connection.createStatement();
            //String sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'portafolio'";
            String sql = "show databases like 'portafolio'";
            ResultSet resultSet = statement.executeQuery(sql);
            System.out.println(resultSet);
            
            //La base de datos existe
            if (resultSet.next()) {
                System.out.println(resultSet.next());
                result = true;
            }

        } catch (ClassNotFoundException ex) {
            Logger.getLogger("Clase no encontrada - ", ex.getMessage());
      
        } catch (SQLException ex) {
            Logger.getLogger("Error de SQL - ", ex.getMessage());
        }
        result = false;
        return result;
    }
    /*
    public ResponseEntity<?> TestConnection(){
        if(this.IsConnected()){
            return new ResponseEntity(new Mensaje("La base de datos se conecto correctamente"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(new Mensaje("No se pudo conectar a " + BD_Url), HttpStatus.BAD_REQUEST);
    } */  
}
