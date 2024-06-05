export default function Ticket() {
  return (
    <section className="container">
      <div className="row">
        <article className="card fl-left">
          <section className="date">
            <time dateTime="23th feb"> <span>23</span><span>feb</span> </time>
          </section>
          <section className="card-cont">
            <small>dj khaled</small>
            <h3>live in sydney</h3>
            <div className="even-date">
              <i className="fa fa-calendar" />
              <time>
                <span>wednesday 28 december 2014</span>
                <span>08:55pm to 12:00 am</span>
              </time>
            </div>
            <div className="even-info">
              <i className="fa fa-map-marker" />
              <p>nexen square for people australia, sydney</p>
            </div>
            <a href="#">tickets</a>
          </section>
        </article>
      </div>
    </section>

  )
}
