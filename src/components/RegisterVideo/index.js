import React from "react";
import { StyledRegisterVideo } from "./style";

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(true);
    return (
        <StyledRegisterVideo>
            <button className="add-video">
                +
            </button>
            {formVisivel
                ?
                (<form>
                    <div>
                        <button className="close-modal">
                            X
                        </button>
                        <input placeholder="titulo do video" />
                        <input placeholder="URL" />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>)
            :null}
        </StyledRegisterVideo>
    )
}