package BackendServer.Exceptions;

/**This Exception is thrown if a JSONObject is missing of required attributes.
 * 
 * @author Florian Kutz
 * */
@SuppressWarnings("serial")
public class WrongFormatException extends Exception {

	public WrongFormatException(String string) {
		super(string);
	}

}
