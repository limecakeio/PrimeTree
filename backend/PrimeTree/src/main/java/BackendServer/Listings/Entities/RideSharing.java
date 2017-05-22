package BackendServer.Listings.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

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
	
	public void fillFields(JSONObject listingData, long creator) {
		super.fillFields(listingData, creator);
		this.setFromLocation(listingData.getString(Constants.listingDataFieldFromLocation));
		this.setJourneyStops(SimpleMethods.parseJSONArrayToStringList(listingData.getJSONArray(Constants.listingDataFieldJourneyStops)));
		this.setToLocation(listingData.getString(Constants.listingDataFieldToLocation));
		this.setAvailableSeats(listingData.getInt(Constants.listingDataFieldAvailableSeats));
		this.setTravelDateAndTime(new Date((long) listingData.getDouble(Constants.listingDataFieldTravelDateAndTime)));
	}
	
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


}
