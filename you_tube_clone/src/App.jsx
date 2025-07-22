import { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  const [arr, setArr] = useState([])
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [showIframe, setShowIframe] = useState(false)

  useEffect(() => {
    axios.get((" https://www.googleapis.com/youtube/v3/search"), {
      params: {
        q: text || "latest tech news",
        part: "snippet",
        type: "video",
        maxResults: 10,
        key: "AIzaSyCqkPXtyFTVvYpngiQpzQW8ybprX0fhT78"
      }
    })
      .then(response => {
        setArr(response.data.items)
        console.log("MyArray", arr);
        console.log("Direct", response.data.items);
      })
      .catch(error => {
        console.error("Axios error:", error)
      })
  }, [text])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-white shadow-sm">
        {/* Left side - Hamburger + Logo */}
        <div className="d-flex align-items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h4 className="m-0 fw-bold text-white">YouTube</h4>
        </div>

        {/* Center - Search Box */}
        <div className="w-50 d-flex">
          <input
            type="text"
            className="form-control rounded-start-pill bg-black text-white border-end-0"
            placeholder="Search"
            onKeyUp={e => setText(e.target.value)}
          />
          <button className="btn btn-outline-secondary rounded-end-pill border-start-0 bg-secondary-subtle text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35m1.7-5.65a7 7 0 11-14 0 7 7 0 0114 0z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right side - Icons */}
        <div className="d-flex align-items-center gap-3">
          {/* Upload icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 24 24">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Bell icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Profile circle */}
          <div className="bg-white rounded-circle" style={{ width: "30px", height: "30px" }}></div>
        </div>
      </div>

      {showIframe && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <button
            onClick={() => setShowIframe(false)}
            style={{
              alignSelf: 'flex-end',
              margin: '10px',
              backgroundColor: 'red',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              cursor: 'pointer',
              zIndex: 10000,
            }}
          >
            Close ✕
          </button>
          <iframe
            src={url}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube Video Player"
            style={{ flexGrow: 1, minHeight: '300px' }}
          ></iframe>
        </div>
      )}

      <div className='container'>
        {
          arr.map(a =>
            <div className='row p-3'>
              <div className='col-12 col-md-4 p-3'>
                <img src={a.snippet.thumbnails.default.url} height="200px" />
              </div>
              <div className='col-12 col-md-8 p-3 d-flex flex-column'>
                <a href="#" onClick={(e) => {
                  setUrl("https://www.youtube.com/embed/" + a.id.videoId + "?autoplay=1")
                  setShowIframe(true)
                }} className='text-white fs-6 text-decoration-none'>{a.snippet.title}</a>
              </div>
            </div>
          )
        }
      </div >
    </>
  )
}
export default App
