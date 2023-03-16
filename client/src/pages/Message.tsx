import { Link } from "react-router-dom"

const Message = () => {
  return (
    <section className="message">
      <div className="message__container">
        <span className="message__breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        <div className="message__messages">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className={i % 2 ? "owner item" : "item"} key={i}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam cupiditate, sunt voluptates tempora suscipit, neque molestiae excepturi sapiente fuga quidem modi quam accusamus consectetur quod facilis enim adipisci rerum nobis.</p>
              </div>
            ))}
          </div>
        <hr />
        <form>
          <textarea placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  )
}

export default Message