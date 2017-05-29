package BackendServer.Listings.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.SimpleMethods;

/**This class represents Listings with listingType RideSharing*/
@Entity
@Table(name="RideSharing")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class RideSharing extends Offering {
	
	private String fromLocation;
	@ElementCollection
	private List<String> journeyStops;
	private String toLocation;
	private int availableSeats;
	private Date travelDateAndTime;
	
	public RideSharing(){
		this.setType(Constants.listingTypeNameRideSharing);
	}
	
	public String getFromLocation() {
		return fromLocation;
	}

	public void setFromLocation(String fromLocation) {
		this.fromLocation = fromLocation;
	}

	public List<String> getJourneyStops() {
		return journeyStops;
	}

	public void setJourneyStops(List<String> journeyStops) {
		this.journeyStops = journeyStops;
	}

	public String getToLocation() {
		return toLocation;
	}

	public void setToLocation(String toLocation) {
		this.toLocation = toLocation;
	}

	public int getAvailableSeats() {
		return availableSeats;
	}

	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}

	public Date getTravelDateAndTime() {
		return travelDateAndTime;
	}

	public void setTravelDateAndTime(Date travelDateAndTime) {
		this.travelDateAndTime = travelDateAndTime;
	}
	
	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Offering#fillFields(org.json.JSONObject, long)
	 * listingData has five additional required fields:
	 * fromLocation: The startLocation of the offered ride
	 * journeyStops: All stops on the offered ride
	 * toLocation: The destination of the offered ride
	 * availableSeats: The number of available seats in the car
	 * travelDateAndTime: The date and time of the start of the ride as UNIX timestamp
	 */
	@Override
	public void fillFields(JSONObject listingData, long creator) throws WrongFormatException {
		super.fillFields(listingData, creator);
		if(listingData.isNull(Constants.listingDataFieldFromLocation) || 
				listingData.isNull(Constants.listingDataFieldJourneyStops) || 
				listingData.isNull(Constants.listingDataFieldToLocation) || 
				listingData.isNull(Constants.listingDataFieldAvailableSeats) || 
				listingData.isNull(Constants.listingDataFieldTravelDateAndTime)){
			throw new WrongFormatException("Missing required field(s)");
		}
		this.setFromLocation(listingData.getString(Constants.listingDataFieldFromLocation));
		this.setJourneyStops(SimpleMethods.parseJSONArrayToStringList(listingData.getJSONArray(Constants.listingDataFieldJourneyStops)));
		this.setToLocation(listingData.getString(Constants.listingDataFieldToLocation));
		this.setAvailableSeats(listingData.getInt(Constants.listingDataFieldAvailableSeats));
		this.setTravelDateAndTime(new Date((long) listingData.getDouble(Constants.listingDataFieldTravelDateAndTime)));
	}
	
	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Listing#toJSON()
	 * listingData has five additional fields in the creted JSOObject:
	 * fromLocation: The startLocation of the offered ride
	 * journeyStops: All stops on the offered ride
	 * toLocation: The destination of the offered ride
	 * availableSeats: The number of available seats in the car
	 * travelDateAndTime: The date and time of the start of the ride as UNIX timestamp
	 */
	@Override
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		json.accumulate(Constants.listingDataFieldFromLocation, this.getFromLocation());
		json.accumulate(Constants.listingDataFieldJourneyStops, this.getJourneyStops());
		json.accumulate(Constants.listingDataFieldToLocation, this.getToLocation());
		json.accumulate(Constants.listingDataFieldAvailableSeats, this.getAvailableSeats());
		json.accumulate(Constants.listingDataFieldTravelDateAndTime, this.getTravelDateAndTime());
		return json;
	}


}
