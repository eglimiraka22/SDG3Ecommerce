// AddProduct.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAddProduct from "../../hooks/useAddProduct";
import "./style.css"; // Import your CSS file for styling
import useCategories from "../../hooks/useGetCategories";
import { client } from "../../client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloseCircle } from "react-icons/io";
import useColors from "../../hooks/useColors";
import Select from "react-select";

const AddProduct = ({ onRequestClose, existingProduct }) => {
  const { categories: CategoryData } = useCategories();
  const { addProduct, loading, error } = useAddProduct();
  const { colors } = useColors();
  const uploadImages = async (images) => {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const response = await client.assets.upload("image", image.blob, {
          filename: image.asset.filename,
          originalFilename: image.asset.originalFilename,
        });
        return response;
      }),
    );

    // console.log("Uploaded Images:", uploadedImages);

    return uploadedImages;
  };
  const formik = useFormik({
    initialValues: {
      name: existingProduct ? existingProduct.name : "",
      categories: existingProduct ? existingProduct.categories._id : "",
      shortDescription: existingProduct ? existingProduct.shortDescription : "",
      trending: existingProduct ? existingProduct.trending : false,
      price: existingProduct ? existingProduct.price : 0,
      discountPrice: existingProduct ? existingProduct.discountPrice : 0,
      description: existingProduct ? existingProduct.description : "",
      selectedImages: existingProduct ? existingProduct.productImages : [],
      colors:
        existingProduct && existingProduct.colors ? existingProduct.colors : [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      categories: Yup.string().required("Categories are required"),
      shortDescription: Yup.string().max(
        150,
        "Short description should not exceed 150 characters",
      ),
      trending: Yup.boolean().required("Trending is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      selectedImages: Yup.array().min(1, "At least one image is required"),
      colors: Yup.array(),
    }),
    onSubmit: async (values) => {
      try {
        // Handle image upload
        const existingImages = formik.values.selectedImages.filter(
          (image) => image._key,
        );

        // console.log(formik.values.selectedImages);
        const newImages = formik.values.selectedImages.filter(
          (image) => image.blob,
        );
        // console.log("Newimg", newImages);

        const uploadedImages = await uploadImages(newImages);
        // console.log("uploadedImages", uploadedImages);

        // Attach uploaded image information to the form data
        values.selectedImages = [...(existingImages || []), ...uploadedImages];

        // Call the addProduct hook with the existing product's ID if available
        const response = await addProduct(values, existingProduct?._id);
        if (response) {
          toast.success(
            existingProduct
              ? "Product edited successfully"
              : "Product added successfully",
            {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            },
          );
          formik.resetForm();
          onRequestClose();
          setTimeout(() => {
            // Refresh the page
            window.location.reload();
          }, 1200);
        }
      } catch (error) {
        toast.danger("There was a problem ,try again", {
          position: "top",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    },
  });

  // console.log(formik.values.colors);
  const handleImageInputChange = async (e) => {
    const { files } = e.target;

    try {
      const imageArray = await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const blob = await fetch(URL.createObjectURL(file)).then((res) =>
              res.blob(),
            );
            return {
              asset: {
                _type: "image",
                filename: file.name,
                originalFilename: file.name,
              },
              blob,
            };
          } catch (blobError) {
            console.error(
              "Error creating blob for file:",
              file,
              "Error:",
              blobError,
            );
            return null; // Skip this file in the array
          }
        }),
      );

      const validImages = imageArray.filter((image) => image !== null);

      // Store selected images in formik state
      formik.setFieldValue("selectedImages", [
        ...formik.values.selectedImages,
        ...validImages,
      ]);
    } catch (error) {
      console.error("Error handling image input:", error);
    }
  };
  const removeImage = (index) => {
    const updatedImages = [...formik.values.selectedImages];
    updatedImages.splice(index, 1);
    formik.setFieldValue("selectedImages", updatedImages);
  };
  const colorOptions = colors.map((color) => ({
    value: color._id,
    label: (
      <div key={color._id}>
        <span style={{ backgroundColor: color.code, marginRight: "8px" }}>
          &nbsp;&nbsp;&nbsp;
        </span>
        {color.code} <b>{colors.indexOf(color) + 1}</b>
      </div>
    ),
  }));

  // Add an "All Colors" option
  const allColorsOption = {
    value: "all",
    label: <div key='all'>All Colors</div>,
  };

  // Handle changes in the select
  const handleColorChange = (selectedOptions) => {
    // Check if "All Colors" is selected
    const isAllSelected = selectedOptions.some(
      (option) => option.value === "all",
    );

    // Update formik values accordingly
    formik.setFieldValue(
      "colors",
      isAllSelected
        ? colors.map((color) => ({ _id: color._id, name: color.name }))
        : Array.from(
            new Set(selectedOptions.map((option) => option.value)),
          ).map((value) => colors.find((color) => color._id === value)),
    );
  };

  return (
    <div className='add-product-container'>
      <ToastContainer />

      {!existingProduct && <h2>Add Product</h2>}
      <form onSubmit={formik.handleSubmit} className='add-product-form'>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            className='product-input'
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='error-message'>{formik.errors.name}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='categories'>Categories:</label>
          <select
            id='categories'
            name='categories'
            className='product-input'
            {...formik.getFieldProps("categories")}
          >
            <option value='' label='Select a category' />
            {CategoryData.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.categories && formik.errors.categories && (
            <div className='error-message'>{formik.errors.categories}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='shortDescription'>Short Description:</label>
          <textarea
            id='shortDescription'
            name='shortDescription'
            className='product-input'
            {...formik.getFieldProps("shortDescription")}
          />
          {formik.touched.shortDescription &&
            formik.errors.shortDescription && (
              <div className='error-message'>
                {formik.errors.shortDescription}
              </div>
            )}
        </div>

        <div className='form-group'>
          <div className='form-group-trending'>
            <label htmlFor='trending'>In Discount:</label>
            <input
              type='checkbox'
              id='trending'
              name='trending'
              className='product-input'
              checked={formik.values.trending}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.trending && formik.errors.trending && (
            <div className='error-message'>{formik.errors.trending}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            name='price'
            className='product-input'
            {...formik.getFieldProps("price")}
          />
          {formik.touched.price && formik.errors.price && (
            <div className='error-message'>{formik.errors.price}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='discountPrice'>Discount Price:</label>
          <input
            type='number'
            id='discountPrice'
            name='discountPrice'
            className='product-input'
            {...formik.getFieldProps("discountPrice")}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            className='product-input'
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className='error-message'>{formik.errors.description}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='productImages'>Product Images:</label>
          <div className='image-list'>
            {formik.values.selectedImages.map((image, index) => (
              <div key={index} className='image-item'>
                <img
                  src={
                    image.asset && image.asset.url
                      ? image.asset.url
                      : image.blob
                      ? URL.createObjectURL(image.blob)
                      : image.url
                  }
                  width={"100px"}
                  height={"100px"}
                  alt={`img${index + 1}`}
                />
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='remove-image-button'
                >
                  <IoMdCloseCircle size={25} />
                </button>
              </div>
            ))}
          </div>
          <input
            type='file'
            name='productImages'
            accept='image/*'
            multiple
            onChange={handleImageInputChange}
          />
          {formik.touched.selectedImages && formik.errors.selectedImages && (
            <div className='error-message'>{formik.errors.selectedImages}</div>
          )}
        </div>

        <div className='form-group form-group-color-select'>
          <label>Colors:</label>
          <Select
            menuPlacement='top' // Set menu placement to "top"
            id='colors'
            name='colors'
            options={[allColorsOption, ...colorOptions]}
            isMulti
            value={formik.values.colors.map((color) => ({
              value: color._id,
              label: color.code,
            }))}
            onChange={handleColorChange}
            onBlur={formik.handleBlur("colors")}
          />
          {formik.touched.colors && formik.errors.colors && (
            <div className='error-message'>{formik.errors.colors}</div>
          )}
        </div>

        {!existingProduct && (
          <button
            type='submit'
            disabled={loading}
            className='add-product-button'
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        )}
        {existingProduct && (
          <button
            type='submit'
            disabled={loading}
            className='add-product-button'
          >
            {loading ? "Editing Product..." : "Edit Product"}
          </button>
        )}
        {error && <div className='error-message'>{error}</div>}
      </form>
    </div>
  );
};

export default AddProduct;
