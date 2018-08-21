package services;

import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;


@Path("userService")
public class UserService {

	@Context
	ServletContext ctx;
	
	@PUT
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces("text/html")
	public Response register(@Context HttpServletRequest request, User user){
		//TODO registracija
		//reci mi radis li login kada se registruje, da ako da preusmerim tamo na index, a inace ne
		return Response.ok().build();
	}
	
	@POST
	@Path("/login")		
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/html")
	public Response login(@Context HttpServletRequest request, User user){		
		//TODO: logovanje
		boolean kakoOvoSmara = true;
		if(kakoOvoSmara == true){
			//ako je logovanje uspešno
			return Response.ok().build();
		}
		else{
			//ako logovanje nije uspešno
			return Response.status(400).entity("Error message (na engleskom)").build();	
		}
	}
	
	@GET
	@Path("/logout")
	@Produces("text/html")
	public Response logout(@Context HttpServletRequest request) throws URISyntaxException{
		request.getSession().invalidate();
		return Response.temporaryRedirect(new URI("http://localhost:8080/ra110-2015")).build();	
	}
	
	
	
}
