import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline.js";
import { StyledFavorites } from "../src/components/Favorites";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data?.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });
                // console.log(novasPlaylists);
                setPlaylists(novasPlaylists);
            });
    }, []);
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={playlists}>
                    Conteúdo
                </Timeline>
                <Favorites favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     );
// }

const StyledHeader = styled.div`
        background-color: ${({ theme }) => theme.backgroundLevel1};

        .perfil {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        .user-info {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 16px 32px;
            gap: 16px;
        }
  `;
const StyledBanner = styled.div`
        background-color: yellow;
        background-image: url(${({ bg }) => bg});
        height: 230px;
        background-size: 100%;
  `;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} className="perfil" />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...props }) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    //Statement
    //Retorno por Expressao
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    console.log(video)
                                    const titleNormalized = video.title.toLowerCase() || "";
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    );
}

function Favorites(props) {
    const favoritesList = Object.keys(props.favorites);
    // console.log("Dentro do componente", props.favorites);
    return (
        <StyledFavorites>
            {favoritesList.map((favorite) => {
                const channels = props.favorites[favorite]
                return (
                    <section key={favorite}>
                        <h2>{favorite}</h2>
                        <div>
                            {channels.map((channel) => {
                                return (
                                    <a key={channel.url} href={channel.url}>
                                        <img src={channel.img} />
                                        <span>
                                            {channel.user}
                                        </span>
                                    </a>
                                )
                            })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledFavorites>
    );
}