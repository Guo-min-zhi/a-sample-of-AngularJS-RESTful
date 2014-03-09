import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class PeopleController {
	
	/**  
	 * @return  
	 * @description query all people
	*/
	@RequestMapping(value = "/api/people", method = RequestMethod.GET)
	public @ResponseBody List<People> getAllPeople(){
		System.out.println("query all people");
		
		List<People> list = new ArrayList<People>();
		People p1 = new People();
		p1.setId(1);
		p1.setName("p1");
		p1.setSchool("school1");
		list.add(p1);
		
		People p2 = new People();
		p2.setId(2);
		p2.setName("p2");
		p2.setSchool("school2");
		list.add(p2);
		return list;
	}
	
	/**  
	 * @param id
	 * @return  
	 * @description query one people according people id
	*/
	@RequestMapping(value = "/api/people/{id}", method = RequestMethod.GET)
	public @ResponseBody People getOnePeople(@PathVariable Integer id){
		System.out.println("get one people: id = "+id);
		
		People p2 = new People();
		p2.setId(id);
		p2.setName("eric");
		p2.setSchool("bjtu");
		
		return p2;
	}
	
	/**  
	 * @param people
	 * @return  
	 * @description  add one people
	*/
	@RequestMapping(value = "/api/people", method = RequestMethod.POST)
	public @ResponseBody String addOnePeople(@RequestBody People people){
		System.out.println("add receive: people = "+people.toString());
		return "save successful";
	}
	
	
	/**  
	 * @param id
	 * @param people
	 * @return  
	 * @description  update one people according the people's id
	*/
	@RequestMapping(value = "/api/people/{id}", method = RequestMethod.PUT)
	public @ResponseBody String updateOnePeople(@PathVariable Integer id, @RequestBody People people){
		System.out.println("update receive: id = "+id+", people = "+people);
		
		return "update success";
	}
	
	/**  
	 * @param id
	 * @return  
	 * @description delete one people according people id
	*/
	@RequestMapping(value = "/api/people/{id}", method = RequestMethod.DELETE)
	public @ResponseBody String deleteOnePeople(@PathVariable Integer id){
		System.out.println("delete receive: id = "+id);
		
		return "delete success";
	}
}
