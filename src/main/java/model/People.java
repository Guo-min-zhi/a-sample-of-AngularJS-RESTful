import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class People {

	private Integer id;
	
	private String name;
	
	private String school;
	
	public String toString(){
		return "[id="+id+", name="+name+", school="+school+"]";
	}
}
