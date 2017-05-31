package BackendServer.Security.Configuration;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;


/**This custom Request allows to set Headers like the JSESSIONID which has to be set manually because 
 * Swagger can't handle it itself
 * @author Florian Kutz
 *
 */
public class CustomRequest extends HttpServletRequestWrapper {

 private Map<String, String> customHeaderMap;

 public CustomRequest(HttpServletRequest request) {
  super(request);
  customHeaderMap = new HashMap<String, String>();
 }
 
 public void addHeader(String name,String value){
  customHeaderMap.put(name, value);
 }

 @Override
 public String getParameter(String name) {
  String paramValue = super.getParameter(name); // query Strings
  if (paramValue == null) {
   paramValue = customHeaderMap.get(name);
  }
  return paramValue;
 }

}
