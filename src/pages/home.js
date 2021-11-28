import { useEffect, useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomCard from "../components/CustomCard";
import { Row, Spinner } from "react-bootstrap";


const Home = () => {
    const [videos, setVideos] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
      async function getVideos() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/videos`, {
          method: "GET",}
        );
        const data = await response.json();
        setVideos(data);
      }
      getVideos();
    }, []);
    return ( <div>
        <CustomAppBar
          label="Search"
          onSearch={(event) => {
            setSearchText(event.target.value);
          }}
        />
        {videos.length === 0 ? (
          <Spinner animation="grow" variant="light" className="my-auto mx-auto" style={{position:"absolute",top:"50%",left:"50%"}}/>
        ) : (
          <Row xs={1} md={3} className="g-4">
            {videos
              .filter((e) =>
                searchText.length !== 0
                  ? e.title.toLowerCase().includes(searchText.toLowerCase())
                  : true
              )
              .map((e) => (
                <CustomCard key={videos.indexOf(e)}
                  title={e.title}
                  uploadedAgo={e.uploadedAgo}
                  uploadedBy={e.uploadedBy}
                  image={e.image}
                  views={e.views}
                />
              ))}
          </Row>
        )}
      </div>
     );
}

export default Home;