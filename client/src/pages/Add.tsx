import { ChangeEvent, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Button from "@components/Button";

import uploadImage from "@utils/upload";

import { axiosInstance } from "@services/index";

import { gigReducer, INITIAL_STATE, IState } from "@reducers/gigReducer";

const Add = () => {
  const [feature, setFeature] = useState("");
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let payload;
    if (["deliveryTime", "revisionNumber", "price"].includes(name)) {
      if (+value < 0) return;
      payload = { name: name, value: +value };
    } else {
      payload = { name: name, value: value };
    }

    dispatch({
      type: "CHANGE_INPUT",
      payload,
    });
  };

  const handleFeature = () => {
    if (!feature) return;
    dispatch({
      type: "ADD_FEATURE",
      payload: feature,
    });
    setFeature("");
  };

  const handleUpload = async () => {
    if (!singleFile || !files)
      return setError("Please upload a cover image and sample images");

    setUploading(true);
    try {
      const {
        data: { url: cover },
      } = await uploadImage(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const {
            data: { url },
          } = await uploadImage(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err: any) {
      setError(
        (err.response?.data?.errorMessage ||
          err.response?.data?.error?.message) ??
          "An error occurred. Please try again"
      );
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig: IState) => {
      return axiosInstance.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      setError("");
      navigate("/mygigs");
    },
    onError: (err: any) => setError(err?.response?.data?.errorMessage),
  });

  const handleSubmit = () => {
    mutation.mutate(state);
  };

  return (
    <section className="add">
      <div className="add__container">
        <h1>Add New Gig</h1>

        <div className="add__sections">
          <div className="add__info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="add__info-images">
              <div className="add__info-images-inputs">
                <label htmlFor="cover">Cover Image</label>
                <input
                  type="file"
                  id="cover"
                  onChange={(e) => setSingleFile(e.target.files![0])}
                />

                <label htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  multiple
                  id="images"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button
                className="add__info-images-button"
                onClick={handleUpload}
              >
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols={0}
              rows={16}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="add__info">
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id="title"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />

            <label htmlFor="shortdesc">Short Description</label>
            <textarea
              name="shortDescription"
              id="shortdesc"
              placeholder="Short description of your service"
              cols={30}
              rows={10}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="delivery">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              id="delivery"
              min={1}
              onChange={handleChange}
            />

            <label htmlFor="revision">Revision Number</label>
            <input
              type="number"
              min={1}
              name="revisionNumber"
              id="revision"
              onChange={handleChange}
            />

            <label htmlFor="features">Add Features</label>
            <div className="add__features-input">
              <input
                type="text"
                placeholder="e.g. page design"
                id="features"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              />
              <button className="add__features-button" onClick={handleFeature}>
                add
              </button>
            </div>

            <div className="add__features">
              {state?.features?.map((f) => (
                <div className="add__features-item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              min={0}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="add__container-button">
          <Button
            isLoading={mutation.isLoading}
            disabled={mutation.isLoading}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
        {mutation.isError && <pre>{error}</pre>}
      </div>
    </section>
  );
};

export default Add;
