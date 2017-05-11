package PrimeTree;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import BackendServer.Listings.PersistenceAdapter;
import BackendServer.Listings.PersistenceAdapterImpl;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * Unit test for simple App.
 */
public class AppTest 
    extends TestCase
{
	
	PersistenceAdapter sqlAdapter;
	
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public AppTest( String testName )
    {
        super( testName );
    	this.sqlAdapter=new PersistenceAdapterImpl();
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( AppTest.class );
    }

    /**
     * Rigourous Test :-)
     */
    public void testSQLAdapterImpl()
    {
        assertTrue( true );
//    	try {
//			Files.createFile(Paths.get("TestImage.png"));
//			Files.
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
        try {
			FileInputStream inputStream=new FileInputStream("C:/Users/thor.Installer/Downloads/TestImage.png");
			byte[] imageData=new byte[inputStream.available()];
			inputStream.read(imageData);
			inputStream.close();
			sqlAdapter.uploadImage(imageData, 2);
			
			FileInputStream inputStreamTwo=new FileInputStream("assets/listings/2/main-image.png");
			byte[] imageDataTwo=new byte[inputStreamTwo.available()];
			inputStreamTwo.read(imageDataTwo);
			inputStreamTwo.close();
			
			Files.createFile(Paths.get("C:/Users/thor.Installer/Downloads/GoalImage.png"));
			FileOutputStream outputStream = new FileOutputStream("C:/Users/thor.Installer/Downloads/GoalImage.png");
			outputStream.write(imageDataTwo);
			outputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
