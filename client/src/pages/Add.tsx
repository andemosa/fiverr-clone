const Add = () => {
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
            />

            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="add__info-images">
              <div className="add__info-images-inputs">
                <label htmlFor="cover">Cover Image</label>
                <input type="file" id="cover" />

                <label htmlFor="images">Upload Images</label>
                <input type="file" multiple id="images" />
              </div>
              <button className="add__info-images-button">Upload</button>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              name="desc"
              id="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols={0}
              rows={16}
            ></textarea>
          </div>

          <div className="add__info">
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. One-page web design"
            />

            <label htmlFor="shortdesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortdesc"
              placeholder="Short description of your service"
              cols={30}
              rows={10}
            ></textarea>

            <label htmlFor="delivery">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="delivery" id="delivery" />

            <label htmlFor="revision">Revision Number</label>
            <input type="number" name="revision" id="revision" />

            <label htmlFor="features">Add Features</label>
            <div className="add__features-input">
              <input type="text" placeholder="e.g. page design" id="features" />
              <button className="add__features-button">add</button>
            </div>

            <div className="add__features">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="add__features-item" key={i}>
                  <button>
                    {i}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" />
          </div>
        </div>
        <button className="add__container-button">Create</button>
      </div>
    </section>
  );
};

export default Add;
