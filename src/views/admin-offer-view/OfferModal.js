// Import necessary styles for the modal
import { useEffect, useState } from "react";
import "./style.css";
import { getOfferAction } from "../../utils/offer/offer";
import { client } from "../../client";
import { toast } from "react-toastify";

// Update the OfferModal component
const OfferModal = ({ isOpen, onRequestClose }) => {
  const [offerData, setOfferData] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [activeOffer, setActiveOffer] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOfferAction();
        setOfferData(result);
        setActiveOffer(result.activeOffer);
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditImage = () => {
    // Toggle image editing logic here
    setEditingImage(!editingImage);
  };

  const handleSetOfferActive = () => {
    // Toggle logic to set the offer as active or not
    setActiveOffer(!activeOffer);
  };

  const handleImageChange = (event) => {
    // Handle image file change
    const file = event.target.files[0];
    setNewImage(file);
  };

  const handleSaveChanges = async () => {
    try {
      let imageUrl =
        offerData.offerImage &&
        offerData.offerImage.asset &&
        offerData.offerImage.asset.url;

      if (newImage) {
        // Upload new image and get the URL
        const response = await client.assets.upload("image", newImage, {
          filename: newImage.name,
          originalFilename: newImage.name,
        });
        // Update offer data with the new image URL
        imageUrl = response.url;
      }

      // Update other fields as needed
      const updatedData = {
        activeOffer: activeOffer,
        offerImage: { asset: { url: imageUrl } },
        // Add other fields to update if needed
      };

      // Example: Update data in Sanity
      await client.patch(offerData._id).set(updatedData).commit();

      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
      // Add error handling or notify the user about the error
      toast.error("Error saving changes. Please try again.");
    }
  };

  return (
    <div className='admin-offer-modal-container'>
      {offerData ? (
        <div className='offer-modal-container'>
          <h2>{offerData.title}</h2>
          {offerData.offerImage && offerData.offerImage.asset && (
            <img
              src={offerData.offerImage.asset.url}
              alt={offerData.title}
              className={`offer-image ${editingImage ? "editing" : ""}`}
            />
          )}
          <button onClick={handleEditImage} className='offer-image-button'>
            {editingImage ? "Cancel" : "Edit Image"}
          </button>
          {editingImage && (
            <div className='image-upload'>
              <label>
                Choose a new image:
                <input
                  type='file'
                  accept='image/*'
                  className='input-file-button'
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
          <label>
            <input
              type='checkbox'
              checked={activeOffer}
              onChange={handleSetOfferActive}
            />
            <b>Active Offer</b>
          </label>
          <button className='save-button' onClick={handleSaveChanges}>
            Save Changes
          </button>{" "}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfferModal;
